import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateProductsDto } from '../products/dto/create-products.dto';
import { updateProductsDto } from '../products/dto/update-products.dto';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class logicService {

    constructor(@InjectModel(Product.name) private prductModel: Model<ProductDocument>){
    }
  
   async getAll(): Promise<Product[]> {
        return this.prductModel.find().exec()
    }

    // async findAll(): Promise<Cat[]> {
    //     return this.catModel.find().exec();
    //   }


   async getById(id:string): Promise<Product> {
        return this.prductModel.findById(id)
    }

//    async create(productDto: CreateProductsDto): Promise<Product> {
//         const newPrduct = new this.prductModel( productDto )
//         return newPrduct.save()
//     }

    async create(productDto: CreateProductsDto): Promise<Product> {
        const newPrduct = await this.prductModel.create(productDto);
        return newPrduct;
      }

   async remove(id: string): Promise<Product> {
        return this.prductModel.findByIdAndRemove(id)
    }

    async update(id: string, productDto: updateProductsDto): Promise<Product> {
        return this.prductModel.findByIdAndUpdate(id, productDto, {new: true})
    }
}
