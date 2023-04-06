import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import App from "../layout/App";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'orders', element: <Orders />},
                {path: 'checkout', element: <CheckoutPage />},
                {path: 'basket', element: <BasketPage />},
            ]},
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])