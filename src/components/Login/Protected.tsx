import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';

const Protected=(props:any)=>{
    const {Components}=props;
    const navigate=useNavigate();
    useEffect(()=>{
        let login=localStorage.getItem("token");
        if (!login){
            navigate("/");
        }
    });
    return(
        <div>
            <Components/>
            <p>Login first</p>
        </div>
    )
}

export default Protected;