
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/orderItem";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import { Sequelize } from "sequelize-typescript";

describe("order repository teste", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {  
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel, ProductModel, OrderItemModel, OrderModel]);
        await sequelize.sync();
           
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");

        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", customer.id, [ordemItem]);
        const orderRepository = new OrderRepository();  
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual(
            {
                id: "123",
                customer_id: "123",
                total: 200,
                items: [
                    {
                        id: ordemItem.id,
                        product_id: "123",
                        order_id: "123",
                        quantity: ordemItem.quantity,
                        name: ordemItem.name,
                        price: ordemItem.price,         
                    }
                ]
        });
    });

    it("Should get an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");

        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const ordemItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );
        const orderRepository = new OrderRepository();  
        const order = new Order("123", "123", [ordemItem]);
        await orderRepository.create(order);
        const order2 = new Order("23", "123", [ordemItem2]);
        await orderRepository.create(order2);
  
        const orderModel = await OrderModel.findOne({
            where: { id: 23 },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual(
            {
                id: "23",
                customer_id: "123",
                total: 200,
                items: [
                    {
                        id: "2",
                        product_id: "123",
                        order_id: "23",
                        quantity: ordemItem.quantity,
                        name: ordemItem.name,
                        price: ordemItem.price,         
                    }
                ]
        });
    });

    it("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");

        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);
        
        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            1
        );

        let order =  new Order("123", "123", [ordemItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        let orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual(
            {
                id: "123",
                customer_id: "123",
                total: 100,
                items: [
                    {
                        id: ordemItem.id,
                        product_id: "123",
                        order_id: "123",
                        quantity: ordemItem.quantity,
                        name: ordemItem.name,
                        price: ordemItem.price,         
                    }
                ]
        });

        const product2 = new Product("3", "Product 2", 10);
        await productRepository.create(product2);

        const ordemItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2,
        );
        const order2 =  new Order("123", "123", [ordemItem2]);
        await orderRepository.update(order2);

        orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual(
            {
                id: "123",
                customer_id: "123",
                total: 20,
                items: [
                    {
                        id: ordemItem2.id,
                        product_id: "3",
                        order_id: "123",
                        quantity: ordemItem2.quantity,
                        name: ordemItem2.name,
                        price: ordemItem2.price,         
                    }
                ]
        });
    });

    it("Should get all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "Zipcode 1");

        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const ordemItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );
        const orderRepository = new OrderRepository();  
        const order = new Order("123", "123", [ordemItem]);
        await orderRepository.create(order);
        const order2 = new Order("23", "123", [ordemItem2]);
        await orderRepository.create(order2);
  
        const orderModel = await OrderModel.findAll({include: ["items"]});

        expect(orderModel.map((order) => order.toJSON())).toStrictEqual(
            [{
                id: "123",
                customer_id: "123",
                total: 200,
                items: [
                    {
                        id: "1",
                        product_id: "123",
                        order_id: "123",
                        quantity: ordemItem.quantity,
                        name: ordemItem.name,
                        price: ordemItem.price,         
                    }
                ]
            }, {
                id: "23",
                customer_id: "123",
                total: 200,
                items: [
                    {
                        id: "2",
                        product_id: "123",
                        order_id: "23",
                        quantity: ordemItem2.quantity,
                        name: ordemItem2.name,
                        price: ordemItem2.price,         
                    }
                ]
            }]
        );
    });
});