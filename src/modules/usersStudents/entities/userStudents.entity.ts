import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Role } from '../../../common/enums/rol.enum';

@Entity()
export class UserStudents {
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

  @Column({ type: 'enum', default: Role.STUDENT, enum: Role })
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
}
