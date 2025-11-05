import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/schemas/Company.schema';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private readonly model : Model<Company> ){}

    async getData(){
        const company = await this.model.find();
        return {
        success: true,
        code: 200,
        data: company
        };
    }
}
