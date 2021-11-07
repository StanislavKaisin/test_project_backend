import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findOne(email: string) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .select('user.*')
      .addSelect('user.password')
      .getRawOne();

    return result;
  }

  async findOneById(id: number) {
    const result = await this.userRepository.findOne(id);
    return result;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.save(updateUserDto);
  }
}
