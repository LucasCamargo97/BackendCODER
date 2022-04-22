"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const product_controller_1 = require("./product/product.controller");
const product_service_1 = require("./product/product.service");
const product_schema_1 = require("./schemas/product.schema");
const user_schema_1 = require("./schemas/user.schema");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }])
        ],
        controllers: [app_controller_1.AppController, product_controller_1.ProductController, user_controller_1.UserController],
        providers: [app_service_1.AppService, product_service_1.ProductService, user_service_1.UserService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map