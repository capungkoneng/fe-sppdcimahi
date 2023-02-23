export const Button = ({
    backgroundColor = 'bg-blue-900',
    color = 'text-white',
    onClick,
    text = 'Click Me',
    withIcon = false,
    className = '',
    icon
}) => {
    return (
        <button 
            onClick={onClick} 
            className={`${backgroundColor} ${color} gap-2 whitespace-nowrap text-[14px] w-full rounded-full p-[14px] flex justify-center items-center ${className}`}
        >
            {withIcon ? (
                <>
                        {icon}
                    {text}
                </>
            ) : text}
        </button>
    )
}