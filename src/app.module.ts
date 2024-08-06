import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BooksModule } from './modules/books/books.module';
import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { UserModule } from './modules/user/user.module';
import { DBModule } from './modules/DB/DB.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PatronModule } from './modules/patron/patron.module';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({ isGlobal: true, ttl: 30000, max: 10 }),
    PatronModule,
    BorrowingModule,
    DBModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
