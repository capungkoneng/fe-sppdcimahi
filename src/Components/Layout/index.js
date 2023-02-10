/* eslint-disable react-hooks/exhaustive-deps */
import { setListProvince } from "Configs/Redux/reducers";
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { GetAllProvince } from "Services";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
    const mainRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProvince();
    }, []);

    const fetchProvince = async () => {
        try {
            const response = await GetAllProvince();
            if (response.data.msg) {
                dispatch(setListProvince(response.data.msg));
            }
        } catch (error) {
            console.log(error);
            dispatch(setListProvince([]));
        }
    }
    return (
        <>
            <Sidebar />
            <div ref={mainRef} className="transition-all duration-500 ease-in-out">
                <Navbar />
                <div className="bg-gradient-to-b from-[#68902dd9] to-white w-full h-screen">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={5000} 
                collapseDuration={300}
                draggable={false}
                hideProgressBar={true}
                theme={'colored'}  
            />
        </>
    )
}