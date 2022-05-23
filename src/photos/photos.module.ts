import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Photos } from './entity/photos.entity';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photos]), UsersModule],
  providers: [PhotosService],
  controllers: [PhotosController],
  exports: [],
})
export class PhotosModule {}
