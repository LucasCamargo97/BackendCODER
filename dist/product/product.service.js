"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const product_schema_1 = require("../schemas/product.schema");
let ProductService = class ProductService {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async createProduct(productDTO) {
        const createdProduct = new this.ProductModel(productDTO);
        return createdProduct.save();
    }
    async getProducts() {
        return this.ProductModel.find().exec();
    }
    async getProduct(productId) {
        return this.ProductModel.findOne({ _id: productId }).exec();
    }
    async updateProduct(productId, productDTO) {
        return this.ProductModel.findByIdAndUpdate({ _id: productId }, productDTO, { new: true }).exec();
    }
    async deleteProduct(productId) {
        return this.ProductModel.deleteOne({ _id: productId }).exec();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map