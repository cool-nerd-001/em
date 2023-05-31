import { Basket } from "../app/models/basket";
describe('Basket interface', () => {
    test('should have items property of type BasketItem array', () => {
      const basket: Basket = {
        items: [
          {
            cartId: 'c123',
            pId: 'p123',
            name: 'Product Name',
            price: 10.99,
            image: 'https://example.com/image.jpg',
            quantity: 2
          }
        ]
      };
      expect(basket.items).toBeInstanceOf(Array);
      expect(basket.items[0]).toBeInstanceOf(Object);
      expect(basket.items[0].cartId).toBe('c123');
      expect(basket.items[0].pId).toBe('p123');
      expect(basket.items[0].name).toBe('Product Name');
      expect(basket.items[0].price).toBe(10.99);
      expect(basket.items[0].image).toBe('https://example.com/image.jpg');
      expect(basket.items[0].quantity).toBe(2);
    });
  });
  