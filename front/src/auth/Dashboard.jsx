import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { editUser } from "../Redux/actions/users";

const Dashboard = () => {
const dispatch = useDispatch();
const user = useSelector(state => state.usersReducer.currentUser);

React.useEffect(() => {
    dispatch(setCurrentUser(auth.currentUser));
}, [])

return (
    <div>
        <h2>{user?.email}</h2>
        <p>{user?.displayName}</p>
        
        <img src={user?.photoURL} alt={user?.displayName}/>
    </div>
)
};

export default Dashboard;