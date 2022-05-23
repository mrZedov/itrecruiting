import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UserDataDto } from 'src/users/dto/user_data.dto';
import { Repository } from 'typeorm';
import { GetPhotosDto } from './dto/get_photos.dto';
import { Photos } from './entity/photos.entity';
import { ObjectId } from 'bson';
import { PatchAlbumDto } from './dto/patch_album.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photos)
    private readonly photoRepository: Repository<Photos>,
  ) {}

  async loadPhotos(user: UserDataDto) {
    await axios({
      url: process.env.LOAD_PHOTOS_URL,
      method: 'get',
    }).then((response) => {
      for (let element of response.data) {
        element.user = user.id;
        this.photoRepository.save(element);
      }
    });
  }

  async getPhotos(command: GetPhotosDto): Promise<Photos[]> {
    return await this.photoRepository.find({
      where: { user: ObjectId(command.ownerId) },
      skip: command.page,
      take: command.maxcount,
    });
  }

  async add(photo): Promise<Photos> {
    return this.photoRepository.save(photo);
  }

  async deleteAlbum(idAlbum: number | number[]) {
    idAlbum = Array.isArray(idAlbum) ? idAlbum : [idAlbum];
    this.photoRepository
      .find({ where: { albumId: { $in: idAlbum } } })
      .then((doc) => doc.forEach((el) => this.photoRepository.delete(el)));
  }

  async deletePhotos(idPhoto: number | number[]) {
    idPhoto = Array.isArray(idPhoto) ? idPhoto : [idPhoto];
    this.photoRepository
      .find({ where: { id: { $in: idPhoto } } })
      .then((doc) => doc.forEach((el) => this.photoRepository.delete(el)));
  }

  async patchAlbum(command: PatchAlbumDto) {
    const rrr = await this.photoRepository.update(
      { albumId: command.albumid },
      { albumName: command.new_album_name },
    );
  }
}
