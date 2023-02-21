export const TableContent = ({children, className, onClick = () => {}}) => (
    <td 
        onClick={() => onClick()}
        className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-100  ${className && className}`}
    >
        {children}
    </td>
)
export const Table = ({
    listLabel = [],
    children
}) => {
    return (
        <div className="overflow-auto mt-4">
            <table className="min-w-full shadow-2xl">
                <thead>
                    <tr>
                        {
                            listLabel.map( (value,i) => {
                                return (
                                    <th key={value.id} scope="col" className={`text-sm font-medium text-white px-6 py-4 text-center bg-[#3F7459] ${i === 0 ? 'rounded-tl-lg' : i === listLabel.length - 1 ? 'rounded-tr-lg' : '' }`}>
                                        {value.name}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}