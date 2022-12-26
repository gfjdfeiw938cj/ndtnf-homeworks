import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { logicService } from './logicService/logic.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsModule } from './products/products.modules';


@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
