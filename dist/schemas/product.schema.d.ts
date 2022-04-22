/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    description: string;
    code: string;
    category: string;
    price: number;
    stock: number;
}
export declare const ProductSchema: import("mongoose").Schema<Document<Product, any, any>, import("mongoose").Model<Document<Product, any, any>, any, any, any>, {}, {}>;
