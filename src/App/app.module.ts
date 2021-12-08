import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { config } from 'src/Config/config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AlertsModule } from 'src/alerts/alerts.module';
import { CommentsModule } from 'src/comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.HOST,
      port: config.PORT,
      username: config.USERNAME,
      password: config.PASSWORD,
      database: config.DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [UserEntity, AlertEntity, CommentEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    AlertsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
