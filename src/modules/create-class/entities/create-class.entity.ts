import { ClassEntry } from 'src/modules/class-entry/entities/class-entry.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CreateClass {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  _id: string;

  @Column({ nullable: false })
  course: string;

  @Column({ nullable: false })
  room: string;

  @ManyToOne(() => User, (user) => user._id, { eager: true })
  teacher: User;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ClassEntry, (classEntry) => classEntry.class)
  classEntry: ClassEntry[];
}
