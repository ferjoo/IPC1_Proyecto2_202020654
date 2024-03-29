import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/index';
import showToast from '../../helpers/showToast' 

const defaultTheme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();
  const dispatch = useDispatch();


  function onSignUp() {
    navigate('/signup');
  }

  function onRecoverPassword() {
    navigate('/recover-password');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    dispatch(loginUser(data.get('username'), data.get('password'))).then(() => {
      navigate('/dashboard');
    }).catch((error) => {
      console.log(error);
      showToast('error', 'Error al iniciar sesión, verifica tus datos');
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={() => onRecoverPassword()}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => onSignUp()}>
                  Regístrate aquí
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
