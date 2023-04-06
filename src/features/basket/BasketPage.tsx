import { Button, Grid} from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";
import EmptyBasket from "../../app/errors/EmptyBasket";

export default function BasketPage(){

    const { basket} = useAppSelector(state => state.basket);

    if (!basket || basket?.items.length===0){
        return <EmptyBasket />
    } 


    return (
        <>
        <BasketTable items={basket!.items} />

            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                        color="primary"
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>

        </>

    )
}