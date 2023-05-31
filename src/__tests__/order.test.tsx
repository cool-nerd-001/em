import { Order, OrderItem } from '../app/models/order'
describe('Order', () => {

    it('should create an empty order', () => {
      const order: Order = { array: [] };
      expect(order.array.length).toBe(0);
    });
  
    it('should add an order item', () => {
      const order: Order = { array: [] };
      const orderItem: OrderItem = {
        orderId: '123',
        cId: '001',
        pId: '0123',
        productName: 'Sample Product',
        quantity: 2,
        orderAmount: 20.00,
        orderDate: '2021-01-01',
        address: '123 Main St'
      };
      order.array.push(orderItem);
      expect(order.array.length).toBe(1);
      expect(order.array[0]).toEqual(orderItem);
    });
  
    it('should remove an order item', () => {
      const order: Order = { 
        array: [{
          orderId: '123',
          cId: '001',
          pId: '0123',
          productName: 'Sample Product',
          quantity: 2,
          orderAmount: 20.00,
          orderDate: '2021-01-01',
          address: '123 Main St'
        }] 
      };
      order.array.splice(0, 1);
      expect(order.array.length).toBe(0);
    });
  
  });
  