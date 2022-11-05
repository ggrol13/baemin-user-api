import { htmlResponse, response } from '../../common/response';
import * as fs from 'fs';
import * as ejs from 'ejs';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseInterface } from 'src/common/types/response.interface';
import { OrderReceiptInterface } from './schemas/types/order-receipt.interface';
import { orderReceiptService } from './payment-service';
import * as path from 'path';

//copy-webpack-plugin
export const getPayment = async () => {
  const htmlContent = fs.readFileSync(
    path.resolve(process.cwd(), 'src/api/payments/views/index.ejs'),
    'utf-8',
  );
  const template = ejs.compile(htmlContent);
  return htmlResponse(
    200,
    template({
      title: '구매하기',
      orderId: uuidv4(),
      customerName: 'User',
    }),
  );
};

export const getSuccess = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const { storeId, paymentKey, orderId, amount } = event.queryStringParameters;
  try {
    const { data } = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from('test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy' + ':').toString(
              'base64',
            ),
          'Content-Type': 'application/json',
        },
      },
    );
    const { orderName, card } = data;
    const receiptData = {
      store: storeId,
      orderId,
      orderName,
      totalAmount: card.amount,
    };
    await orderReceiptService(receiptData);

    return response<OrderReceiptInterface>(200, {
      result: true,
      message: 'success',
      body: data,
    });
  } catch (e) {
    console.log(e);
    return response(500, {
      result: false,
      message: 'fail',
      body: e,
    });
  }
};

export const getFail = async () => {
  return response<string>(500, {
    result: false,
    message: 'failed',
    body: 'payment failed',
  });
};
