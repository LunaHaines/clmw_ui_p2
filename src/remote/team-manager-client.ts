import axios from 'axios';

export const teamManagerClient = axios.create({
    // replace this with the deployed URL as needed
    baseURL: 'http://teammanager-env.eba-hzybpzkp.us-east-2.elasticbeanstalk.com/teamManager',
    headers: {
        'Content-Type': 'application/json',
        // store the api-token in local storage, so that it's accessible here
        'authorization': localStorage.getItem('api-token')
    }
});
