import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductDTO } from '../dto/product.dto';
export declare class ProductService {
    private ProductModel;
    constructor(ProductModel: Model<ProductDocument>);
    createProduct(productDTO: ProductDTO): Promise<Product>;
    getProducts(): Promise<Product[]>;
    getProduct(productId: String): Promise<Product>;
    updateProduct(productId: String, productDTO: ProductDTO): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    deleteProduct(productId: String): Promise<import("mongodb").DeleteResult>;
}
