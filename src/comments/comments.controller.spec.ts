import { ServeStaticModule } from '@nestjs/serve-static';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AlertsModule } from 'src/alerts/alerts.module';
import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { AppController } from 'src/App/app.controller';
import { AppService } from 'src/App/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { config } from 'src/Config/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsModule } from './comments.module';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';

describe('CommentsController', () => {
  let controller: CommentsController;

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

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
