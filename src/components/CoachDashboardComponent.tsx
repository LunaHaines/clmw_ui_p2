import { Button, FormControl, Input, InputLabel, makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { Color } from '@material-ui/lab/Alert'
import { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router";
import { getAllPlayers, modifyOffer} from "../remote/player-service";
import { Principal } from '../dtos/principal';
import { PlayerRequest } from "../dtos/player-request";

interface ICoachDashboardProps {
    currentUser: Principal | undefined;
    sport: String;  //FIXME
    coachUsername: string;    //FIXME
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

function CoachDashboardComponent(props: ICoachDashboardProps) {

    const classes = useStyles();
    const [players, setPlayers] = useState([]);

    let modifyOfferOnClick = async (coachUsername: string, playerUsername: string, type: string) => {
        try {
            // await modifyOffer({coachUsername: props.currentUser?.username!, playerUsername: playerUsername}, type);
            await modifyOffer(coachUsername, playerUsername, type); //FIXME
        } catch (e: any){
        }
    }

    useEffect(() => {
         let getPlayers = async () => {
             try{
             //Get all players that have the same sport as the Coach
              let playersRequest = await getAllPlayers(props.sport);
              //Filter the player objects into username/name.
              //If they have an active offer from the coach, allow the coach to cancel the offer.
              //Otherwise, allow them to extend an offer.
              playersRequest = playersRequest?.map(
                                                (player:any, index:any) =>
                                                       (
                                                        <tr key={index}>
                                                          {player.offers.includes(props.coachUsername) //FIXME
                                                          ? (<Button
                                                              id='rescind-offer-button'
                                                              onClick={() => modifyOfferOnClick(props.coachUsername, player.username, 'rescind')}
                                                              variant='contained'
                                                              color='primary'
                                                              size='medium'
                                                            >Cancel Invitation</Button>)
                                                          : (<Button
                                                              id='extend-offer-button'
                                                              onClick={() => modifyOfferOnClick(props.coachUsername, player.username, 'extend')}
                                                              variant='contained'
                                                              color='primary'
                                                              size='medium'
                                                          >Invite Player</Button>)
                                                          }
                                                         <td>{player.name}</td>
                                                         <td>{player.username}</td>
                                                         <td>{player.skills}</td>
                                                        </tr>
                                                      )
                                                );
              setPlayers(playersRequest);
              }
              catch(err){
                 console.log(err);
              }
          }
          getPlayers();
    }, []);

    return(
            <>
            <div style={{ height: 580, width: '95%' }} className={classes.root} >
                <h1 id='title'>Available students</h1>
                <table id='students'>
                   <tbody>
                      {players}
                   </tbody>
                </table>
             </div>
            </>
        )
}

export default CoachDashboardComponent;