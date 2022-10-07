import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Test} from "../components/Test";
import {SingIN} from "../components/SingIN";
import {SingUp} from "../components/SingUp";
import {Profile} from "../components/Profile";
import {PasswordRecovery} from "../components/PasswordRecovery";
import {PasswordEntering} from "../components/PasswordEntering";
import Error404 from "../components/error404/Error404";

export const PATH = {
    TEST: '/test',
    SING_IN: '/singIn',
    SING_UP: '/singUP',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    PASSWORD_ENTERING: '/password-entering',
    ERROR404: '/404',
}


function Pages() {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.TEST}/>}/>

                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.SING_IN} element={<SingIN/>}/>
                <Route path={PATH.SING_UP} element={<SingUp/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.PASSWORD_ENTERING} element={<PasswordEntering/>}/>

                <Route path={PATH.ERROR404} element={<Error404/>}/>
                <Route path={'/*'} element={<Navigate to={PATH.ERROR404}/>}/>
            </Routes>
        </div>
    )
}

export default Pages
