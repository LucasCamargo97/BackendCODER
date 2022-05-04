import Dao from "../models/Dao.js";
import UserService from "./users.service.js";
import ProductService from "./products.service.js";
import config from "../config/config.js";

const dao = new Dao(config.mongo);

export const userService = new UserService(dao);
export const productService = new ProductService(dao);