import { Exercise } from '../dtos/exercise';
import { DataGrid, GridApi, GridColDef, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

interface IExerciseListProps {
    exercises: Exercise[]
}

interface Data {
    bodyPart: string,
    equipment: string,
    target: string,
    name: string
}

const renderDetailsButton = (params: any) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    assignExercise(params.row.col1)
                }}
            >
                More Info
            </Button>
        </strong>
    )
}

const assignExercise = (exerciseName: string) => {
    console.log(exerciseName);
}

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Exercise',
        flex: 2
    },
    {
        field: 'bodyPart',
        headerName: 'Body Part',
        flex: 1
    },
    {
        field: 'equipment',
        headerName: 'Equipment',
        flex: 1
    },
    {
        field: 'target',
        headerName: 'Target',
        flex: .5
    },
    {
        field: 'assign',
        headerName: 'Assign',
        flex: .5,
        renderCell: renderDetailsButton
    }
]


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            margin: theme.spacing(7)+1
        }
    })
)

function ExerciseListComponent(props: IExerciseListProps) {
    const rows = props.exercises;
    const classes = useStyles();
    
    return (
        <>
            <div style={{ height: 580, width: '95%' }} className={classes.root} >
                <DataGrid
                    components={{
                        Toolbar: GridToolbarFilterButton
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                />
            </div>
        </>
    )
}

export default ExerciseListComponent;