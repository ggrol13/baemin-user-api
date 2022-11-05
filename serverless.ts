import type { AWS } from '@serverless/typescript';
import { storeEvents } from './src/api/store/store-events';
import { accountEvents } from './src/api/account/account-events';
import { paymentEvents } from './src/api/payments/payment-events';
import { orderEvents } from './src/api/order/order-events';
import { amountEvents } from './src/api/amount/amount-events';
import { bMartEvents } from './src/api/b-mart/b-mart-events';

const serverlessConfiguration: AWS = {
  service: 'baemin-user-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    region: 'ap-northeast-2',
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    store: {
      handler: `src/handler/handler.store`,
      events: [...storeEvents],
    },
    account: {
      handler: `src/handler/handler.account`,
      events: [...accountEvents],
    },
    payment: {
      handler: `src/handler/handler.payment`,
      events: [...paymentEvents],
    },
    order: {
      handler: `src/handler/handler.order`,
      events: [...orderEvents],
    },
    amount: {
      handler: `src/handler/handler.amount`,
      events: [...amountEvents],
    },
    bMart: {
      handler: `src/handler/handler.bMart`,
      events: [...bMartEvents],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
