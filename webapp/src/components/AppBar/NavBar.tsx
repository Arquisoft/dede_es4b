import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Tooltip } from '@mui/material';
import makeStyles from '@mui/material/styles/makeStyles';
import { ShoppingCart } from '@mui/icons-material';
import useStyles from './styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const NavBar = () => {
    const classes = useStyles();

    return(
        <>
            <AppBar position="static" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        DeDethlon
                    </Typography>
                    <Box>
                        <Button className={classes.buttonHome}>
                            Home
                        </Button>
                        <Button className={classes.buttonDeportes}>
                            Deportes
                        </Button>
                        <Button className={classes.buttonHombre}>
                            Hombre
                        </Button>
                        <Button className={classes.buttonMujer}>
                            Mujer
                        </Button>
                        <Button className={classes.buttonNinos}>
                            Niños
                        </Button>
                    </Box>
                    <Box>
                        <IconButton className={classes.user}>
                            <Avatar/>
                        </IconButton>
                        <Tooltip title="Ver carrito">
                            <IconButton href={"/carrito"} className={classes.cart}>
                                <ShoppingCart />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
        
    );
};
export default NavBar;
