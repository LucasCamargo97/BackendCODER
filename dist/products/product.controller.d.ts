import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(): ProductEntity[];
}
