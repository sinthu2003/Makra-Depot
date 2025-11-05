import { Test, TestingModule } from '@nestjs/testing';
import { AbandonedCartsController } from './abandoned-carts.controller';

describe('AbandonedCartsController', () => {
  let controller: AbandonedCartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbandonedCartsController],
    }).compile();

    controller = module.get<AbandonedCartsController>(AbandonedCartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
