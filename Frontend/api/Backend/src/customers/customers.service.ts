import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Twilio } from 'twilio';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Customer } from '../schemas/Customer.schema';
import { Otp } from '../schemas/otp.schema';
import * as twilio from 'twilio/lib';

@Injectable()
export class CustomersService {
  private twilioClient: Twilio;

  constructor(
    @InjectModel(Customer.name) private customer: Model<Customer>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private jwtService: JwtService,
  ) {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        throw new Error('Twilio credentials are missing in .env');
      }

      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

    // Ensure TTL index for OTP (5 minutes)
    this.otpModel.createIndexes().catch(() => {});
    this.otpModel.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 }).catch(()=>{});
  }

  private generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(phone: string) {
    if (phone.length !== 10) throw new BadRequestException('Invalid phone');

    const code = this.generateOtp();

    // save or update OTP doc
    await this.otpModel.findOneAndUpdate(
      { phone: phone },
      { code, attempts: 0 },
      {upsert:true,new:true}
    );

    // send via Twilio 
    const to = `+91${phone}`;
    try {
      await this.twilioClient.messages.create({
        to : to,
        from: process.env.TWILIO_NUMBER,
        body: `Your verification code is ${code}. It will expire in 5 minutes - Firecrackers.com`,
      });
    } catch (err) {
      console.error('Twilio error', err);
      throw new BadRequestException('Failed to send OTP');
    }

    return {phone };
  }

  async verifyOtp(phone: string, code: string) {
    const otpDoc = await this.otpModel.findOne({ phone });

    if (!otpDoc) throw new NotFoundException('OTP expired or not found');
    if (otpDoc.code !== code) {
      // increment attempts
      otpDoc.attempts = (otpDoc.attempts || 0) + 1;
      await otpDoc.save();
      throw new NotFoundException('Invalid OTP');
    }
    // OTP ok — remove it (consumed)
    await this.otpModel.deleteOne({ phone });

    // find user
    const user = await this.customer.findOne({ phone }).lean();

    if (!user) {
      return { requiresRegistration: true, phone };
    }

    // create token
    const token = this.jwtService.sign({id:user._id,phone:user.phone});

    return { requiresRegistration: false, token, customer: user };
  }

  // sign up
  async completeRegistration(data : any) {
    // check if exists
    const {name,email,phone} = data
    const existing = await this.customer.findOne({phone:phone});
    if (existing) throw new BadRequestException('Phone already registered');

    const created = await this.customer.create({name,email,phone});
    const token =  this.jwtService.sign({id:created._id,phone:created.phone});

    return { token, customer: created };
  }

  // GET 
  async getUserData ( phone : string) {
    return await this.customer.findOne({phone})
  }

  async addAddress(phone:any,data:any){
    return await this.customer.findOneAndUpdate({phone},data)
  }

  // orderPlacedSms(data:any) {
  //   const {id,phone} = data
  //   const mobile = '+91'+phone
  //   // twilio
  //       return this.twilioClient.messages.create({
  //           body:`Your Order from Firecrackers.com is Successfull. View Orders : https://makradepot.in/order-confirmation/${id}`,
  //           from:process.env.TWILIO_NUMBER,
  //           to:mobile
  //       })
  // }

  orderUpdate(phone : any,total:any){
    return this.customer.findOneAndUpdate({phone},{$inc: {totalOrders:1,totalSpent:total}},{new:true})
  }

  async updateWishList(id :any ,wishlist : any){
    return this.customer.findOneAndUpdate({_id:id},{wishlist},{new:true})
  }


}
