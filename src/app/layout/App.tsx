import { useEffect, useState } from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoadingComponent from './LoadingComponent';
import { store, useAppDispatch} from '../store/configureStore';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { setBasket } from '../../features/basket/basketSlice';
import agent from '../api/agent';
import { blue } from '@mui/material/colors';


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    const token = store.getState().account.user?.token;
    if(token){
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
    }
    setLoading(false)
    
  }, [dispatch])


  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode? 'dark' : 'light';
  const theme = createTheme({
    palette : {
      primary: {
        main: blue[900],
      },
      secondary: {
        main: blue[900],
      },
      mode : paletteType,
      background:{
        default : paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;
