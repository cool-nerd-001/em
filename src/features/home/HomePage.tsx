import { Box, Typography } from "@mui/material";
import Slider from 'react-slick';


export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed : 1500,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
        <Box display='flex' justifyContent='center' sx={{ p: 1 }}  >
                <div style={{paddingRight:"10px"}}>
                <Typography variant='h4'>
                    Welcome to the store
                </Typography>
                </div>
                
                <img src="/images/home-basket.png" alt="hero" style={{ width: '5%', maxHeight: 100,paddingTop:"0px"}} />
                
                
            </Box>
            <Slider {...settings}>
                <div>
                    <img src="/images/home1.png" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
                </div>
                <div>
                    <img src="/images/home2.png" alt="hero" style={{ display: 'block', width: '80%', maxHeight: 500 , paddingLeft: "200px"}} />
                </div>
                <div>
                    <img src="/images/home3.png" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
                </div>
            </Slider>
            
        </>
    )
}
