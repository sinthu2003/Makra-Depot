import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from 'src/schemas/RefreshToken.schema';
import {Model} from 'mongoose'
import { RefreshTokenDto } from 'src/dto/RefreshToken.dto';

@Injectable()
export class RefreshTokenService {}
