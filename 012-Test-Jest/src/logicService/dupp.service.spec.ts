// import { Test, TestingModule } from '@nestjs/testing';
// import { DuppService } from './logic.service';

// describe('DuppService', () => {
//   let service: DuppService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [DuppService],
//     }).compile();

//     service = module.get<DuppService>(DuppService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
//--------------------------------------------------------------------------

import { Test, TestingModule } from '@nestjs/testing';
import { logicService } from './logic.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';

const mockProducts = {
  title: 'Lord of the Rings',
  price: 1,
};

describe('logicService', () => {
  let service: logicService;
  let model: Model<Product>;
  
  const productsArray = [
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
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        logicService,
        {
          provide: getModelToken('Product'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProducts),
            constructor: jest.fn().mockResolvedValue(mockProducts),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<logicService>(logicService);
    model = module.get<Model<Product>>(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('we return all literary works(Products)', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(productsArray),
    } as any);
    const products = await service.getAll();
    expect(products).toEqual(productsArray);
  });

  it('a new literary work should be added(Products)', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'Lord of the Rings',
        price: 1
      }),
    );
    const newProduct = await service.create({
      title: 'Lord of the Rings',
      price: 1
    });
    expect(newProduct).toEqual(mockProducts);
  });
});