import { SectionHeader, Content, TableContent } from "Components";
import { ListContentTable } from "Components/Content/data";
import { DataLabelRepresentasi } from "./data/tabelRepresentasi";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteDataRepresentasi, GetAllDataRepresentasi, GetRepresentasiById } from "Services";
import { FormInput } from "./FormInput";
import { View } from "./View";
import { formatterCurrency } from "utils";

export const Representasi = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [isAddData, setIsAddData] = useState(false);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState({
        contentType: null,
        value: null,
        status: false
    });

    useEffect(() => {
        if (state.contentType === 'Edit') {
            fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'))
        }
    }, [dispatch, state.contentType, state.selectedId]);

    useEffect(() => {
        if (isAddData) {
            fetchAllData(1);
        }
    }, [isAddData]);

    useEffect(() => {
        fetchAllData(1);
    }, []);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllDataRepresentasi({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
            }
        } catch (error) {
            console.log(error);
            setListData([]);
        }
    } 
    const fetchDataById = async id => {
        try {
            const response = await GetRepresentasiById(id);
            if (response.data) {
                setData(response.data.msg);
            }
        } catch (error) {
            
        }
    }

    const deleteData = async () => {
        try {
            const response = await DeleteDataRepresentasi(state.selectedId);
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        }
        return icon
    }

    const handleActionContent = (type, value) => {
        if(type === 'View'){
            fetchDataById(value.id)
        }
        const changeData = {
            contentType: type,
            value: value,
            status: true
        }
        setStatusModal(changeData);
        dispatch(setContentType(type));
        dispatch(setSelectedId(value.id));
    }

    return (
        <main>
            {/* <MainHeader>
                <HaederContent 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                            <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                        </svg>

                    }
                >
                    <div>
                        <h1 className="title">Biaya Representasi SPPD</h1>
                        {
                            state.contentType === 'Edit' ? null : (
                                <Button onClick={() => dispatch(setContentType('Add'))} className="gap-2 w-32" backgroundColor="bg-orange-500 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    Tambah
                                </Button>
                            )
                        }
                    </div>
                </HaederContent>
            </MainHeader>

            <WrapperContent>
                {
                    state.contentType === 'View' ? 
                    <View
                        data={listData}
                    /> : 
                    <FormInput 
                        item={data}
                        contentType={state.contentType}
                        onCallback={(value) => {
                            setIsAddData(value.success)
                            dispatch(setContentType('View'))
                        }}
                    />
                }
            </WrapperContent>

            <ModalDelete
                isOpen={state.contentType === 'Delete' ? true : false}
                onDeleteData={() => deleteData()}
                closeModal={() => dispatch(setContentType('View'))}
            /> */}

            <SectionHeader 
                title="Biaya Representasi SPPD" 
                icon={ iconTitle() }
                count={ listData.length }
            />
            <Content 
                content="Biaya Representasi SPPD"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelRepresentasi}
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
                totalCount={listData.length}
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
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' }`}>{ result.uraian }</TableContent>
                                <TableContent>{ result.satuan }</TableContent>
                                <TableContent>{ formatterCurrency.format(parseInt(result.luar_kota)) }</TableContent>
                                <TableContent>{ formatterCurrency.format(parseInt(result.dalam_kota)) }</TableContent>
                                <TableContent className={`flex gap-2 text-sm text-[#202020] px-6 py-4 whitespace-nowrap ${index === value.length - 1 ? 'rounded-br-lg' : '' }`}>
                                    {
                                        ListContentTable.Action.map(resultItem => {
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
                            item={data}
                            contentType={state.contentType}
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