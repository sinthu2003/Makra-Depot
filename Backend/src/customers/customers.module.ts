import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/Category.schema';
import { Customer, CustomerSchema } from 'src/schemas/Customer.schema';
import { JwtModule } from '@nestjs/jwt';
import { Otp, OtpSchema } from 'src/schemas/otp.schema';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports : [
        MongooseModule.forFeature([
          {
            name: Customer.name,
            schema : CustomerSchema
          }
        ]),
        MongooseModule.forFeature([
          {
            name: Otp.name,
            schema : OtpSchema
          }
        ]),
        JwtModule.register({
        secret: 'code@123',
        signOptions : {
            expiresIn : '1d'
          }
      }),
      ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
