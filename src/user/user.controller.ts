import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { UserDTO } from '../dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  createUser(@Body() user: UserDTO) {
    return this.userService.createUser(user)
  }

  @Get(':id')
  getUser(@Param('id') userId: String) {
    return this.userService.getUser(userId)
  }

  @Get()
  getUsers() {
    return this.userService.getUsers()
  }

  @Put(':id')
  updateProduct(@Param('id') productId: String, @Body() product: UserDTO) {
    return this.userService.updateUser(productId, product)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') productId: String) {
    return this.userService.deleteUser(productId)
  }
}
