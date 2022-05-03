import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_LIST_REQUEST, DELETE_LIST_REQUEST, EDIT_LIST_REQUEST, LOAD_LISTS_FROM_USER_REQUEST, requestLoadListsFromUser } from '../../actions/listActions';
import { ListItem } from '../../models/list';
import { AppState } from '../../reducers';
import { checkIfLoading } from '../../reducers/uiReducer';
import { AuthContext } from '../../shared/context/Auth/auth-context';
import ListDialog from './ListDialog';
import TodoList from './TodoList';

function Home() {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const isLoading = useSelector((state: AppState) => checkIfLoading(state, LOAD_LISTS_FROM_USER_REQUEST));
    const isSubmitting = useSelector((state: AppState) => checkIfLoading(state, EDIT_LIST_REQUEST, ADD_NEW_LIST_REQUEST, DELETE_LIST_REQUEST))
    
    const handleClose = () => {
        setOpenAddDialog(false);
    }

    useEffect(() => {
        dispatch(requestLoadListsFromUser(auth.userId))
    }, [isSubmitting, dispatch, auth.userId])

    useEffect(() => {
        dispatch(requestLoadListsFromUser(auth.userId))
    }, [dispatch, auth.userId])
    
    const lists : ListItem[] = useSelector((state: AppState) => state.lists.lists);

    const initialValuesList : ListItem = {
        items: [],
        listName: '',
        userId: ''
      }

    return (
        <Paper elevation={3} sx={{m:2, p:2}}>
            <Button variant="contained" color="success" onClick={() => setOpenAddDialog(true)}>
            NEW LIST
            </Button>
            {isLoading  ?
                <Grid item>
                    <CircularProgress />
                </Grid> :
                <Grid container>
                    {
                        lists?.map((list: ListItem) => (
                            <Grid item key={list.listId} xs={true} sm={5} md={3}>
                                <TodoList listItem={list} />
                            </Grid>
                        ))
                    }
                </Grid>
            }
            <ListDialog open={openAddDialog} handleClose={handleClose} title={"Add"} list={initialValuesList}/>
        </Paper>

    );
}

export default Home;