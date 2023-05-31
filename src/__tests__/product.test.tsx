import { Product, ProductParams } from '../app/models/product'
describe("Product and ProductParams interfaces", () => {
    test("Product interface should have correct properties", () => {
      const product: Product = {
        pId: "productId",
        name: "product name",
        brand: "product brand",
        category: "product category",
        price: 9.99,
        stock: 10,
        description: "product description",
        image: "product image url",
      };
      expect(product.pId).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.brand).toBeDefined();
      expect(product.category).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.stock).toBeDefined();
      expect(product.description).toBeDefined();
      expect(product.image).toBeDefined();
    });
  
    test("ProductParams interface should have correct properties", () => {
      const productParams: ProductParams = {
        orderBy: "price",
        searchTerm: "product name",
        types: ["type1", "type2"],
        brands: ["brand1", "brand2"],
        pageNumber: 1,
        pageSize: 20,
      };
      expect(productParams.orderBy).toBeDefined();
      expect(productParams.searchTerm).toBeDefined();
      expect(productParams.types).toBeDefined();
      expect(productParams.brands).toBeDefined();
      expect(productParams.pageNumber).toBeDefined();
      expect(productParams.pageSize).toBeDefined();
    });
  });
  