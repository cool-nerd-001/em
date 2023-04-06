import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { Order } from "../../app/models/order";
import { Link } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState<Order| null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Orders.list()
            .then(orders => {
                setOrders(orders)
            console.log(orders)})
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading) return <LoadingComponent message="Loading orders..." />

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total Amount</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.array.map((order) => (
                        <TableRow
                            key={order.orderId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.orderId}
                            </TableCell>
                            <TableCell align="center">{order.productName}</TableCell>
                            <TableCell align="center">{order.quantity}</TableCell>
                            <TableCell align="center">{currencyFormat(order.orderAmount)}</TableCell>
                            <TableCell align="center">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">
                            <Button component={Link} to={`/catalog/${order.pId}`}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}