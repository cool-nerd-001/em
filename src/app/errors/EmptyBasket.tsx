import { Container, Typography } from "@mui/material";

export default function EmptyBasket() {



    return (
        <Container style={{ display: 'inline', alignItems: 'center',justifyContent: 'center'}}>
            <div style={{textAlign:'center'}}>
            <img src="/images/EmptyBasket.png" alt="hero" style={{ width: '47%', maxHeight: 400 ,paddingTop:"0px"}}/>
            </div>
            <div style={{textAlign:'center'}}>
            <Typography gutterBottom variant={'h5'}>Your basket is Empty</Typography>
            </div>

        </Container>
    )
}