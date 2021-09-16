import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // console.log(`createUserDto`, createUserDto);
    this.usersModel.create(createUserDto);
    // try {
    //   return await this.usersModel.create(createUserDto);
    // } catch (error) {
    //   // return error.message;
    //   // console.log(
    //   //   `error`,
    //   //   /^E11000 duplicate key error collection/.test(error.message),
    //   // );
    //   // return new BadRequestException(error);
    //   // console.log(`error`, error);
    //   if (/^E11000 duplicate key error collection/.test(error.message)) {
    //     return new Error('User with this email is already registered.');
    //   }
    //   // return new Error('User with this email is already registered.');
    //   // throw new BadRequestException();
    // }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
