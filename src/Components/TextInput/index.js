export const TextInput = ({
    label = 'Email',
    className = '',
    wrapperClassName = '',
    placeholder = '',
    value = '',
    name = '',
    id = '',
    type = 'text',
    labelColor = "text-gray-700",
    onChange = () => {},
    withLabel = false,
    disable = false,
    rightIcon = false,
    icon,
    position = 'top-2 left-2'
}) => {
    return (
        <div className={`relative ${wrapperClassName}`}>
            {
                withLabel ? (
                    <label className={labelColor}>
                        {label}
                    </label>
                ) : null
            }
            {
                rightIcon ? (
                    <div className={`absolute ${position}`}>
                        {icon}
                    </div>
                ) : null
            }
            <input 
                disabled={disable}
                type={type} 
                id={id} 
                className={`base-input ${rightIcon ? 'pl-10' : 'pr-10 '}${className}`} 
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete="on"
            />
        </div>
    )
}