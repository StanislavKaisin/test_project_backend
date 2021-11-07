import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Alert, AlertSchema } from 'src/schemas/alert.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './entities/alert.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AlertsController],
  imports: [
    MongooseModule.forFeature([{ name: Alert.name, schema: AlertSchema }]),
    TypeOrmModule.forFeature([AlertEntity, UserEntity]),
    UsersModule,
  ],
  providers: [AlertsService],
})
export class AlertsModule {}
