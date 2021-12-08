import { ServeStaticModule } from '@nestjs/serve-static';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AlertsModule } from 'src/alerts/alerts.module';
import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { AppController } from 'src/App/app.controller';
import { AppService } from 'src/App/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { config } from 'src/Config/config';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
