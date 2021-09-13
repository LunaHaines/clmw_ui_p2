import { useState } from 'react';
import { Button, Typography } from '@material-ui/core'
import RegisterCoachComponent from './RegisterCoachComponent';
import { Color } from '@material-ui/lab/Alert';
import RegisterPlayerComponent from './RegisterPlayerComponent';
import RegisterRecruiterComponent from './RegisterRecruiterComponent';

interface IRegisterProps {
    open: boolean,
    setOpen: (openValue: boolean) => void,
    message: string,
    setMessage: (newMessage: string) => void,
    severity: Color | undefined,
    setSeverity: (newSeverity: Color | undefined) => void
}

function RegisterComponent(props: IRegisterProps) {
    const [formType, setFormType] = useState(undefined as String | undefined)

    return (
        (formType === 'player') ?
        <>
            <RegisterPlayerComponent open={props.open} setOpen={props.setOpen} message={props.message} setMessage={props.setMessage} severity={props.severity} setSeverity={props.setSeverity}/>
        </>
        : (formType === 'coach') ?
        <>
            <RegisterCoachComponent open={props.open} setOpen={props.setOpen} message={props.message} setMessage={props.setMessage} severity={props.severity} setSeverity={props.setSeverity} />
        </>
        : (formType === 'recruiter') ?
        <>
            <RegisterRecruiterComponent open={props.open} setOpen={props.setOpen} message={props.message} setMessage={props.setMessage} severity={props.severity} setSeverity={props.setSeverity} />
        </>
        :
        <>
            <Button 
                id='form-type-player'
                variant='contained'
                color='primary'
                onClick={() => setFormType('player')}>
                    Player
            </Button>
            <Button 
                id='form-type-coach'
                variant='contained'
                color='primary'
                onClick={() => setFormType('coach')}>
                    Coach
            </Button>
            <Button 
                id='form-type-recruiter'
                variant='contained'
                color='primary'
                onClick={() => setFormType('recruiter')}>
                    Recruiter
            </Button>
        </>
    )
}

export default RegisterComponent;