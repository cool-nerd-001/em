import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
    { title: 'Home', path: '/' },
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
]

const navStyles = {
    //color: 'inherit',
    color : "#FFFFFF",
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props{
    darkMode : boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange} : Props) {

    const {basket} = useAppSelector(state => state.basket);
    const {user}  = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <AppBar position='static' sx={{mb:4}} style = {{background :'#003d60'}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                <Typography variant="h6" component={NavLink}
                 to='/'
                 sx={navStyles}
                 >
                    STL Retail
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title}
                        </ListItem>
                    ))}
                </List>

                <Box display = 'flex' alignItems='center'>
                <IconButton component={Link} to='/basket'size='large' edge='start' color= 'default'/*'inherit'*/ sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title}
                                </ListItem>
                            ))}
                        </List>
                )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}