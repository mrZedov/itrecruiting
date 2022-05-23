import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Photos } from './photos/entity/photos.entity';
import { Users } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
require('dotenv').config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_MONGODB,
      database: 'itrecruiting',
      entities: [Users, Photos],
      useUnifiedTopology: true,
    }),
    TypeOrmModule.forFeature([Users, Photos]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    AuthModule,
    UsersModule,
    PhotosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
