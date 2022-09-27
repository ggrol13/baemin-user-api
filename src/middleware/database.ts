import * as mongoose from 'mongoose';

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
