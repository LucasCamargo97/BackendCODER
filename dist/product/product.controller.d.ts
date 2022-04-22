import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(product: ProductDTO): Promise<import("../schemas/product.schema").Product>;
    getProduct(productId: String): Promise<import("../schemas/product.schema").Product>;
    getProducts(): Promise<import("../schemas/product.schema").Product[]>;
    updateProduct(productId: String, product: ProductDTO): Promise<import("../schemas/product.schema").Product & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteProduct(productId: String): Promise<import("mongodb").DeleteResult>;
}
