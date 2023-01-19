// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsController } from './products.controller';

// describe('ProductsController', () => {
//   let controller: ProductsController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProductsController],
//     }).compile();

//     controller = module.get<ProductsController>(ProductsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

//-----------------------------------------------------------------------
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { CreateProductsDto } from './dto/create-products.dto';
import { logicService } from '../logicService/logic.service'; 

console.log(logicService)

describe('Products Controller', () => {
  let controller: ProductsController;
  let service: logicService;
  const creatProductsDto: CreateProductsDto = {
    title: 'Lord of the Rings',
    price: 1,
  };

  const mockProducts = {
    title: 'Lord of the Rings',
    price: 1,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: logicService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                title: 'Lord of the Rings',
                price: 1,
              },
              {
                title: 'Kingdom',
                price: 2,
              },
              {
                name: 'Warhammer 40,000',
                price: 3,
              },
            ]),
            create: jest.fn().mockResolvedValue(CreateProductsDto),  
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<logicService>(logicService);
  });

  describe('create()', () => {
    it('created literary works', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockProducts);

      await controller.create(creatProductsDto);
      expect(createSpy).toHaveBeenCalledWith(creatProductsDto);
    });
  });

  describe('getAll()', () => {
    it('must return an array of literary works', async () => {
      expect(controller.getAll()).resolves.toEqual([
        {
          title: 'Lord of the Rings',
          price: 1
        },
        {
          title: 'Kingdom',
          price: 2
        },
        {
          name: 'Warhammer 40,000',
          price: 3
        },
      ]);
      expect(service.getAll).toHaveBeenCalled();
    });
  });
});

