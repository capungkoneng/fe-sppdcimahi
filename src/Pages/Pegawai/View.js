import { Table, TableContent } from "Components"
import { setContentType, setSelectedId } from "Configs/Redux/reducers"
import { useDispatch } from "react-redux"
import { ActionData } from "utils"

export const View = ({data = []}) => {
    const dispatch = useDispatch();
    return (
        <section>
            <Table
                listLabel={[
                    {id: 'nama', name: 'Nama'},
                    {id: 'nip', name: 'NIP'},
                    {id: 'jabatan', name: 'Jabatan'},
                    {id: 'pangkat', name: 'Pangkat'},
                    {id: 'gol', name: 'Gol'},
                    {id: 'kontak', name: 'Kontak'},
                    {id: 'aksi', name: 'Aksi'},
                ]}
            >
                {
                    data.map((value, index) => {
                        return (
                            <tr key={index}>
                                <TableContent>{value.nama}</TableContent>
                                <TableContent>{value.nip}</TableContent>
                                <TableContent>{value.jabatan}</TableContent>
                                <TableContent>{value.pangkat}</TableContent>
                                <TableContent>{value.pangkat}</TableContent>
                                <TableContent>{value.phone}</TableContent>
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
        </section>
    )
}