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
                {id: 'Pejabat / Eselon I', name: 'Pejabat / Eselon I'},
                {id: 'Pejabat / Eselon II', name: 'Pejabat / Eselon II'},
                {id: 'Eselon III / Gol IV', name: 'Eselon III / Gol IV'},
                {id: 'Eselon IV / Gol III', name: 'Eselon IV / Gol III'},
                {id: 'Gol I / Gol II', name: 'Gol I / Gol II'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                data.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.provinsi}</TableContent>
                            <TableContent>{value.satuan}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.peselon1))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.peselon2))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.g2eselon1))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.g3eselon3))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.g4eselon4))}</TableContent>
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