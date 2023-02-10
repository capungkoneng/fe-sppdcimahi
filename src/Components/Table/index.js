export const TableContent = ({children, className, onClick = () => {}}) => (
    <td 
        onClick={() => onClick()}
        className={`px-6 py-4 bg-green-100 text-center whitespace-nowrap text-xs text-gray-900 ${className && className}`}
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
            <table className="min-w-full">
                <thead>
                    <tr className="bg-orange-500 text-white rounded-lg">
                        {
                            listLabel.map(value => {
                                return (
                                    <th key={value.id} scope="col" className="text-md font-bold px-6 py-4 text-center">
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