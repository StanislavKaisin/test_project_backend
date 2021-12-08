import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './entities/alert.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AlertsController],
  imports: [TypeOrmModule.forFeature([AlertEntity, UserEntity]), UsersModule],
  providers: [AlertsService],
})
export class AlertsModule {}
