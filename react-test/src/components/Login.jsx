import React, {useState} from 'react';
import axios from "axios";

function Login(){
    const [userProfile, setUserProfile] = useState({
        user:"",
        password:"",
    })

    function fieldListener (event){
        const{value,name} = event.target;
        setUserProfile((prevValue)=>{ //prevValue = previous value
            return{
                ...prevValue,
                [name]: value,
            };
        });
        console.log(userProfile);
    }

    //Complex state is a React component that will keep more than one value with the same reference, just like creating an array or map.

    function submitForm(event){
        //console.log("User: " + userProfile.user);
        //console.log("Password: " + userProfile.password);
        axios
        .post("/login", {
            user: userProfile.user ,
            password: userProfile.password
        }).then((res) => {
            if (res.data.statusCode === 1){
                console.log()
            }
        }).catch((err) => {
            console.error(err);
        });
        event.preventDefault(); //It cuts the process for the sequence to continue.
    }

    return(
        <div>
            <form onSubmit={submitForm}>
                <input type='text' placeholder='Login' name="user" onChange={fieldListener} value={userProfile.user}></input>
                <input type='password' placeholder='Password' name="password" onChange={fieldListener} value={userProfile.password}></input>
                <button type='Submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;