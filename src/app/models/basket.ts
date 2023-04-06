export interface Basket {
    items: BasketItem[]
  }
  
  export interface BasketItem {
    cartId: string
    pId: string
    name: string
    price: number
    image: string
    quantity: number
  }
  