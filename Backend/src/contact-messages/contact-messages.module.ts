import { Module } from '@nestjs/common';
import { ContactMessagesController } from './contact-messages.controller';
import { ContactMessagesService } from './contact-messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactMessage, ContactMessageSchema } from 'src/schemas/ContactMessage';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:ContactMessage.name,
      schema:ContactMessageSchema
    }])
  ],
  controllers: [ContactMessagesController],
  providers: [ContactMessagesService]
})
export class ContactMessagesModule {}
