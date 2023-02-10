export const HaederContent = ({children, icon}) => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-orange-500 w-[48px] h-[48px] rounded-full">
                {icon}
            </div>
            {children}
        </div>
    )
}