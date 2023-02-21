/* eslint-disable react-hooks/exhaustive-deps */
import { setListProvince } from "Configs/Redux/reducers";
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { GetAllProvince } from "Services";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
    const sideNavRef = useRef(null);
    const mainRef = useRef();
    const dispatch = useDispatch();
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        fetchProvince();
    }, []);

    const handleClick = () => {
        const element = sideNavRef.current;
        const mainElement = mainRef.current;
        if (showSidebar) {
            element.style.transform = 'translate(-300px)'
            element.style.visibility = 'hidden'
            mainElement.classList.remove('md:ml-64');
            mainElement.classList.add('md:ml-0')
        } else {
            element.style.transform = 'translate(0px)'
            mainElement.classList.add('md:ml-64');
            mainElement.classList.remove('md:ml-0')
            element.style.visibility = 'visible'
        }

        setShowSidebar(!showSidebar);
    }

    const fetchProvince = async () => {
        try {
            const response = await GetAllProvince();
            if (response.data.msg) {
                let dataProvince = response.data.msg.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                dispatch(setListProvince(dataProvince));
            }
        } catch (error) {
            dispatch(setListProvince([]));
        }
    }
    return (
        <>
            <Sidebar 
                innerRef={sideNavRef}
            />
            <div ref={mainRef} className="md:ml-64 transition-all duration-500 ease-in-out">
                <Navbar 
                    onClick={() => handleClick()}
                />
                <div className="p-3">
                    <div className="mt-4 lg:mt-4 md:mt-2">
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