export const MainHeader = ({children}) => {

    return (
        <header className="md:pl-72 w-full flex py-4 bg-[#68902dd9] text-white justify-start gap-5 items-center">
            <div className="hidden md:block lg:block">
                <h4 className="font-bold w-[70%] text-center border-1">Dinas Pangan dan Pertanian KOTA CIMAHI</h4>
            </div>
            {children}
        </header>
    )
}