import { Offer } from "../dtos/offer";
import { PositionRequest } from "../dtos/position-request";
import { RegisterCoachRequest } from "../dtos/register-coach-request";
import { teamManagerClient } from "./team-manager-client"

export const registerNewCoach = async (newCoach: RegisterCoachRequest) => {

    let resp = await teamManagerClient.post('/coach', newCoach);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

export const assignExercise = async (exerciseName: string, coach: String | undefined) => {
    let resp = await teamManagerClient.patch(`/coach/assign/${coach}`, exerciseName);
    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
}

export const acceptOffer = async (acceptedOffer: Offer) => {

    let resp = await teamManagerClient.put('/coach/team', acceptedOffer);


}

export const getAuthorizedCoach = async (coachUsername: string) => {

    let resp = await teamManagerClient.get(`/coach/${coachUsername}`);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}

export const assignPlayerPosition = async (assignment: PositionRequest) => {

    let resp = await teamManagerClient.put('/coach/positions', assignment);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    
}

export const getPlayerTeam = async (playerUsername: string) => {

    let resp = await teamManagerClient.get(`/coach/player/${playerUsername}`);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
    
}