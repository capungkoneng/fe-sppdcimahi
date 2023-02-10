import { Hero } from "Components/Hero";
import { setContentType } from "Configs/Redux/reducers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListNav } from "./data";

export const Sidebar = () => {
    const dispatch = useDispatch();
    const [selectedKeySubmenu, setSelectedKeySubmenu] = useState(null);
    return (
        <aside className="lg:block md:block hidden overflow-auto w-full md:w-64 lg:w-64 h-full bg-gradient-to-t from-[#68902dd9] to-white fixed transition-all duration-500 ease-in-out">
            <div className="p-4">
                <Hero />
            </div>
            <div className="mt-8">
                {
                    ListNav.map((value, index) => {
                        return value.subMenu !== null ? (
                            <div key={value.id}>
                                <div onClick={() => {
                                    selectedKeySubmenu === index ? setSelectedKeySubmenu(null) : setSelectedKeySubmenu(index)
                                }} className="py-2 px-4 hover:bg-slate-200 cursor-pointer flex justify-between gap-2">
                                    <div className="flex item-center gap-2">
                                        <div className="w-[26px] h-[26px] rounded-full bg-orange-500 flex justify-center items-center text-white">
                                            {value.icon}
                                        </div>
                                        <span className="text-sm font-bold">{value.title}</span>
                                    </div>

                                    <div className="cursor-pointer">
                                        {
                                            selectedKeySubmenu === index ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                                </svg>

                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                </svg>
                                            )
                                        }
                                    </div>
                                </div>

                                {
                                    selectedKeySubmenu === index && value.subMenu.map((result) => {
                                        return (
                                            <Link key={result.path} onClick={() => dispatch(setContentType('View'))} to={result.path} className="pl-8 py-2 px-4 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
                                                <span className="text-sm font-bold ml-4">{result.title}</span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <Link to={value.link} onClick={() => dispatch(setContentType('View'))}  key={value.id} className="py-2 px-4 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
                                <div className="w-[26px] h-[26px] rounded-full bg-orange-500 flex justify-center items-center text-white">
                                    {value.icon}
                                </div>
                                <span className="text-sm font-bold">{value.title}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </aside>
    )
}