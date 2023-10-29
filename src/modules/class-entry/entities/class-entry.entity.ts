import { CreateClass } from 'src/modules/create-class/entities/create-class.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ClassEntry {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  _id: string;

  @ManyToOne(() => User, (user) => user._id, { eager: true })
  student: User;

  @ManyToOne(() => CreateClass, (createClass) => createClass._id, {
    eager: true,
  })
  class: CreateClass;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
