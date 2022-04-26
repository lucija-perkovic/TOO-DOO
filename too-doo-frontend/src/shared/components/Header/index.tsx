import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../context/Auth/auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducers';

const pages = [{ name: 'Home', link: '/home'}];

const Header = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const token = useSelector((state : AppState) => state.user.token);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.link)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {token ?
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
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
                {/* <MenuItem onClick={() => handleLogout()}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem> */}
            </Menu> 
          </Box>
            : 
            <>
              <Button onClick={() => navigate("/login")} sx={{ my: 2, color: 'white', display: 'block' }}>
                LOGIN
              </Button>
              <Button onClick={() => navigate("/signup")} sx={{ my: 2, color: 'white', display: 'block' }}>
                SIGN UP
              </Button>
            </>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
