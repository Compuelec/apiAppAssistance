import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
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
}
