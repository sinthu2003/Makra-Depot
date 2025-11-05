import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtGuard } from './auth/jwt-auth.guard';

@Module({
  imports : [
    PassportModule,
    JwtModule.register({
          secret :'code@123',
          signOptions : {
            expiresIn : '1d'
          }
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema : UserSchema
      }

    ]),
  ],
  controllers: [UserController],
  providers : [UserService,JwtStrategy]
})
export class UserModule {}
