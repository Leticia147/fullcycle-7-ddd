import Customer from './entity/customer';
import Address from './entity/address';
import OrderItem from './entity/order_item';
import Order from './entity/order';


let customer = new Customer('123', 'Doe');
const address = new Address('rua', 3, '123+-000', 'PF');
customer.Address = address;

const item1 = new OrderItem('1', 'item1', 100);
const item2 = new OrderItem('2', 'item2', 200);
const order = new Order('1', '123', [item1, item2]);
