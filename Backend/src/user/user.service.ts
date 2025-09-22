import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose' 
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schemas/RefreshToken.schema';
import { RefreshTokenDto } from 'src/dto/RefreshToken.dto';
import { v4 as uuid } from 'uuid';
import {Types} from 'mongoose'
import { Public } from 'src/public.decorator';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel : Model<User>,
  private readonly jwt : JwtService,
  @InjectModel(RefreshToken.name) private readonly refreshToken : Model <RefreshToken>
){}

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
          throw new UnauthorizedException('Wrong Credentials')
        }
        return this.createAccessToken(user)
      }
      throw new UnauthorizedException('Wrong Credentials')
  }

  // accesstoken
  async createAccessToken(user : any) {
      // refresh token
      const refreshToken = uuid()
      await this.createRefreshToken(user._id,refreshToken)

      // access token
      const accesstoken = this.jwt.sign({id :user._id,role:user.role})

      // return accesstoken
      return {
        accesstoken : accesstoken,
        refreshToken : refreshToken
      }
  }

  // refreshToken
  async createRefreshToken(userId : Types.ObjectId,token : string) {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    const result = await this.refreshToken.updateOne(
    {
        user_id :userId,
    },
    {
      $set : {refreshToken :token,
      expiryDate}},
    {
      upsert :true
    })
    return result
  }

  // checkExpiry
  async checkExpiry(refreshToken : RefreshTokenDto) {
    const response = await this.refreshToken.findOne({
      refreshToken : refreshToken.refreshToken,
      expiryDate : {$gte : new Date() }
    }).populate('user_id')
    if(!response) {
      throw new UnauthorizedException('Token is Invalid')
    }
    return this.createAccessToken(response.user_id)
  }

  async getUserData ( id : string) {
    return await this.userModel.findById(id)
  }

  getUsersList(){
    return this.userModel.find()
  }

}
