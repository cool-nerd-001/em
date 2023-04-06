export interface Order {
    array: OrderItem[]
  }
  
  export interface OrderItem {
    orderId: string
    cId: string
    pId: string
    productName: string
    quantity: number
    orderAmount: number
    orderDate: string
    address: string
  }