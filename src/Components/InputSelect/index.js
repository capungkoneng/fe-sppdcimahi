export const InputSelect = ({
    withLabel = true,
    label = "",
    children,
    id = "",
    name = "",
    value = "",
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
            <select 
                onChange={onChange}
                id={id} 
                className="mt-2 block px-2 py-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name={name}>
                <option value={value}>
                    {value === "" ? "Select an option" : value}
                </option>
                {children}
            </select>
        </div>
    )
}