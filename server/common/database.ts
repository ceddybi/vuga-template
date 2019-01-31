import { Mockgoose } from 'mockgoose-fix';
import * as mongoose from 'mongoose';
import { MONGO_URI, NODE_ENV } from './env';

(mongoose as any).Promise = global.Promise;

if (NODE_ENV === 'develop') {
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion('3.4.3');

  mockgoose.prepareStorage().then(
    (): void => {
      mongoose.connect(
        'mongodb://example.com:23400/TestingDB',
        {
          useMongoClient: true
        }
      );
    }
  );
} else {
  mongoose.connect(
    MONGO_URI,
    {
      useMongoClient: true
    }
  );
}

export { mongoose };
