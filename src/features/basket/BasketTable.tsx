import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useState } from "react";
import agent from "../../app/api/agent";
import {useAppDispatch } from "../../app/store/configureStore";
import { setBasket, removeItem, reduceItemCount } from "./basketSlice";
import { BasketItem } from "../../app/models/basket";

interface Props{
    items : BasketItem[];
    isBasket?: boolean;
}
export default function BasketTable({items, isBasket=true}: Props){

    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: string, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
        .then(() => {
                      agent.Basket.get()
                      .then(basket => dispatch(setBasket(basket)))
                      .catch(error => console.log(error))})

        .catch(error => console.log(error))
        .finally(() => setStatus({ loading: false, name: '' }))
    }

    function handleRemoveItem(cartId: string,name: string) {
        setStatus({ loading: true, name });
        console.log(cartId)
        agent.Basket.removeItem(cartId)
            .then(() => dispatch(removeItem(cartId)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    function handleReduceItemCount(cartId: string, name: string) {
        setStatus({ loading: true, name });
        console.log(cartId)
        agent.Basket.reduceQuantity(cartId)
             .then(() => dispatch(reduceItemCount(cartId)))
             .catch(error => console.log(error))
             .finally(() => setStatus({ loading: false, name: '' }))
    }
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    {isBasket &&
                    <TableCell align="right"></TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item) => (
                    <TableRow
                        key={item.cartId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img style={{ height: 50, marginRight: 20 }} src={item.image} alt={item.name} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                        <TableCell align="center">
                        {isBasket &&
                        <LoadingButton
                                loading={status.loading && status.name === 'rem' + item.cartId}
                                onClick={() => handleReduceItemCount(item.cartId, 'rem' + item.cartId)}
                                color='error'>
                                <Remove />
                            </LoadingButton>}

                            {item.quantity}
                        {isBasket &&
                        <LoadingButton
                                loading={status.loading && status.name === 'add' + item.cartId}
                                onClick={() => handleAddItem(item.pId, 'add' + item.cartId)}
                                color='secondary'>
                                <Add />
                        </LoadingButton>}

                        </TableCell>
                        <TableCell align="right">{currencyFormat((item.price* item.quantity))}</TableCell>
                        {isBasket &&
                        <TableCell align="right">
                            <LoadingButton
                                loading={status.loading && status.name === 'del' + item.cartId}
                                onClick={() => handleRemoveItem(item.cartId, 'del' + item.cartId)}
                                color='error'>
                                <Delete />
                            </LoadingButton>
                        </TableCell>}
                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

    )
}