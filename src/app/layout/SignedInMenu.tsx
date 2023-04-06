import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { signOut } from "../../features/account/accountSlice";
import { setBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button
          color='inherit'
          onClick={handleClick}
          sx={{ typography: 'h6' }}
        >
          {user?.name}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem component={Link} to= '/orders' onClick={handleClose}>My orders</MenuItem>
          <MenuItem onClick={() => {
            dispatch(signOut());
            dispatch(setBasket(null))
          }}>Logout</MenuItem>
        </Menu>
      </>
    );
  }