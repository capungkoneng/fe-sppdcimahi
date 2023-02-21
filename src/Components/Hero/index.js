import Logo from 'Assets/icons/logo.png';

export const Hero = ({textColor = "text-green-400"}) => {
    return (
        <div className={`inline-flex gap-2 items-center w-full ${textColor}`}>
            <img src={Logo} />
        </div>
    )
}