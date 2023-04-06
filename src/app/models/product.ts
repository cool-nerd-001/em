export interface Product {
    pId: string
    name: string
    brand: string
    category: string
    price: number
    stock: number
    description: string
    image: string
  }

  export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
}


  