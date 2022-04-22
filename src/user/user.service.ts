import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }

  async createUser(userDTO: UserDTO): Promise<User> {
    const createdUser = new this.UserModel(userDTO)
    return createdUser.save()
  }

  async getUsers(): Promise<User[]> {
    return this.UserModel.find().exec()
  }

  async getUser(userId: String): Promise<User> {
    return this.UserModel.findOne({ _id: userId }).exec()
  }

  async updateUser(userId: String, userDTO: UserDTO) {
    return this.UserModel.findByIdAndUpdate({ _id: userId }, userDTO, { new: true }).exec()
  }

  async deleteUser(userId: String) {
    return this.UserModel.deleteOne({ _id: userId }).exec()
  }
}
