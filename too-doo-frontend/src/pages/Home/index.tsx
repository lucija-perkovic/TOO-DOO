import { Button, Card, CircularProgress, Grid, Paper } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_LISTS_FROM_USER_REQUEST, requestAddNewList, requestLoadListsFromUser } from '../../actions/listActions';
import { ListItem } from '../../models/list';
import { AppState } from '../../reducers';
import { checkIfLoading } from '../../reducers/uiReducer';
import { AuthContext } from '../../shared/context/Auth/auth-context';
import TodoList from './TodoList';

function Home() {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    useEffect(() => {
        dispatch(requestLoadListsFromUser(auth.userId))
    }, [dispatch, auth.userId])
    
    const lists : ListItem[] = useSelector((state: AppState) => state.lists.lists);
    
    const isLoading = useSelector((state: AppState) => checkIfLoading(state, LOAD_LISTS_FROM_USER_REQUEST));

    return (
        <Paper elevation={3} sx={{m:2, p:2}}>
            <Button variant="contained" color="success" onClick={() => dispatch(requestAddNewList(auth.userId))}>
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
        </Paper>

    );
}

export default Home;