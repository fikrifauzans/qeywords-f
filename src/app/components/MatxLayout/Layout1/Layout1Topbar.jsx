/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';

import { Span } from '../../Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import ShoppingCart from '../../ShoppingCart';
import { removeToken } from 'app/helpers/functions/LocalStorageServices';
import toaster from 'app/helpers/functions/Toaster';
import useAuths from 'app/hooks/auth/useAuth';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const MyProStyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#FFF'
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const MyProTopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#303A75',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const MyProUserMenu = styled(Box)({
  color: 'white',
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const Layout1Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };
  const { setAuthStatus } = useAuths();

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const logoutAction = () => {
    removeToken();
    setAuthStatus(false);
    navigate('/');
    toaster('Logout Successfully', 'success');
  };

  return (
    <TopbarRoot>
      <MyProTopbarContainer>
        <Box display="flex">
          <MyProStyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </MyProStyledIconButton>

          {/* <IconBox>
            <MyProStyledIconButton>
              <Icon>mail_outline</Icon>
            </MyProStyledIconButton>

            <MyProStyledIconButton>
              <Icon>web_asset</Icon>
            </MyProStyledIconButton>

            <MyProStyledIconButton>
              <Icon>star_outline</Icon>
            </MyProStyledIconButton>
          </IconBox> */}
        </Box>

        <Box display="flex" alignItems="center">
          {/* <MatxSearchBox /> */}

          {/* <NotificationProvider>
            <NotificationBar />
          </NotificationProvider> */}

          {/* <ShoppingCart /> */}

          <MatxMenu
            menuButton={
              <MyProUserMenu>
                <Hidden xsDown>
                  <Span>
                     <strong> {user?.name}</strong>
                  </Span>
                </Hidden>
                {/* <Avatar src={user?.avatar} sx={{ cursor: 'pointer' }} /> */}
              </MyProUserMenu>
            }
          >
            {/* <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem> */}

            <StyledItem onClick={logoutAction}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </MyProTopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
