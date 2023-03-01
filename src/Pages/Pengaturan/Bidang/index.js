import { SectionHeader, Content, TableContent } from "Components";
import { ListContentTable } from "Components/Content/data";
import { DataLabelBidang } from "./data/tabelBidang";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetAllPageBidang, DeleteDataBidang } from "Services/Pengaturan";
import { FormInput } from "./FormInput";
// import { View } from "./View"
import moment from "moment"

export const Bidang = () => {
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
            const response = await GetAllPageBidang({page: value, perpage: 10});
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
            const response = await DeleteDataBidang(state.selectedId);
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
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"></path>
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
                title="Bidang" 
                icon={ iconTitle() }
                count={ totalCount }
            />
            <Content 
                content="Bidang"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelBidang}
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