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
import { ProductDTO } from 'src/dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  createProduct(@Body() product: ProductDTO) {
    return this.productService.createProduct(product)
  }

  @Get(':id')
  getProduct(@Param('id') productId: String) {
    return this.productService.getProduct(productId)
  }

  @Get()
  getProducts() {
    return this.productService.getProducts()
  }

  @Put(':id')
  updateProduct(@Param('id') productId: String, @Body() product: ProductDTO) {
    return this.productService.updateProduct(productId, product)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') productId: String) {
    return this.productService.deleteProduct(productId)
  }
}
