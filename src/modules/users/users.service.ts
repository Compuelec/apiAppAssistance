import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { ClassEntry } from '../class-entry/entities/class-entry.entity';
import { AuthService } from '../../auth/auth.service';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(ClassEntry)
    private readonly classEntryRepository: Repository<ClassEntry>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExistsByRut = await this.usersRepository.findOne({
      where: { rut: createUserDto.rut },
    });

    if (userExistsByRut) {
      throw new HttpException('Rut is already in use', HttpStatus.BAD_REQUEST);
    }

    const userExistsByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExistsByEmail) {
      throw new HttpException(
        'E-mail is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User();
    user._id = this.authService.cryptoIdKey();
    user.rut = createUserDto.rut;
    user.username = createUserDto.username;
    user.name = createUserDto.name;
    user.lastNameM = createUserDto.lastNameM;
    user.lastNameF = createUserDto.lastNameF;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.role = createUserDto.role;
    user.isVerified = createUserDto.isVerified;
    user.isActive = createUserDto.isActive;
    user.token = createUserDto.token;
    user.avatar = createUserDto.avatar;

    await this.usersRepository.save(user);

    const userResponse: User = _.pick(user, [
      '_id',
      'rut',
      'username',
      'name',
      'lastNameM',
      'lastNameF',
      'email',
      'role',
      'isVerified',
      'avatar',
    ]);

    return userResponse;
  }

  async findAllSelect(select): Promise<User[]> {
    return this.usersRepository.find({ select: select });
  }

  async findAll(): Promise<User[]> {
    return this.findAllSelect([
      '_id',
      'rut',
      'username',
      'name',
      'lastNameM',
      'lastNameF',
      'email',
      'role',
      'isVerified',
      'avatar',
      'deletedAt',
    ]);
  }

  async findOne(_id: string): Promise<User> {
    return this.usersRepository.findOneBy({ _id: _id });
  }

  async update(_id: string, updateUser: UpdateUserDto): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { _id: _id },
    });
    user.rut = updateUser.rut ? updateUser.rut : user.rut;
    user.username = updateUser.username ? updateUser.username : user.username;
    user.name = updateUser.name ? updateUser.name : user.name;
    user.lastNameM = updateUser.lastNameM
      ? updateUser.lastNameM
      : user.lastNameM;
    user.lastNameF = updateUser.lastNameF
      ? updateUser.lastNameF
      : user.lastNameF;
    user.role = updateUser.role ? updateUser.role : user.role;
    user.isVerified = updateUser.isVerified
      ? updateUser.isVerified
      : user.isVerified;
    user.isActive = updateUser.isActive ? updateUser.isActive : user.isActive;
    user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;
    user.token = updateUser.token ? updateUser.token : user.token;
    if (updateUser.password) {
      user.password = await bcrypt.hash(updateUser.password, 10);
    }

    this.usersRepository.save(user);

    return 'User ' + user.username + ' updated';
  }

  async remove(idUserDelet: string): Promise<User> {
    const userToDelete = await this.usersRepository.findOne({
      where: { _id: idUserDelet },
    });
    if (!userToDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userResponse: User = _.pick(userToDelete, [
      '_id',
      'rut',
      'username',
      'name',
      'lastNameM',
      'lastNameF',
      'email',
      'role',
      'isVerified',
      'avatar',
    ]);

    userToDelete.deletedAt = new Date();
    await this.usersRepository.save(userToDelete);

    return userResponse;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
    });
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
