import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { ClassEntry } from '../../class-entry/entities/class-entry.entity';
import { Role } from '../../../common/enums/rol.enum';
import { CreateClass } from 'src/modules/create-class/entities/create-class.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  _id: string;

  @Column({ unique: true, nullable: false })
  rut: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  lastNameM: string;

  @Column()
  lastNameF: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', default: Role.TEACHER, enum: Role })
  role: Role;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 500, nullable: true })
  token: string;

  @Column({ nullable: true })
  avatar: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ClassEntry, (classEntry) => classEntry.student)
  classEntry: ClassEntry[];

  @OneToMany(() => CreateClass, (createClass) => createClass.teacher)
  createClass: CreateClass[];
}
