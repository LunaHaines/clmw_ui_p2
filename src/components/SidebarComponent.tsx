import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AccountCircleRounded, AttachMoneyRounded, Backspace, GroupAddRounded, Person, PersonAdd, PeopleRounded, SportsRounded } from "@material-ui/icons";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Principal } from "../dtos/principal";
import clsx from 'clsx';
import { useHistory } from "react-router";

interface ISidebarProps {
    authUser: Principal | undefined,
    setAuthUser: (nextUser: Principal | undefined) => void,
    drawerOpen: boolean,
    setDrawerOpen: (drawerOpen: boolean) => void
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0,1),
            ...theme.mixins.toolbar
        }
    })
)

function SidebarComponent(props: ISidebarProps) {
    const theme = useTheme();
    const history = useHistory();

    let handleDrawerClose = () => {
        props.setDrawerOpen(false);
    }

    let handleOffersClick = () => {
        history.push('/offers')
    }

    let handleCoachWorkoutClick = () => {
        history.push('/workouts')
    }

    let handleCoachTeamClick = () => {
        history.push('/team')
    }

    let handleCoachDashboardClick = () => {
        history.push('/coachdashboard')
    }

    let handleLogoutClick = () => {
        props.setAuthUser(undefined)
        localStorage.clear()
        history.push('/')
    }

    let handleLoginClick = () => {
        history.push('/login')
    }

    let handleRegisterClick = () => {
        history.push('/register')
    }

    let handlePlayerTeamClick = () => {
        history.push('/playerteam')
    }

    const classes = useStyles();

    let playerProfile = () => {
        history.push('/playerprofile');
    }

    return (
        <>
            <Drawer variant='permanent' className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.drawerOpen,
                [classes.drawerClose]: !props.drawerOpen
            })} classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.drawerOpen,
                    [classes.drawerClose]: !props.drawerOpen
                })
            }}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {
                    (props.authUser?.role === 'Coach') ?
                    <>
                        <ListItem button key='Team' onClick={handleCoachTeamClick}>
                            <ListItemIcon>
                                <PeopleRounded />
                            </ListItemIcon>
                            <ListItemText primary='Team' />
                        </ListItem>
                        <ListItem button key='Workouts' onClick={handleCoachWorkoutClick}>
                            <ListItemIcon>
                                <SportsRounded />
                            </ListItemIcon>
                            <ListItemText primary='Workouts' />
                        </ListItem>
                        <ListItem button key='Players' onClick={handleCoachDashboardClick}>
                            <ListItemIcon>
                                <GroupAddRounded />
                            </ListItemIcon>
                            <ListItemText primary='Players' />
                        </ListItem>
                        <ListItem button key='Logout' onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <Backspace />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </>
                    : (props.authUser?.role === 'Player') ?
                    <>
                        <ListItem button key='Offers' onClick={handleOffersClick}>
                            <ListItemIcon>
                                <AttachMoneyRounded />
                            </ListItemIcon>
                            <ListItemText primary='Offers' />
                        </ListItem>
                        <ListItem button key='Team' onClick={handlePlayerTeamClick}>
                            <ListItemIcon>
                                <PeopleRounded />
                            </ListItemIcon>
                            <ListItemText primary='Team' />
                        </ListItem>
                        <ListItem button key='Workouts'>
                            <ListItemIcon>
                                <SportsRounded />
                            </ListItemIcon>
                            <ListItemText primary='Workouts' />
                        </ListItem>
                        <ListItem button key='Profile' onClick = {playerProfile}>
                            <ListItemIcon>
                                <AccountCircleRounded />
                            </ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItem>
                        <ListItem button key='Logout' onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <Backspace />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </>
                    : (props.authUser?.role === 'Recruiter') ?
                    <>
                        <ListItem button key='Players'>
                            <ListItemIcon>
                                <PeopleRounded />
                            </ListItemIcon>
                            <ListItemText primary='Players' />
                        </ListItem>
                        <ListItem button key='Profile'>
                            <ListItemIcon>
                                <AccountCircleRounded />
                            </ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItem>
                        <ListItem button key='Logout' onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <Backspace />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </>
                    :
                    <>
                        <ListItem button key='Login' onClick={handleLoginClick}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary='Login' />
                        </ListItem>
                        <ListItem button key='Register' onClick={handleRegisterClick}>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary='Register' />
                        </ListItem>
                    </>

                    }
                </List>
            </Drawer>
        </>
    )
}

export default SidebarComponent;