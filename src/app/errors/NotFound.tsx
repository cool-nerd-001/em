import { Container, Typography} from "@mui/material";

export default function NotFound() {
    return (
        <Container style={{ display: 'inline', alignItems: 'center',justifyContent: 'center'}}>
            <div style={{textAlign:'center'}}>
            <img src="/images/NotFound.png" alt="hero" style={{ width: '47%', maxHeight: 500 ,paddingTop:"0px"}}/>
            </div>
            <div style={{textAlign:'center'}}>
            <Typography gutterBottom variant={'h5'}>Page not Found!</Typography>
            </div>

        </Container>
    )
}
