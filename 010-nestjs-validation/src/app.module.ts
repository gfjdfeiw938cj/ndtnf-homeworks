import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import "dotenv/config";


@Module({
  imports: [MongooseModule.forRoot(`${process.env.MONGODB_CONNECTION_STRING}`, { useFindAndModify: false }), BookModule, ],
  controllers: [AppController /*, BookController*/],
  providers: [AppService/*, BookService*/],
})
export class AppModule {}
