import { SectionHeader, Content, TableContent } from "Components";
import { ListContentTable } from "Components/Content/data";
import { DataLabelAnggaranSPPD } from "./data/tabelAnggaranSPPD";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetAllPageAnggaran, GetAllUrusan, GetAllRekening } from "Services/Pengaturan";
import { FormInput } from "./FormInput";
import { View } from "./View"

export const AnggaranSPPD = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [listDataUrusan, setListDataUrusan] = useState([]);
    const [listDataRekening, setListDataRekening] = useState([]);
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
        fetchAllDataUrusan();
        fetchAllDataRekening();
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            // fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch, state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllPageAnggaran({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
                setTotalCount(response.data.totalData)
            }
        } catch (error) {
            setListData([]);
        }
    }

    const fetchAllDataUrusan = async () => {
        try {
            const response = await GetAllUrusan();
            if (response.data) {
                setListDataUrusan(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            setListDataUrusan([]);
        }
    }

    const fetchAllDataRekening = async () => {
        try {
            const response = await GetAllRekening();
            if (response.data) {
                setListDataRekening(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            setListDataRekening([]);
        }
    }

    // const deleteData = async () => {
    //     try {
    //         const response = await DeleteDataBerkendara(state.selectedId);
    //         if (response.data) {
    //             fetchAllData(1);
    //             dispatch(setContentType('View'));
    //             toast.success('Berhasil hapus data');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const iconTitle = () => {
        const icon = {
            icons: (
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
                title="Anggaran SPPD" 
                icon={ iconTitle() }
                count={ totalCount }
            />
            <Content 
                content="Anggaran SPPD"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelAnggaranSPPD}
                // onCallback={data => setActiveContent(data)}
                // onSubmit={() => handleOnSubmit()}
                // onDeleteData={deleteData}
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
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' } text-justify w-[30%]`}>{ result.urusans[0].nama_urusan }</TableContent>
                                <TableContent className="text-justify w-[30%]">{ result.unitOrs[0].nama_unit }</TableContent>
                                <TableContent className="text-justify w-[30%]">{ result.programs[0].nama_program }</TableContent>
                                <TableContent className={` w-[10%] gap-2 text-sm text-[#202020] px-6 py-4 whitespace-nowrap ${index === value.length - 1 ? 'rounded-br-lg' : '' }`}>
                                    {
                                        ListContentTable.Action.filter(val => { return val.type === 'View' }).map(resultItem => {
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
                {
                    state.contentType === 'View' ? (
                        <View 
                            data={data}
                        />
                    ) : (
                        <FormInput 
                            contentType={state.contentType}
                            item={data}
                            listDataUrusan={listDataUrusan}
                            listDataRekening={listDataRekening}
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
                    )
                }
            </Content>
        </main>
    )
}