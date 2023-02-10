/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { AppConfig } from "Configs";
import { setAuth } from "Configs/Redux/reducers";

export const ProtectRoute = ({children}) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (AppConfig.GetToken({type: 'boolean'})) {
            dispatch(setAuth(true));
        } else {
            dispatch(setAuth(false));
            navigation('/login');
        }
    }, [AppConfig.GetToken({type: 'boolean'})]);

    return AppConfig.GetToken({type: 'boolean'}) ? children : (
        <React.Fragment>
        </React.Fragment>
    )
};