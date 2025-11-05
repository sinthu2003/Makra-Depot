import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage } from 'src/schemas/ContactMessage';

@Injectable()
export class ContactMessagesService {
    constructor(@InjectModel(ContactMessage.name) private readonly model : Model<ContactMessage> ){}

    createMsg(data:any){
        return this.model.create(data)
    }
}
