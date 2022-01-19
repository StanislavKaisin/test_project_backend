import { ServeStaticModule } from '@nestjs/serve-static';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AlertsModule } from 'src/alerts/alerts.module';
import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { AppController } from 'src/App/app.controller';
import { AppService } from 'src/App/app.service';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { config } from 'src/Config/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
