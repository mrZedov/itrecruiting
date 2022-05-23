import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('photos')
export class Photos {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: number;

  @Column()
  albumId: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  albumName: string;

  @Column()
  user: string;
}
