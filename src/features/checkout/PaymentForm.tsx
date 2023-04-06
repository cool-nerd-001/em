import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";

export default function PaymentForm() {
  const {control} = useFormContext()
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          <AppTextInput name='cardNumber' label="Card Number" control = {control}/>
          </Grid>

          <Grid item xs={12} md={6}>
          <AppTextInput name='cvv' label="Cvv" control = {control}/>
          </Grid>

          <Grid item xs={12} md={6}>
          <AppTextInput name='expiryYear' label="Expiry year" control = {control}/>
          </Grid>
          

        </Grid>
      </>
    );
  }