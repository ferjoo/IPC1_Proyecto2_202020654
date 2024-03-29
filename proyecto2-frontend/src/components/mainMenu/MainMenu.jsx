import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TheatersIcon from '@mui/icons-material/Theaters';
import { useSelector } from 'react-redux';
import { logoutUser, getUserMoviesPlaylist } from '../../api';
import { useDispatch } from 'react-redux';
import showToast from '../../helpers/showToast'
import { useNavigate } from 'react-router-dom';

const settings = ['Mi cuenta', 'Cerrar sesión'];

function MainMenu() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const IS_AUTHENTICATED = useSelector(state => state.loggedIn);
    const AUTH = useSelector(state => state.auth);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [pages, setPages] = useState(['Películas']);

    useEffect(() => {
        let isAdmin = AUTH?.user?.is_admin;
        if(AUTH && IS_AUTHENTICATED)
        if(!isAdmin) {
            setPages(['Películas', 'Mi Playlist']);
            if(AUTH?.user?.id) {
                dispatch(getUserMoviesPlaylist(AUTH.user.id)).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                    showToast('Ocurrió un error al obtener la playlist', 'error')
                });
            }
        } else {
            setPages(['Crear película', 'Administrar Películas', 'Usuarios']);
        }
    }, [AUTH, IS_AUTHENTICATED]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const redirectTo = (page) => {
        switch (page) {
            case 'Crear película':
                navigate('/create-movie');
                break;  
            case 'Administrar Películas':
                navigate('/dashboard');
                break;
            case 'Usuarios':
                navigate('/users');
                break;
            case 'Películas':
                navigate('/dashboard');
                break;
            case 'Mi Playlist':
                navigate('/playlist');
                break;
            default:
                break
        }
    }

    const handleCloseUserMenu = (option) => {
        setAnchorElUser(null);
        switch (option) {
            case 'Cerrar sesión':
                dispatch(logoutUser(AUTH.token)).then(() => { 
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                    showToast('Error al cerrar sesión', 'error')
                });
                break;
            case 'Mi cuenta':
                navigate(`/my-account/${AUTH.user.id}`);
                break;
            default:
                break;
        }
    };

    if (!IS_AUTHENTICATED) {
        return null; // Menu is not rendered if user is not authenticated
    }

    return (
        <AppBar position="static" enableColorOnDark>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <TheatersIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                PELIS24
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={() => {handleCloseNavMenu(); redirectTo(page)}}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <TheatersIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                PELIS24
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => redirectTo(page)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Mi cuenta">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon/>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}

export default MainMenu;
