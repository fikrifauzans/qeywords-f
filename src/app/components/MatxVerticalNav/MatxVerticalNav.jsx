/* eslint-disable no-unused-vars */
import { Box, ButtonBase, Icon, styled } from '@mui/material';
import useSettings from 'app/hooks/useSettings';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Paragraph, Span } from '../Typography';
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';

const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: '12px',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'uppercase',
  display: mode === 'compact' && 'none',
  color: theme.palette.text.secondary
}));

const MyProListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: '16px',
  fontFamily: 'roboto',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'capitalize',
  display: mode === 'compact' && 'none',
  color: '#363636',
  fontWeight: 600,
  paddingLeft: '8px'
}));

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important'
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle'
  }
};

const MyProExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  padding: '12px 16px',
  height: '48px',
  borderRadius: '0px 12px 12px 0px',
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: '#3C4992', color: '#FFF', fontWeight: 700 },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important'
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'center'
  }
};

const ExternalLink = styled('a')(({ theme }) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary
}));

const InternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)'
  }
}));

const MyProInternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...MyProExtAndIntCommon,
    color: '#4B5563'
  },
  '& .navItemActive': {
    color: '#FFF',
    fontWeight: 700,
    backgroundColor: '#3C4992',
    '& .icon': {
      color: '#FFF'
    }
  }
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none'
}));

const MyProStyledText = styled(Span)(({ mode }) => ({
  fontSize: '14px',
  paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none',
  fontFamily: 'roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal'
}));

const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px'
}));

const MatxVerticalNav = ({ items }) => {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;

  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.type === 'label')
        return (

          <MyProListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </MyProListLabel>

        );

      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      } else if (item.type === 'extLink') {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            className={`${mode === 'compact' && 'compactNavItem'}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
              {(() => {
                if (item.icon) {
                  return <Icon className="icon">{item.icon}</Icon>;
                } else {
                  return <span className="item-icon icon-text">{item.iconText}</span>;
                }
              })()}
              <MyProStyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </MyProStyledText>
              <Box mx="auto"></Box>
              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </ButtonBase>
          </ExternalLink>
        );
      } else {
        return (

          <MyProInternalLink key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                  : `${mode === 'compact' && 'compactNavItem'}`
              }
            >
              <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                {item?.icon ? (
                  <Icon className="icon" sx={{ width: 36 }}>
                    {item.icon}
                  </Icon>
                ) : (
                  <Fragment>
                    <BulletIcon
                      className={`nav-bullet`}
                      sx={{ display: mode === 'compact' && 'none' }}
                    />
                    <Box
                      className="nav-bullet-text"
                      sx={{
                        ml: '20px',
                        fontSize: '11px',
                        display: mode !== 'compact' && 'none'
                      }}
                    >
                      {item.iconText}
                    </Box>
                  </Fragment>
                )}
                <MyProStyledText mode={mode} className="sidenavHoverShow">
                  {item.name}
                </MyProStyledText>

                <Box mx="auto" />

                {item.badge && (
                  <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                )}
              </ButtonBase>
            </NavLink>
          </MyProInternalLink>

        );
      }
    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
};

export default React.memo(MatxVerticalNav);
