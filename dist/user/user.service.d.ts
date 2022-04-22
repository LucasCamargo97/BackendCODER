import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDTO } from '../dto/user.dto';
export declare class UserService {
    private UserModel;
    constructor(UserModel: Model<UserDocument>);
    createUser(userDTO: UserDTO): Promise<User>;
    getUsers(): Promise<User[]>;
    getUser(userId: String): Promise<User>;
    updateUser(userId: String, userDTO: UserDTO): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteUser(userId: String): Promise<import("mongodb").DeleteResult>;
}
