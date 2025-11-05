import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './user/auth/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './user/auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { CompanyModule } from './company/company.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { AbandonedCartsModule } from './abandoned-carts/abandoned-carts.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/makradepot'),
    ConfigModule.forRoot({isGlobal:true}),
    UserModule,
    PassportModule,
    JwtModule.register({
          secret :'code@123',
          signOptions : {
            expiresIn : '1d'
          }
    }),
    OrderModule,
    CategoriesModule,
    BrandsModule,
    CompanyModule,
    ProductsModule,
    CustomersModule,
    OtpModule,
    CouponModule,
    OrderModule,
    ContactMessagesModule,
    AbandonedCartsModule,
  ],
  controllers: [AppController, OtpController],
  providers: [
    AppService,
    // JwtStrategy,
    // {
    //   provide : APP_GUARD,
    //   useClass : JwtGuard
    // }
  ],
})
export class AppModule {}
