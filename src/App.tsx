import React from 'react';
import './App.css';
import clsx from 'clsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import { useState } from 'react';
import { Principal } from './dtos/principal';
import RegisterComponent from './components/register/RegisterComponent';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { AppBar, IconButton, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import LoginComponent from './components/LoginComponent';
import MenuIcon from '@material-ui/icons/Menu'
import SidebarComponent from './components/SidebarComponent';
import OffersComponent from './components/OffersComponent';
import CoachTeamComponent from './components/CoachTeamComponent';
import CoachDashboardComponent from './components/CoachDashboardComponent';
import PlayerProfileComponent from './components/PlayerProfileComponent';
import PlayerTeamComponent from './components/PlayerTeamComponent';
import RecruiterDashboard from './components/RecruiterDashboardComponent';
import WorkoutComponent from './components/workout/WorkoutComponent';
import PlayerWorkoutComponent from './components/PlayerWorkoutComponent';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      margin: theme.spacing(7) + 1
    },
    navigation: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width','margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    }
  })
)

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error' as Color | undefined)
  const [drawerOpen, setDrawerOpen] = useState(false);

  let handleClose = (e?: React.SyntheticEvent, r?: string) => {
    if (r === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  let handleDrawerOpen = () => {
    setDrawerOpen(true);
  }

  const classes = useStyles();

  if(!authUser)
  {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setAuthUser(JSON.parse(loggedInUser));
  }

  return (
    <>
      <Router>
      <div className={classes.navigation}>
        <AppBar position='static' className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}>
          <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' className={clsx(classes.menuButton, {[classes.hide]: drawerOpen})}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              TeaManager
            </Typography>
          </Toolbar>
        </AppBar>
        <SidebarComponent authUser={authUser} setAuthUser={setAuthUser} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      </div>
      <div className={classes.root}>
          <Switch>
            <Route exact path='/' render={() => <HomeComponent currentUser={authUser} /> } />
            <Route path='/register' render={() => <RegisterComponent open={open} setOpen={setOpen} message={message} setMessage={setMessage} severity={severity} setSeverity={setSeverity} /> } />
            <Route path='/login' render={() => <LoginComponent setAuthUser={setAuthUser} open={open} setOpen={setOpen} message={message} setMessage={setMessage} severity={severity} setSeverity={setSeverity} /> } />
            <Route path='/workouts' render={() => <WorkoutComponent currentUser={authUser} /> } />
            <Route path='/offers' render={() => <OffersComponent authUser={authUser} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} /> } />
            <Route path='/team' render={() => <CoachTeamComponent authUser={authUser} errorOpen={false} setErrorOpen={setOpen} errorMessage={message} setErrorMessage={setMessage} errorSeverity={severity} setErrorSeverity={setSeverity} /> } />
		        <Route path='/coachdashboard' render={() => <CoachDashboardComponent authUser={authUser} /> } />
            <Route path='/playerprofile' render={() => <PlayerProfileComponent authUser={authUser} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity}/>}/>
            <Route path='/playerteam' render={() => <PlayerTeamComponent authUser={authUser} errorOpen={false} setErrorOpen={setOpen} errorMessage={message} setErrorMessage={setMessage} errorSeverity={severity} setErrorSeverity={setSeverity} /> } />
            <Route path='/recruiterdashboard' render={() => <RecruiterDashboard setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity} /> } />
            <Route path='/playerworkouts' render={() => <PlayerWorkoutComponent authUser={authUser} /> } />
            <Route path='/playerdashboard' render={() => <></>}/>
          </Switch>
        </div>
      </Router>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
