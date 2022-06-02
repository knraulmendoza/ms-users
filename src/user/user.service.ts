import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}
  async checkPassword(password: string, passwordDb: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDb);
  }
  async findByUserName(username: string): Promise<IUser> {
    return await this.model.findOne({ username });
  }
  async hasPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  async create(userDto: UserDto): Promise<IUser> {
    const hash = await this.hasPassword(userDto.password);
    const newUser = new this.model({ ...userDto, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async update(id: string, userDto: UserDto): Promise<IUser> {
    const hash = await this.hasPassword(userDto.password);
    const user = { ...userDto, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<IUser> {
    return await this.model.findByIdAndDelete(id);
  }
}
