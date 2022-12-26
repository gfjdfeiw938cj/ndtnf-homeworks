import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/schemas/product.schema";
import { logicService } from "../logicService/logic.service";
import { ProductsController } from "./products.controller";

@Module({
    providers: [logicService],
    controllers: [ProductsController],
    imports: [
        MongooseModule.forFeature( [
            {name: Product.name, schema: ProductSchema}
        ])
    ] 
})

export class ProductsModule {
    
}