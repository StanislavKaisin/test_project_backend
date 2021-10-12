import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { createUserSchema } from 'src/middleware/createUserSchema';
import { hashPassword } from 'src/utils/encryption';
import { updateUserSchema } from 'src/middleware/updateUserSchema';

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

  // @Get()
  // async findAll() {
  //   return await this.usersService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.usersService.findOneById(id);
  // }

  @Patch(':id')
  // @UsePipes(new JoiValidationPipe(updateUserSchema))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // validation is here as for some reasons UsePipes does not work
    const { error } = updateUserSchema.validate(updateUserDto, {
      errors: {
        wrap: {
          label: '',
        },
      },
    });
    if (error) {
      throw new BadRequestException(error.message);
    } else {
      const userFromDb = await this.usersService.findOneById(id);
      if (!userFromDb) {
        throw new BadRequestException('User not found!');
      } else {
        //
        const dataToUpdate = {
          ...JSON.parse(JSON.stringify(userFromDb)),
          ...updateUserDto,
        };
        return this.usersService.update(id, dataToUpdate);
      }
    }
  }
}
