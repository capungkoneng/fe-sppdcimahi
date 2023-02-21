export const TextArea = ({
    withLabel = false,
    label = '',
    id = '',
    name = '',
    placeholder = '',
    value = '',
    onChange = () => {}
}) => {
    return (
        <div>
            {
                withLabel && (
                    <label className="text-gray-700">
                        {label}
                    </label>
                )
            }
            <textarea 
                className="base-input flex-1 w-full px-4 mt-2 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none"
                id={id} 
                placeholder={placeholder} 
                name={name} 
                rows="3" 
                cols="40"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}