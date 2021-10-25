import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
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
    MongooseModule.forRoot(config.DB_URI, { useCreateIndex: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      // entities: [__dirname + '/src/**/*.entities{.ts,.js}'],
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
