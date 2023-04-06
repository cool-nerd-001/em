import { Basket } from "../models/basket";

export function currencyFormat(amount: number) {
    var currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(amount);
    return currency;
  }


  interface Productdetails {
    pId: string
    name: string
    price: number
    quantity: number
  }

  interface Paymentdetails {
    creditCardNumber: string
    cvv: string
    expiryYear: string
  }

  export function orderFormat(basket : Basket|null,addressDetails:any ,cardNumber:string,cvv:string,expiryYear:string){

    const array: Productdetails[] = basket!.items.map(({ pId, name, price,quantity}) => ({pId, name, price,quantity}));

    const address: string = Object.values(addressDetails).join(',    ');

    const payment: Paymentdetails = {
      creditCardNumber: cardNumber,
      cvv: cvv,
      expiryYear: expiryYear,
    };

    return ({Address:address,Orders:array,Payment:payment})

  }