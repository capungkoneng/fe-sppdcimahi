import { SectionHeader, Content, TableContent } from "Components";
import { ListContentTable } from "Components/Content/data";
import { DataLabelProgram } from "./data/tabelProgram";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetAllPageProgram, DeleteDataProgram, GetAllUrusan } from "Services/Pengaturan";
import { FormInput } from "./FormInput";
// import { View } from "./View"

export const Program = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [listDataUrusan, setListDataUrusan] = useState([]);
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
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            // fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch, state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllPageProgram({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
                setTotalCount(response.data.totalData)
            }
        } catch (error) {
            console.log(error);
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

    const deleteData = async () => {
        try {
            const response = await DeleteDataProgram(state.selectedId);
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
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
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
        dispatch(setSelectedId(value.prog_id));
    }

    return (
        <main>
            <SectionHeader 
                title="Program" 
                icon={ iconTitle() }
                count={ totalCount }
            />
            <Content 
                content="Program"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelProgram}
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
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' }`}>{ result.kode_urusan }</TableContent>
                                <TableContent>{ result.kode_program }</TableContent>
                                <TableContent className="w-[50%]">{ result.nama_program }</TableContent>
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
                            ListUrusan={listDataUrusan}
                            onCallback={(value) => {
                                setIsAddData(value.success)
                                fetchAllData(1)
                                const changeData = {
                                    contentType: null,
                                    value: null,
                                    status: false
                                }
                                setData(null)
                                setStatusModal(changeData);
                            }}
                        />
                    {/* )
                } */}
            </Content>
        </main>
    )
}