import { UserDTO } from '../dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: UserDTO): Promise<import("../schemas/user.schema").User>;
    getUser(userId: String): Promise<import("../schemas/user.schema").User>;
    getUsers(): Promise<import("../schemas/user.schema").User[]>;
    updateProduct(productId: String, product: UserDTO): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteProduct(productId: String): Promise<import("mongodb").DeleteResult>;
}
