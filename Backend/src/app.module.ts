import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { WishListModule } from './wish-list/wish-list.module';
import { UserModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshTokenModule } from './user/auth/refresh-token/refresh-token.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './user/auth/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './user/auth/jwt.strategy';

@Module({
  imports: [
    CartModule,
    MongooseModule.forRoot('mongodb://localhost:27017/eshop'),
    ProductModule,
    WishListModule,
    UserModule,
    RefreshTokenModule,
    PassportModule,
    JwtModule.register({
          secret :'code@123',
          signOptions : {
            expiresIn : '1d'
          }
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide : APP_GUARD,
      useClass : JwtGuard
    }
  ],
})
export class AppModule {}
