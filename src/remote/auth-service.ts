import { Credentials } from "../dtos/credentials"
import { teamManagerClient } from "./team-manager-client"

//Log in as a coach
export const coachLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/coach', user);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));
    teamManagerClient.defaults.headers.common['authorization'] = resp.headers['authorization'];
    teamManagerClient.defaults.headers['authorization'] = resp.headers['authorization'];

    return resp.data
}

//Log in as a recruiter
export const recruiterLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/recruiter', user);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));
    teamManagerClient.defaults.headers.common['authorization'] = resp.headers['authorization'];
    teamManagerClient.defaults.headers['authorization'] = resp.headers['authorization'];

    return resp.data
} 

//Log in as a player
export const playerLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/player', user);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));
    teamManagerClient.defaults.headers.common['authorization'] = resp.headers['authorization'];
    teamManagerClient.defaults.headers['authorization'] = resp.headers['authorization'];

    return resp.data;
} 