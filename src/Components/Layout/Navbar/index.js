import { Dropdown } from "../Dropdown"

export const Navbar = () => {
    return (
        <nav className="md:pl-72 w-full py-4 px-8 text-white bg-[#458b28] flex items-center justify-end">

            <Dropdown />
        </nav>
    )
}