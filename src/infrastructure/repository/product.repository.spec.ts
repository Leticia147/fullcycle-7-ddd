import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository teste", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {  
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
           
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Deve criar um produto", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10.00);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: 1 } });
        expect(productModel.toJSON()).toStrictEqual(
            {
                id: "1",
                name: "Produto 1",
                price: 10.00,
            });
    });

    it("Deve atualizar um produto", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10.00);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({ where: { id: 1 } });
        expect(productModel.toJSON()).toStrictEqual(
            {
                id: "1",
                name: "Produto 1",
                price: 10.00,
        });

        product.changeName("Produto 2");
        product.changePrice(20.00);
        await productRepository.update(product);
        const productModel2 = await ProductModel.findOne({ where: { id: 1 } });

        expect(productModel2.toJSON()).toStrictEqual(
            {
                id: "1",
                name: "Produto 2",
                price: 20.00,
        });
    });

    it("Deve buscar um produto", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10.00);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({ where: { id: 1 } });
        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual(
            {
                id: foundProduct.id,
                name: foundProduct.name,
                price: foundProduct.price,
            }
        );
    });

    it("Deve buscar todos os produtos", async () => {     
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10.00);
        await productRepository.create(product);
        const product2 = new Product("2", "Produto 2", 20.00);
        await productRepository.create(product2);
        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProducts);
    });
});