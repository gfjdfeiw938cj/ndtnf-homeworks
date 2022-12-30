import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.model'
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name:Book.name, schema:BookSchema }])],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]    
})
export class BookModule {}
