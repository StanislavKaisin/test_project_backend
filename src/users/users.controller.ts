import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { createUserSchema } from 'src/middleware/createUserSchema';
import { hash } from 'src/utils/encryption';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password);
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
