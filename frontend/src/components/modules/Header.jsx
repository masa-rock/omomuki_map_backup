import React,{ useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';
import { signOut } from '../../apis/auth';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const {setIsSignedIn, isSignedIn, currentUser, loading} = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/")
        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const AuthButtons = () => {
    if (!loading){
      if (isSignedIn) {
        return(
          <>
            {currentUser?.name}
             <Button color="inherit" className={classes.linkBtn} onClick={handleSignOut}>
               Sign out
             </Button>
          </>
        )
      } else {
        return(
        <>
          <Button color="inherit" component={Link} to="../Signin">Login</Button>
          <Button color="inherit" component={Link} to="../Signup">Sign up</Button>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </>
        )
      }
    } else {
      return(
        <></>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            趣map
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </div>
  );
}
