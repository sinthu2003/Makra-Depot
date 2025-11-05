import { Body, Controller, Post } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';

@Controller('contact-messages')
export class ContactMessagesController {
    constructor(private readonly service : ContactMessagesService){}
    
    @Post()
    createMessage(@Body() data:any){
        return this.service.createMsg(data)
    }
}
