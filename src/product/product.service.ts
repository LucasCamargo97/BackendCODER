import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

  async createProduct(productDTO: ProductDTO): Promise<Product> {
    const createdProduct = new this.ProductModel(productDTO)
    return createdProduct.save()
  }

  async getProducts(): Promise<Product[]> {
    return this.ProductModel.find().exec()
  }

  async getProduct(productId: String): Promise<Product> {
    return this.ProductModel.findOne({ _id: productId }).exec()
  }

  async updateProduct(productId: String, productDTO: ProductDTO) {
    return this.ProductModel.findByIdAndUpdate({ _id: productId }, productDTO, { new: true }).exec()
  }

  async deleteProduct(productId: String) {
    return this.ProductModel.deleteOne({ _id: productId }).exec()
  }
}
