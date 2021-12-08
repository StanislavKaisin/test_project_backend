import { ServeStaticModule } from '@nestjs/serve-static';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from 'src/App/app.controller';
import { AppService } from 'src/App/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { config } from 'src/Config/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AlertsController } from './alerts.controller';
import { AlertsModule } from './alerts.module';
import { AlertsService } from './alerts.service';
import { AlertEntity } from './entities/alert.entity';

describe('AlertsController', () => {
  let controller: AlertsController;

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

    controller = module.get<AlertsController>(AlertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
