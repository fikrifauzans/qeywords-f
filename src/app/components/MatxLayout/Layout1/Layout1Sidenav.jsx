/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { Hidden, Switch, Box, styled, useTheme } from '@mui/material';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useSettings from 'app/hooks/useSettings';
import { convertHexToRGB } from 'app/utils/utils';
import {
  MyProSidenavCompactWidth,
  MyProSideNavWidth,
  sidenavCompactWidth,
  sideNavWidth
} from 'app/utils/constant';
import Brand from '../../Brand';
import Sidenav from '../../Sidenav';

const SidebarNavRoot = styled(Box)(({ theme, width, bg, image }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  zIndex: 111,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  transition: 'all 250ms ease-in-out',
  backgroundImage: `linear-gradient(to bottom, rgba(${bg}, 0.96), rgba(${bg}, 0.96)), url(${image})`,
  '&:hover': {
    width: sideNavWidth,
    '& .sidenavHoverShow': { display: 'block' },
    '& .compactNavItem': {
      width: '100%',
      maxWidth: '100%',
      '& .nav-bullet': { display: 'block' },
      '& .nav-bullet-text': { display: 'none' }
    }
  }
}));

const SidebarNavMyPro = styled(Box)(({ theme, width, bg, image }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  zIndex: 111,
  overflow: 'hidden',
  fontWeight: 'bold',
  transition: 'all 250ms ease-in-out',
  background: '#FFF',
  '&:hover': {
    width: MyProSideNavWidth,
    '& .sidenavHoverShow': { display: 'block' },
    '& .compactNavItem': {
      width: '100%',
      maxWidth: '100%',
      '& .nav-bullet': { display: 'block' },
      '& .nav-bullet-text': { display: 'none' }
    }
  }
}));

const NavListBox = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Layout1Sidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return MyProSidenavCompactWidth;

      default:
        return MyProSideNavWidth;
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
  };

  return (
    <SidebarNavMyPro image={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== 'full'}
              color="secondary"
              size="small"
            />
          </Hidden>
        </Brand>
        <Sidenav />
      </NavListBox>
    </SidebarNavMyPro>
  );
};

export default memo(Layout1Sidenav);
