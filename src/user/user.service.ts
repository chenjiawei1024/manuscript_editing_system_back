import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const newUser = await this.user.save(user);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  async findAll() {
    const users = await this.user.find();

    return {
      message: 'All users retrieved successfully',
      data: users,
    };
  }

  async findOne(name: string) {
    const user = await this.user.findOne({
      where: { name: Like(`%${name}%`) },
    });

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }

    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async findById(user_id: number) {
    const user = await this.user.findOne({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.user.findOne({
      where: { name: username },
    });
    console.log(user);
    console.log(user.user_id);

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (!passwordMatches) {
      throw new NotFoundException(`Invalid password`);
    }

    const payload = { username: user.name, sub: user.user_id };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return {
      message: 'Login successful',
      statusCode: 200,
      user_id: user.user_id,
      token,
    };
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    const user = await this.user.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    const updatedUser = await this.user.save(user);

    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(user_id: number) {
    const user = await this.user.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    await this.user.remove(user);

    return {
      message: 'User removed successfully',
    };
  }
}
