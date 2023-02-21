import Multiselect from 'multiselect-react-dropdown';

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

export const InputFile = ({
    label = '',
    className = '',
    // value = '',
    name = '',
    labelColor = '',
    onChange = () => {},
}) => {
    return (
        <div className={`relative`}>
            <label className={labelColor}>
                {label}
            </label>
            <input
                name={name}
                className={`base-input ${className}`} type="file" 
                // value={value}
                onChange={onChange}
                aria-describedby="file_input_help" 
                id="file_input" 
            />
            <p 
                class="mt-1 text-sm text-black-400" id="file_input_help"
            >
                SVG, PNG, JPG or PDF.
            </p>
        </div>
    )
}

export const MultipleSelect = ({
    label='',
    labelColor='',
    listdata= [],
    className='',
    placeholder='',
    selectedValue=[],
    onSelect = () => {},
    onRemove = () => {},
}) => {
    return (
        <div className={`relative`}>
            <label className={labelColor}>
                {label}
            </label>
            <Multiselect
                className={`input-base mt-2 ${className}`}
                options={listdata}
                placeholder={placeholder}
                selectedValues={selectedValue}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="nama"
            />
        </div>
    )
}