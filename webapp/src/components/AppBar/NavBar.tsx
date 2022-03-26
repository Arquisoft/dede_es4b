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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        <div>
                            <IconButton
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
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
