import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { createUserSchema } from 'src/middleware/createUserSchema';
import { hashPassword } from 'src/utils/encryption';

const MongoErrorDuplicateKeyErrorCode = 11000;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);

    const userToDb: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    try {
      const result = await this.usersService.create(userToDb);
      return result;
    } catch (error) {
      let errorMessage;
      if (
        error?.name === 'MongoError' &&
        error?.code == MongoErrorDuplicateKeyErrorCode
      ) {
        errorMessage = 'User with this email is already registered.';
      }
      throw new BadRequestException(errorMessage || error.message);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}