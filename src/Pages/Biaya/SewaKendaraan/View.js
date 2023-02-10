import { Table, TableContent } from "Components"
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useDispatch } from "react-redux"
import { ActionData, formatterCurrency } from "utils"

export const View = ({
    data = []
}) => {
    const dispatch = useDispatch();
    return (
        <Table
            listLabel={[
                {id: 'provinsi', name: 'Provinsi'},
                {id: 'satuan', name: 'Satuan'},
                {id: 'roda_empat', name: 'Roda Empat'},
                {id: 'Roda 6 / Bus Sedang', name: 'Roda 6 / Bus Sedang'},
                {id: 'Roda6 / Bus Besar', name: 'Roda6 / Bus Besar'},
                {id: 'taxi', name: 'Taxi'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                data.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.provinsi}</TableContent>
                            <TableContent>{value.satuan}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.roda4))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.roda6_biskecil))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.roda6_bisbesar))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.taxi))}</TableContent>
                            <TableContent>
                                    {
                                        ActionData.map(result => {
                                            return result.isRender ? (
                                                <button 
                                                    className="mt-2" 
                                                    key={result.id}
                                                    onClick={() => {
                                                        dispatch(setContentType(result.name))
                                                        dispatch(setSelectedId(value.id))
                                                    }}
                                                >
                                                    {result.icon}
                                                </button>
                                            ) : null
                                        })
                                    }
                            </TableContent>
                        </tr>
                    )
                })
            }
        </Table>
    )
}