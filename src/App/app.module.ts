import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/Config/config';

console.log(`config`, config);

@Module({
  imports: [MongooseModule.forRoot(config.DB_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
