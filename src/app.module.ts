import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product/product.controller'
import { ProductService } from './product/product.service'
import { Product, ProductSchema } from './schemas/product.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AppController, ProductController, UserController],
  providers: [AppService, ProductService, UserService]
})
export class AppModule { }
