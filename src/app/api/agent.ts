import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

//axios.defaults.baseURL = 'https://product1827.azurewebsites.net/api/rest/v1/';

//axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(response => {
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResponse(response.data,JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title || '400 bad request');
            break;
        case 401:
            toast.error(data.title || 'Unauthorised');
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})


const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url,{params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('https://product1827.azurewebsites.net/api/rest/v1/products',params),
    details: (id: string) => requests.get(`https://product1827.azurewebsites.net/api/rest/v1/${id}`),
    fetchFilters: () => requests.get('https://product1827.azurewebsites.net/api/rest/v1/filters')
}

const Basket = {
    get: () => requests.get("https://cart1827.azurewebsites.net/api/rest/v1/cart/items"),
    addItem: (productId: string) => requests.post(`https://cart1827.azurewebsites.net/api/rest/v1/cart/add`, {pId : productId}),
    removeItem: (cartId: string) => requests.del(`https://cart1827.azurewebsites.net/api/rest/v1/cart/delete/${cartId}`),
    reduceQuantity: (cartId: string) => requests.del(`https://cart1827.azurewebsites.net/api/rest/v1/cart/reduce/${cartId}`),
    clearCart: () => requests.del(`https://cart1827.azurewebsites.net/api/rest/v1/cart/clearAll`)
}

const Account = {
    login: (values: any) => requests.post('https://identity1827.azurewebsites.net/api/rest/v1/user/login', values),
    register: (values: any) => requests.post('https://identity1827.azurewebsites.net/api/rest/v1/user/register', values),
    currentUser: () => requests.get('https://identity1827.azurewebsites.net/api/rest/v1/user/currentuser')
}

const Orders = {
    list : () => requests.get('https://order1827.azurewebsites.net/api/rest/v1/order/items'),
    create: (values: any) => requests.post('https://order1827.azurewebsites.net/api/rest/v1/order/product', values)
}


const agent ={
    Catalog,
    Basket,
    Account,
    Orders
}

export default agent;