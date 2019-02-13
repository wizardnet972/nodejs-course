import dotenv from 'dotenv';
import { logger } from '@modules/core';

process.on('uncaughtException', (error: any) => {
  console.error({ error });

  try {
    const { correlationId } = logger.log('error', 'Uncaught Exception %s', error);

    console.error('[uncaughtException correlationId]: ', correlationId);

    if (!error.isOperational) {
      process.nextTick(() => process.exit());
    }
  } catch (e) {
    console.log(`*** \n[uncaughtException catch e] ${e}\n[uncaughtException error] ${error} \n ***`);
    process.nextTick(() => process.exit(1));
  }
});

let path = '.env';

if (process.env.DEBUG_ENV && process.env.DEBUG_ENV.length > 0 && process.env.DEBUG_ENV.toLocaleLowerCase() !== 'development') {
  path = `.${process.env.DEBUG_ENV}.env`;
}

console.log({ path });

dotenv.config({ path });
