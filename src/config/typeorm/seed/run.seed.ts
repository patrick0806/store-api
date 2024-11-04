import { Logger } from '@nestjs/common';

import { InitialDataSeed } from './initialData.service';

const logger = new Logger('Seed Initial Data');

logger.log('Starting Seed Initial Data');

const initialDataSeed = new InitialDataSeed();
initialDataSeed
    .execute()
    .then(() => {
        logger.log('Seed Initial Data ended without errors');
        return process.exit(0);
    })
    .catch((err) => {
        logger.error(err);
        return process.exit(1);
    });