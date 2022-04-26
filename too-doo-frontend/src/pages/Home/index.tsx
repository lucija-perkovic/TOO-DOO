import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLoadListsFromUser } from '../../actions/listActions';
import { AppState } from '../../reducers';
import { AuthContext } from '../../shared/context/Auth/auth-context';


function Home() {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    
    console.log(auth.userId)
    const userId = useSelector((state : AppState) => state.user.userId);

    useEffect(() => {
        dispatch(requestLoadListsFromUser(userId))
    })
    const lists = useSelector((state : AppState) => state.lists);

    useEffect(()=> {
        if(lists) {
            console.log(lists)
        }
    }, [lists])
    return (
        <h1>LLLL</h1>
    );
}

export default Home;