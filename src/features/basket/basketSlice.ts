import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

interface BasketState {
    basket: Basket | null;
}

const initialState: BasketState = {
	basket: null,
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },

        reduceItemCount:(state, action) =>{
            const cartId = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.cartId === cartId);
            if(itemIndex === -1 ||  itemIndex === undefined) {
                return ;
            }
            state.basket!.items[itemIndex].quantity -= 1 ;
            if (state.basket?.items[itemIndex].quantity===0){
                state.basket.items.splice(itemIndex,1);
            }
        },

        removeItem:(state, action) =>{
            const cartId = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.cartId===cartId)
            if(itemIndex === -1 ||  itemIndex === undefined) {
                return ;
            }
            state.basket!.items.splice(itemIndex,1);
        },


    }

})

export const {setBasket , reduceItemCount , removeItem} = basketSlice.actions;