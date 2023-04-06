import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product} from "../../app/models/product";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";

interface Props{
    product : Product;
}

export default function ProductCard({product} : Props){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch  = useAppDispatch();
  const {user}  = useAppSelector(state => state.account);

  function handleAddItem(productId: string) {
    if(!user){
    console.log("in the if condition ");
    navigate('/login');
    return ;  
    }
    setLoading(true);
    agent.Basket.addItem(productId)
                .then(() => {
                              agent.Basket.get()
                              .then(basket => dispatch(setBasket(basket)))
                              .catch(error => console.log(error))})
        
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
};
    return(
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: '#003d60'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                    
                }
                title={product.name}
                titleTypographyProps={{
                    sx : {fontWeight: 'bold', color : '#006ead'}
                }}
            />
      <CardMedia
        sx={{ height: 140 , backgroundSize : 'contain'}}
        image={product.image}
        title={product.name}

      />
      <CardContent>
        <Typography gutterBottom color = '#006ead' variant="h5">
        {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="#006ead">
          {product.brand}
        </Typography>
      </CardContent>
      <CardActions>
      <LoadingButton 
                    loading={loading} 
                    onClick={() => handleAddItem(product.pId)} 
                    size="small">Add to Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.pId}`}>View</Button>
      </CardActions>
    </Card>
    )
}