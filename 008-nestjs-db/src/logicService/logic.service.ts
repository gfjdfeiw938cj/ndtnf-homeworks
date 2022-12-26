import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateProductsDto } from 'src/products/dto/create-products.dto';
import { updateProductsDto } from 'src/products/dto/update-products.dto';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class logicService {

    constructor(@InjectModel(Product.name) private prductModel: Model<ProductDocument>){
    }
  
   async getAll(): Promise<Product[]> {
        return this.prductModel.find().exec()
    }
   async getById(id:string): Promise<Product> {
        return this.prductModel.findById(id)
    }

   async create(productDto: CreateProductsDto): Promise<Product> {
        const newPrduct = new this.prductModel(productDto)
        return newPrduct.save()
    }

    async remove(id: string): Promise<Product> {
        return this.prductModel.findByIdAndRemove(id)
    }

    async update(id: string, productDto: updateProductsDto): Promise<Product> {
        return this.prductModel.findByIdAndUpdate(id, productDto, {new: true})
    }
}
