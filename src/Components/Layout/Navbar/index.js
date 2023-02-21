import { Dropdown } from "../Dropdown";
import LogoCimahi from 'Assets/icons/logo-kota-cimahi.png';

export const Navbar = ({
    onClick = () => {}
}) => {
    return (
                <nav
                    className="w-full bg-white flex justify-between items-center transition-all duration-500 py-4 ease-in-out shadow-md rounded-md">
                <div>
                    <div className="ml-3 pr-6 hidden md:block lg:block">
                        <button
                            onClick={() => onClick()}
                            className="hover:text-gray-600 text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-white active:bg-white"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>
                <div>

                </div>
                <div className="w-full hidden md:block lg:block relative inline">
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold">
                            PEMERINTAH KOTA CIMAHI
                        </h2>
                        <img src={LogoCimahi} className="ml-3 h-8 w-8" />
                    </div>
                </div>
                <div className="mr-8 hidden md:block lg:block">
                    <div className="flex items-center">
                        <Dropdown />
                    </div>
                </div>
            </nav>
    )
}