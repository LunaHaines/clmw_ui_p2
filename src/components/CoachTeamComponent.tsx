import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, makeStyles, Modal, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { Color } from '@material-ui/lab/Alert';
import { createStyles } from "@material-ui/styles";
import { useState } from "react";
import { PositionRequest } from "../dtos/position-request";
import { Principal } from "../dtos/principal";
import { assignPlayerPosition, getAuthorizedCoach } from "../remote/coach-service";
import { Offer } from "../dtos/offer";
import { removePlayer } from "../remote/coach-service";

interface ICoachTeamProps {
    authUser: Principal | undefined

    errorOpen: boolean,
    setErrorOpen: (openValue: boolean) => void,
    errorMessage: string,
    setErrorMessage: (newMessage: string) => void,
    errorSeverity: Color | undefined,
    setErrorSeverity: (newSeverity: Color | undefined) => void
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            margin: theme.spacing(12)
        },
        modal: {
            margin: theme.spacing(15)
        },
        paper: {
            justifyContent: 'center'
        }
    })
)

function CoachTeamComponent(props: ICoachTeamProps) {
    const [playerNames, setPlayerNames] = useState(undefined as string[][] | undefined);
    const [selectedPlayerUsername, setSelectedPlayerUsername] = useState('');
    const [positionInput, setPositionInput] = useState('');
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    let getPlayers = async () => {
        if (props.authUser) {
            if (!playerNames) {
                let resp = await getAuthorizedCoach(props.authUser.username)
                setPlayerNames(resp.players)
            }
        }
    }

    let comparePositions = (player1Info: string[], player2Info: string[]) => {
        if (player1Info[1] > player2Info[1]) {
            return 1;
        } else if (player1Info[1] < player2Info[1]) {
            return -1;
        } else {
            return 0;
        }
    }

    let showAssignPosition = (playerUsername: string) => {
        setOpen(true);
        setSelectedPlayerUsername(playerUsername);
    }

    let assignPosition = async () => {
        try {
            if (props.authUser) {
                let request: PositionRequest = new PositionRequest(props.authUser.username, selectedPlayerUsername, positionInput);
                await assignPlayerPosition(request);
                let resp = await getAuthorizedCoach(props.authUser.username)
                setPlayerNames(resp.players)
            }
        } catch (e: any) {
            console.log(e);
            
        } finally {
            handleClose();
        }

    }

    //Remove Dialog

    let promptRemove = (playerUsername: string) => {
        setAlertOpen(true);
        setSelectedPlayerUsername(playerUsername);
    }

    let handleConfirm = async (e: any) => {
        if(props.authUser){
            let remove: Offer = new Offer(props.authUser.username, selectedPlayerUsername);
            try{
                await removePlayer(remove);
                //Rerender the page after removing
                let resp = await getAuthorizedCoach(props.authUser.username)
                setPlayerNames(resp.players)
            } catch(e: any) {
                props.setErrorOpen(true);
                props.setErrorSeverity('error');
                props.setErrorMessage(e.response?.data.message);
            }

        }
        //close dialog
        setAlertOpen(false);
    }

    let handleAlertClose = () => {
        setAlertOpen(false);
    }

    //Position Dialog

    let handleClose = () => {
        setOpen(false);
    }

    let handleChange = (e: any) => {
        setPositionInput(e.target.value)
    }

    getPlayers();

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {playerNames?.sort(comparePositions).map((playerInfo) => {
                return (
                <>
                    <Typography variant='h6'>Name: {playerInfo[0]}</Typography>
                    <Typography variant='h6'>Position: {playerInfo[1]}</Typography>
                    <Button
                        id={playerInfo[0]}
                        key={playerInfo[0]}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={() => {showAssignPosition(playerInfo[0])}}
                    >
                        <Typography variant='body1'>assign position</Typography>
                    </Button>
                    <Button
                        id={playerInfo[0]}
                        key={playerInfo[0]}
                        variant='contained'
                        color='secondary'
                        size='small'
                        onClick={() => {promptRemove(playerInfo[0])}}
                    >
                        <Typography variant='body1'>Remove Player</Typography>
                    </Button>
                    <br/><br/>
                </>)
            })}
            
            <div>
                <Dialog open={alertOpen} onClose={handleAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Remove Player?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this player from the team?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="secondary" variant="contained" autoFocus>
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Position</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Assign this player a new position?
                    </DialogContentText>
                    <TextField id='position' label='Position' variant='outlined' onChange={handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='primary'>
                        Cancel
                    </Button>
                    <Button
                        id='assign-position'
                        variant='outlined'
                        color='primary'
                        onClick={assignPosition}
                    >Assign</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    )
}

export default CoachTeamComponent;