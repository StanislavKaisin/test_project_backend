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
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URI, { useCreateIndex: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-54-220-166-184.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'rguwsfiigvqpkx',
      password:
        'fabcf8f4293331d668a62228764886e9fa94fabe6928f4c99c00d497188f403a',
      database: 'dd75tmti3i0ego',
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
