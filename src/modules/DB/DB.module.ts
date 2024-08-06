import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './data-source';
import { FileLogger } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ormConfig,
        autoLoadEntities: true,
        logger:
          process.env.NODE_ENV === 'dev'
            ? new FileLogger('all', {
                logPath: `./logs/db.log`,
              })
            : 'file',
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
