import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('albums')
export class Albums {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  owner: string;
}
