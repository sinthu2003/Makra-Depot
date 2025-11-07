import { Test, TestingModule } from '@nestjs/testing';
import { ContactMessagesController } from './contact-messages.controller';

describe('ContactMessagesController', () => {
  let controller: ContactMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactMessagesController],
    }).compile();

    controller = module.get<ContactMessagesController>(ContactMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
