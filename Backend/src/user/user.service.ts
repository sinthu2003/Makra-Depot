import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose' 
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from 'src/dto/RefreshToken.dto';
import { v4 as uuid } from 'uuid';
import {Types} from 'mongoose'
import { Public } from 'src/public.decorator';
// import twilio, { Twilio } from 'twilio';
import * as twilio from 'twilio';
import { Twilio } from 'twilio';


@Injectable()
export class UserService {
  // twilio
    private gate: Twilio;

    private authKey = process.env.MSG91_AUTH_KEY;

  constructor(@InjectModel(User.name) private readonly userModel : Model<User>,
  private readonly jwt : JwtService,
){
   if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        throw new Error('Twilio credentials are missing in .env');
      }

      this.gate = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
}

  // signup
  async create(createUserDto: UserDto) {
    const { name,email,mobile_number,password,address,role} = createUserDto;
    // check if email exist
    const isExist = await this.userModel.findOne({email}) 
    if(isExist) {
      throw new BadRequestException('Email already in use')
    }

    // hash password
    const hashed = await bcrypt.hash(password,10)

    return await this.userModel.create({
      name,email,mobile_number,
      password : hashed,
      address,role
    });
  }


  // login
  async login(data : LoginDto) {
      const {email,password} = data
      // find mail
      const user = await this.userModel.findOne({email})
      if(user){
        // compare
        const isExist = await bcrypt.compare(password,user.password)
        if(!isExist){
          throw new NotFoundException('Wrong Credentials')
        }
        return this.createAccessToken(user)
      }
      throw new NotFoundException('Wrong Credentials')
  }

  // accesstoken
  async createAccessToken(user : any) {
      // access token
      const accesstoken = this.jwt.sign({id :user._id,role:user.role})

      // return accesstoken
      return {
        accesstoken : accesstoken,
      }
  }


  async getUserData ( id : string) {
    return await this.userModel.findById(id)
  }

  getUsersList(){
    return this.userModel.find()
  }

  // orderPlacedSms(data:any) {
  //   const {id,phone} = data
  //   const mobile = '+91'+phone
  //   // twilio
  //       return this.gate.messages.create({
  //           body:`Your Order from Firecrackers.com is Successfull. View Orders : https://makradepot.in/order-confirmation/${id}`,
  //           from:process.env.TWILIO_NUMBER,
  //           to:mobile
  //       })

  // }

}
