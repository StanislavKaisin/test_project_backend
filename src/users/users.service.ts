import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    return this.usersModel.create(createUserDto);
  }

  async findAll() {
    return await this.usersModel.find();
  }

  async findOne(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async findOneById(id: string) {
    return await this.usersModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      useFindAndModify: false,
    });
  }
}
