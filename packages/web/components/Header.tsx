import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import Link from "./Link";
import GithubLogo from "./github.svg";
import TwitterLogo from "./twitter.svg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  logo: {
    display: "block",
    height: 24,
    fill: "currentColor",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerList: {
    width: 160,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Header: React.FC = () => {
  const classes = useStyles();

  const [drawerShown, setDrawerShown] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerShown(open);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Link href="/" color="inherit" variant="h6" underline="none">
            GCP IAM Explorer
          </Link>
          <div className={classes.sectionDesktop}>
            <Box ml={3}>
              <Link href="/" color="inherit" variant="body1">
                Browse
              </Link>
            </Box>
            <Box ml={3}>
              <Link href="/compare" color="inherit" variant="body1">
                Compare
              </Link>
            </Box>
          </div>
          <div className={classes.grow} />
          <Box ml={2}>
            <MuiLink
              href="https://github.com/devoteamgcloud/pt-gcp-iam-explorer"
              target="_blank"
              color="inherit"
            >
              <GithubLogo className={classes.logo} />
            </MuiLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerShown} onClose={toggleDrawer(false)}>
        <div
          className={classes.drawerList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className={classes.appBarSpacer} />
          <List>
            <Link href="/" color="inherit" variant="body1" underline="none">
              <ListItem button>
                <ListItemText primary={"Browse"} />
              </ListItem>
            </Link>
            <Link
              href="/compare"
              color="inherit"
              variant="body1"
              underline="none"
            >
              <ListItem button>
                <ListItemText primary={"Compare"} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
