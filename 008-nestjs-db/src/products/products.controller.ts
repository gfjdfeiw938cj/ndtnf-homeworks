import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { updateProductsDto } from './dto/update-products.dto';
import { logicService } from 'src/logicService/logic.service';
import { Product } from 'src/schemas/product.schema';


@Controller('product')
export class ProductsController {
    
    constructor(private readonly productsServise: logicService){  
    }

    @Get()
    getAll(): Promise<Product[]> {  
        return this.productsServise.getAll()
    }

    @Get(":id")
    getOne(@Param('id') id: string): Promise<Product>{
        return this.productsServise.getById(id)
    }

    @Post()
    create(@Body() CreateProductsDto: CreateProductsDto): Promise<Product> {
        return this.productsServise.create(CreateProductsDto)
    }

   
    @Delete(":id")
    remove(@Param('id') id: string): Promise<Product>{
        return this.productsServise.remove(id)
    }

    @Put(":id")
    update(@Body() updateProductsDto: updateProductsDto, @Param('id') id: string): Promise<Product>{
        return this.productsServise.update(id, updateProductsDto)
    }

}
