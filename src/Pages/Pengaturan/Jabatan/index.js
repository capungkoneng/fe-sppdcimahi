import { SectionHeader, Content, TableContent } from "Components";
import { ListContentTable } from "Components/Content/data";
import { DataLabelJabatan } from "./data/tabelJabatan";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetAllPagejabatan, DeleteDataJabatan } from "Services/Pengaturan";
import { FormInput } from "./FormInput";
// import { View } from "./View"
import moment from "moment"

export const Jabatan = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [data, setData] = useState(null);
    const [isAddData, setIsAddData] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState({
        contentType: null,
        value: null,
        status: false
    });

    useEffect(() => {
        if (isAddData) {
            fetchAllData(1);
        }
    }, [isAddData]);

    useEffect(() => {
        fetchAllData(1);
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            // fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch, state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllPagejabatan({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
                setTotalCount(response.data.totalData)
            }
        } catch (error) {
            console.log(error);
            setListData([]);
        }
    }

    const deleteData = async () => {
        try {
            const response = await DeleteDataJabatan(state.selectedId);
            if (response.data) {
                fetchAllData(1);
                dispatch(setContentType('View'));
                toast.success('Berhasil hapus data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const iconTitle = () => {
        const icon = {
            icons: (
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"></path>
                </svg>
            )
        }
        return icon
    }

    const handleActionContent = (type, value) => {
        const changeData = {
            contentType: type,
            value: value,
            status: true
        }
        setData(value)
        setStatusModal(changeData);
        dispatch(setContentType(type));
        dispatch(setSelectedId(value.id));
    }

    return (
        <main>
            <SectionHeader 
                title="Jabatan" 
                icon={ iconTitle() }
                count={ totalCount }
            />
            <Content 
                content="Jabatan"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelJabatan}
                // onCallback={data => setActiveContent(data)}
                // onSubmit={() => handleOnSubmit()}
                onDeleteData={deleteData}
                onCloseModal={(value) => {
                    value && setIsAddData(null);
                    setData(null);
                }}
                onChangePage={(value) => {
                    setCurrentPage(value);
                    fetchAllData(value);
                }}
                statusModal={statusModal}
                currentPage={currentPage}
                totalCount={totalCount}
                renderContent={(value) => {
                    return value.length === 0 ? (
                        <tr>
                            <td 
                                colSpan="7"
                                className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600 bg-gray-100 rounded-bl-lg rounded-br-lg text-center`}
                            >
                                Tidak Ada Data
                            </td>
                        </tr>
                    ) : value.map((result, index) => {
                        return (
                            <tr key={index}>
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' }`}>{ result.nama }</TableContent>
                                <TableContent>{ moment(result.created_at).format('DD-MMMM-YYYY') }</TableContent>
                                <TableContent className={`flex gap-2 text-sm text-[#202020] px-6 py-4 whitespace-nowrap ${index === value.length - 1 ? 'rounded-br-lg' : '' }`}>
                                    {
                                        ListContentTable.Action.filter(val => { return val.type !== 'View' }).map(resultItem => {
                                            return (
                                                <>
                                                    <button data-tooltip-target="tooltip" onClick={() => handleActionContent(resultItem.type, result)} key={resultItem.type} className={`py-[6px] px-[10px] rounded-[50%] ${resultItem.color}`}>
                                                        {resultItem.icon}
                                                    </button>
                                                </>
                                                
                                            )
                                        })
                                    }
                                </TableContent>
                            </tr>
                        )
                    })
                }}
            >
                {/* {
                    state.contentType === 'View' ? (
                        <View 
                            data={data}
                        />
                    ) : ( */}
                        <FormInput 
                            contentType={state.contentType}
                            item={data}
                            onCallback={(value) => {
                                setIsAddData(value.success)
                                fetchAllData(1)
                                const changeData = {
                                    contentType: null,
                                    value: null,
                                    status: false
                                }
                                setStatusModal(changeData);
                            }}
                        />
                    {/* )
                } */}
            </Content>
        </main>
    )
}