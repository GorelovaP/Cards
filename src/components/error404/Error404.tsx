import React from 'react'
import s from "./Error404.tsx.module.scss"
import {useNavigate} from 'react-router-dom';
import SuperButton from "../../common/components/button/SuperButton";
import error from "./error404.png"

function Error404() {
    const navigate = useNavigate();
    return (
        <div className={s.ErrorPage}>
            <img src={error} alt={"Error404Image"}/>
            <h1>Page not found!</h1>
            <div className={s.text}>What you are looking for does not exist or is not yet open</div>
            <SuperButton onClick={() => navigate("/test")}>Main page</SuperButton>
        </div>
    )
}

export default Error404
