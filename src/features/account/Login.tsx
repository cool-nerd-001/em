import { FieldValues, useForm } from "react-hook-form";
import { signInUser } from "./accountSlice";
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onChange'
    });  

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            agent.Basket.get()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            navigate(location.state?.from || '/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: '#003d60' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" 
                onSubmit={handleSubmit(submitForm)} 
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    {...register('email', {required: 'Email is required'})}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                <LoadingButton 
                    disabled={!isValid}
                    loading={isSubmitting} 
                    type="submit" 
                    fullWidth 
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}