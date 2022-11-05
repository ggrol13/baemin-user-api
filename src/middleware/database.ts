import * as mongoose from 'mongoose';
import { MiddlewareObj } from '@middy/core';

let isConn = false;
export const connectMongo = async () => {
  if (isConn) {
    return Promise.resolve();
  }
  try {
    const db = await mongoose.connect(
      'mongodb+srv://baemin:baeminpassword@cluster0.rrolr.mongodb.net/beaminDB',
    );
    isConn = db.connection.readyState === 1;
    console.log('mongo connect');
  } catch (e) {
    return await Promise.reject(e);
  }
};

export const connectMongoMiddleWare = (): MiddlewareObj => {
  const customMiddlewareBefore = () => {
    connectMongo().then().catch();
  };

  return {
    before: customMiddlewareBefore,
  };
};
