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
import '../../pages/dist/styles.css'
import { createTheme } from '@mui/material';

const NavBar = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = createTheme({
        spacing: 2,
    });

    return(
        <>
            <AppBar position="static" color="inherit">
                <div className="navBar">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            DeDethlon
                        </Typography>
                        <div className="botonesBar">
                            <Button style={{
                                backgroundColor: "#FFF",
                                marginRight: "8px",
                            }}>
                                Home
                            </Button>
                            <Button style={{
                                backgroundColor: "#FFF",
                                marginRight: "8px",
                            }}>
                                Deportes
                            </Button>
                            <Button style={{
                                backgroundColor: "#FFF",
                                marginRight: "8px",
                            }}>
                                Hombre
                            </Button>
                            <Button style={{
                                backgroundColor: "#FFF",
                                marginRight: "8px",
                            }}>
                                Mujer
                            </Button>
                            <Button  style={{
                                backgroundColor: "#FFF",
                                marginRight: "8px",
                            }}>
                                Niños
                            </Button>
                        </div>
                            <IconButton
                                onClick={handleMenu}
                                color="inherit"
                                
                            >
                                <Avatar/>
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
                        <div className="carrito">
                            <Tooltip title="Ver carrito">
                                <IconButton href={"/carrito"} color="inherit">
                                    <ShoppingCart />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </div>
            </AppBar>
        </>
        
    );
};
export default NavBar;
