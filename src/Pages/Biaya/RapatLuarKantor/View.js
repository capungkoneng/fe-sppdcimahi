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
                {id: 'provinsi', name: 'Provinsi'},
                {id: 'satuan', name: 'Satuan'},
                {id: 'FullBoard Luar Kota', name: 'FullBoard Luar Kota'},
                {id: 'FullBoard Dalam Kota', name: 'FullBoard Dalam Kota'},
                {id: 'Full Day / Half Day Dalam Kota', name: 'Full Day / Half Day Dalam Kota'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                data.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.provinsi}</TableContent>
                            <TableContent>{value.satuan}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.fullboard_luarkota))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.fullboard_dalemkota))}</TableContent>
                            <TableContent>{formatterCurrency.format(parseInt(value.fullday))}</TableContent>
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