import { Table, TableContent } from "Components"
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useDispatch } from "react-redux";
import moment from "moment"
import { ActionData, formatterCurrency } from "utils"

export const View = ({
    listData = []
}) => {
    const dispatch = useDispatch();
    return (
        <Table
            listLabel={[
                {id: 'no_np2d', name: 'No Np2d'},
                {id: 'tgl', name: 'Satuan'},
                {id: 'no_kwt', name: 'No KWT'},
                {id: 'uraian_pembayaran', name: 'Uraian'},
                {id: 'sub_kegiatan', name: 'Sub Kegiatan'},
                {id: 'no_rek', name: 'Kode Rek'},
                {id: 'jumlah', name: 'Jumlah'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                listData.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.no_np2d}</TableContent>
                            <TableContent>{moment(value.tgl).format('DD-MMM-YYYY')}</TableContent>
                            <TableContent>{value.no_kwt}</TableContent>
                            <TableContent>{value.uraian_pembayaran}</TableContent>
                            <TableContent>{value.sub_kegiatan}</TableContent>
                            <TableContent>{value.no_rek}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.jumlah))}</TableContent>
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