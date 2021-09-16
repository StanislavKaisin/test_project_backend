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
  BadRequestException,
  HttpException,
  HttpStatus,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { createUserSchema } from 'src/middleware/createUserSchema';
import { hash } from 'src/utils/encryption';
import { error } from 'console';
import { Response } from 'express';
import { MongoFilter } from 'src/middleware/MongoExceptionFilter';
import { BadRequestFilter } from 'src/middleware/BadRequestFilter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @UseFilters(BadRequestFilter, MongoFilter)
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const hashedPassword = await hash(createUserDto.password);

    const userToDb: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    try {
      const result = await this.usersService.create(userToDb);
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return await this.usersService.create(userToDb).catch((err) => {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // });
    // this.usersService.create(userToDb).catch((err) => {
    //   console.log(`err`, err);
    // });
    // try {
    //   return await this.usersService.create(userToDb).catch((err) => {
    //     console.log(`err`, err);
    //     throw new HttpException(
    //       {
    //         message: err.message,
    //       },
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   });
    // } catch (error) {
    //   console.log(`er=`, error);
    // }
    // try {
    //   return await this.usersService.create(userToDb).catch((err) => {
    //     throw new HttpException(
    //       {
    //         message: err.message,
    //       },
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   });
    // } catch (error) {
    //   return new BadRequestException(error);
    // }
    // this.usersService
    //   .create(userToDb)
    //   .then(
    //     (resolvedData) => {
    //       // console.log(`data=`, data);
    //       // return new BadRequestException(data);
    //       // console.log(
    //       //   `data.hasOwnProperty('Error')`,
    //       //   data.hasOwnProperty('Error'),
    //       // );
    //       // console.log(`data instanceof Error`, data instanceof Error);
    //       return res.status(HttpStatus.FORBIDDEN).json(resolvedData);

    //       // if (!(data instanceof Error)) {
    //       //   return data;
    //       // } else {
    //       //   // return new HttpException(data.message, HttpStatus.FORBIDDEN);
    //       //   console.log(`data`, data);
    //       //   return res.status(HttpStatus.FORBIDDEN).json(data);
    //       // }
    //     },
    //     (rejectedData) => {
    //       return res.status(HttpStatus.FORBIDDEN).send(rejectedData);
    //     },
    //   )
    //   .catch((error) => {
    //     console.log(`error=`, error);
    //     return res.status(HttpStatus.FORBIDDEN).send(error);
    //   });

    // console.log(`newUser=`, JSON.stringify(newUser));
    // return newUser;
    // if (newUser === 'MongoError') throw new Error();
    // else return newUser;
    // return await this.usersService.create(userToDb);
    // } catch (error) {
    //   return new BadRequestException(error);
    // }
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
