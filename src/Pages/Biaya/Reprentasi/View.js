import { Table, TableContent } from "Components"
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useDispatch } from "react-redux";
import { ActionData, formatterCurrency } from "utils";

export const View = ({
    data = []
}) => {
    const dispatch = useDispatch();
    return (
        <Table
            listLabel={[
                {id: 'urain', name: 'Uraian'},
                {id: 'satuan', name: 'Satuan'},
                {id: 'luar_kota', name: 'Luar Kota'},
                {id: 'dalam', name: 'Dalam Kota ( > 8 jam )'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                data.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.uraian}</TableContent>
                            <TableContent>{value.satuan}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.luar_kota))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.luar_kota))}</TableContent>
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