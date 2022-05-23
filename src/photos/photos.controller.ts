import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PhotosService } from './photos.service';
import { GetPhotosDto } from './dto/get_photos.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { PatchAlbumDto } from './dto/patch_album.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete('photo')
  async deletePhotos(@Body() id: number[]) {
    return await this.photoService.deletePhotos(id);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete('album')
  async deleteAlbum(@Body(ParseIntPipe) id: number[]) {
    return await this.photoService.deleteAlbum(id);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Post('load')
  async loadPhotos(@Request() req) {
    this.photoService.loadPhotos(req.user);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Get()
  async getPhotos(@Body() command: GetPhotosDto, @Request() req) {
    if (!command.ownerId) {
      command.ownerId = req.user.id;
    }
    return await this.photoService.getPhotos(command);
  }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Patch('change-album-title')
  async patchAlbum(@Body() command: PatchAlbumDto) {
    return await this.photoService.patchAlbum(command);
  }
}
