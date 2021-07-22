import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ActionsNotifier from '../common/ActionsNotifier';
import AlertNotification from '../common/AlertNotification';
import Sidebar, { NavigationTabs } from '../Sidebar';
import { drawerWidthClosed } from '../Sidebar';
import RouteSwitcher from './RouteSwitcher';
import TopBar from './TopBar';

const useStyle = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    marginLeft: 'initial',
    '@media(min-width: 600px) and (max-width:960px)': {
      marginLeft: drawerWidthClosed,
    },
  },
  toolbar: theme.mixins.toolbar,
  // importing visuallyHidden has typing issues at time of writing.
  // import { visuallyHidden } from '@material-ui/utils';
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  wrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));

export interface LayoutProps {
  /** If the sidebar is fully expanded open or shrunk. */
  isSidebarOpen: boolean;
  /** Called when sidebar toggles between open and closed. */
  onToggleOpen: () => void;
}

export default function Layout({ isSidebarOpen, onToggleOpen }: LayoutProps) {
  const classes = useStyle({ isSidebarOpen });

  return (
    <>
      <Link href="#main" className={classes.visuallyHidden}>
        Skip to main content
      </Link>
      <Box className={classes.wrapper}>
        <CssBaseline />
        <TopBar isSidebarOpen={isSidebarOpen} onToggleOpen={onToggleOpen} />
        <Sidebar />
        <main id="main" className={classes.content}>
          <AlertNotification />
          <Box p={[0, 3, 3]}>
            <div className={classes.toolbar} />
            <Container maxWidth="lg">
              <NavigationTabs />
              <RouteSwitcher />
            </Container>
          </Box>
        </main>
        <ActionsNotifier />
      </Box>
    </>
  );
}
