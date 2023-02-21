import React, { useEffect, useState } from "react";
import { Hero } from "Components/Hero";
import { setSideBar } from "Configs/Redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ListNav } from "./data";
import Powered from "Assets/icons/powered.png";

export const Sidebar = ({
    innerRef
}) => {
    const location = useLocation();
    const currentPathName = location.pathname.split("/");
    const state = useSelector((state) => state.root);
    const dispatch = useDispatch();
    const [submenuId, setSubmenuId] = useState('home');

    useEffect(() => {
        setSubmenuId(currentPathName.length === 2 ? 'home' : currentPathName[2]);
    }, [location]);
    
    return (
        <aside
            ref={innerRef}
            className={`z-20 lg:block md:block overflow-auto w-full md:w-64 lg:w-64 h-full bg-white fixed transition-all duration-500 ease-in-out overflow-auto ${state.showSidebar ? 'block' : 'hidden'}`}
        >
            <div className="p-4">
                <Hero />
            </div>
            <ul className="mt-4 mb-6">
                    {
                        ListNav.map((value, index) => {
                            return  (
                                <React.Fragment key={index}>
                                    <li
                                        className={`pl-4 m-2 mx-[12px] rounded-lg cursor-pointer py-2 ${submenuId === value.id ? 'bg-[#3F7459]' : 'hover:bg-green-200 bg-gray-200'}`}
                                        onClick={() => {
                                            if (value.subMenu) {
                                                if (submenuId) {
                                                    if (submenuId === value.id) {
                                                        setSubmenuId(null);
                                                    } else {
                                                        setSubmenuId(value.id);
                                                    }
                                                } else {
                                                    setSubmenuId(value.id);
                                                }
                                            }else{
                                                setSubmenuId(value.id);
                                            }
                                        }}
                                    >
                                        {
                                            value.subMenu ? (
                                                <div className="flex items-center justify-between pr-2">
                                                    <span className={`w-full text-base font-semibold ${submenuId === value.id ? 'text-white' : 'text-black'}`}>
                                                        <div className="flex justify-beetwen">
                                                            {value.title}
                                                        </div>
                                                    </span>
                                                    {
                                                        submenuId === value.id ? (
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                        ) : (
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                        )
                                                    }
                                                </div>
                                            ) : (
                                                <Link className={`w-full text-base font-semibold ${submenuId === value.id ? 'text-white' : 'text-black'}`} to={value.link}>
                                                    <div className="flex justify-beetwen">
                                                        {value.title}
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    </li>

                                    {
                                        submenuId === value.id ? (
                                            <ul>
                                                {
                                                    value.subMenu ? 
                                                    value.subMenu.map(result => {
                                                        return (
                                                            <li className="ml-4 mt-2 cursor-pointer pl-4 py-2 border-l-2 hover:border-[#3F7459]" key={result.title}>
                                                                <Link onClick={() => dispatch(setSideBar(false))} className={`text-base ${currentPathName[2] === result.id && 'text-red-500 font-bold'}`} to={result.path}>
                                                                    {result.title}
                                                                </Link>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        ) : null
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </ul>

                <div className="mx-[24px] mb-4 ml-16">
                    <img src={Powered} />
                </div>
        </aside>
    )
}