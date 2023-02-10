import { Table, TableContent } from "Components"
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import moment from "moment"
import { useDispatch } from "react-redux"
import { ActionData } from "utils";

export const View = ({data = []}) => {
    const dispatch = useDispatch();
    return (
        <Table
            listLabel={[
                {id: 'keperluan', name: 'Keperluan'},
                {id: 'no_surat', name: 'No Surat'},
                {id: 'lokasi', name: 'Lokasi'},
                {id: 'tgl_berangkat', name: 'Tgl Berangkat'},
                {id: 'tgl_mulai', name: 'Tgl Mulai'},
                {id: 'tgl_selesai', name: 'Tgl Selesai'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                data.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.keperluan}</TableContent>
                            <TableContent>{value.no_surat}</TableContent>
                            <TableContent>{value.lokasi}</TableContent>
                            <TableContent>{moment(value.tgl_berangkat).format('DD-MMM-YYYY')}</TableContent>
                            <TableContent>{moment(value.tgl_mulai).format('DD-MMM-YYYY')}</TableContent>
                            <TableContent>{moment(value.tgl_selesai).format('DD-MMM-YYYY')}</TableContent>
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