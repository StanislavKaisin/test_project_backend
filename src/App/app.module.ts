import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/Config/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forRoot(config.DB_URI), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
