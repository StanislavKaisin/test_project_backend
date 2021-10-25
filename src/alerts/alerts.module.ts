import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Alert, AlertSchema } from 'src/schemas/alert.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './entities/alert.entity';

@Module({
  controllers: [AlertsController],
  imports: [
    MongooseModule.forFeature([{ name: Alert.name, schema: AlertSchema }]),
    TypeOrmModule.forFeature([AlertEntity]),
  ],
  providers: [AlertsService],
})
export class AlertsModule {}
