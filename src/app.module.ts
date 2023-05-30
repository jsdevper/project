import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    //loggerModdleware를 사용하는 방법
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);
  }
}
