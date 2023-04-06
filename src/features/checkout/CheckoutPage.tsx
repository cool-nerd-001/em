import { Paper, Typography, Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { yupResolver } from '@hookform/resolvers/yup';
import {FieldValues, FormProvider, useForm } from "react-hook-form";
import { validationSchema } from "./checkoutValidation";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { orderFormat } from "../../app/util/util";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <Review/>;
        case 2:
            return <PaymentForm/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function CheckoutPage() {

    const {basket} = useAppSelector(state => state.basket)
    const [activeStep, setActiveStep] = useState(0);
    const [loading , setLoading] = useState(false);
    const dispatch  = useAppDispatch();
    const currentValidationSchema = validationSchema[activeStep];

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(currentValidationSchema)
    })

    const handleNext = async (data: FieldValues) => {
        const {cardNumber , cvv, expiryYear , ...addressdetails} = data
        if(activeStep=== steps.length - 1 ){
            setLoading(true)
            const orderDeatils = orderFormat(basket,addressdetails,cardNumber , cvv, expiryYear)
            try{
                await agent.Orders.create(orderDeatils);
                await agent.Basket.clearCart();
                setActiveStep(activeStep + 1);
                dispatch(setBasket(null));
                setLoading(false);

            } catch (error){
                console.log(error);
                setLoading(false);
            }
            

        }else{
            setActiveStep(activeStep + 1);
        }
        
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <FormProvider {...methods}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order has been placed Successfully. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </>
                ) : (
                    <form onSubmit={methods.handleSubmit(handleNext)}>
                
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Back
                                </Button>
                            )}
                            <LoadingButton
                                loading = {loading}
                                disabled = {!methods.formState.isValid}
                                variant="contained"
                                type = 'submit'
                                sx={{mt: 3, ml: 1}}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </>
        </Paper>
        </FormProvider>
    );
}