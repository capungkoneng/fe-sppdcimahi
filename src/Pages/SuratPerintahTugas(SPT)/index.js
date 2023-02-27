import { SectionHeader, Content, TableContent } from "Components"
import { ListContentTable } from "Components/Content/data";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSpt, GetSptById, DeleteSpt } from "Services/Spt";
import { GetKegiatanApprove } from "Services/Kegiatan";
import { GetPegawaiKepalaDinas } from "Services/Pegawai";
import { DataLabelSpt } from "./data/tabelSpt";
import { toast } from "react-toastify";
import { FormInput } from "./FormInput";
import { Views } from "./View";
import moment from "moment";

export const Spt = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listKegiatan, setListKegiatan] = useState([]);
    const [listData, setListData] = useState([]);
    const [pegawaiKepala, setPegawaiKepala] = useState(null);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddData, setIsAddData] = useState(false);
    const [statusModal, setStatusModal] = useState({
        contentType: null,
        value: null,
        status: false
    });

    useEffect(() => {
        if (isAddData) {
            fetchAllData(1);
            setIsAddData(false);
            dispatch(setContentType('View'));
        }
    }, [dispatch,isAddData]);

    useEffect(() => {
        fetchAllData(1);
        fetchDataKegiatan();
        fetchPegawaiKepala();
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch,state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllSpt({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
            }
        } catch (error) {
            setListData([]);
        }
    }
    
    const fetchDataById = async id => {
        try {
            const response = await GetSptById(id);
            if (response.data) {
                console.log(response.data)
                setData(response.data.msg);
            }
        } catch (error) {
            
        }
    }

    const fetchDataKegiatan = async () => {
        try {
            const response = await GetKegiatanApprove();
            if (response.data.result) {
                setListKegiatan(response.data.result);
            }
        } catch (error) {
            
        }
    }

    const fetchPegawaiKepala = async () => {
        try {
            const response = await GetPegawaiKepalaDinas();
            if (response.data.result) {
                setPegawaiKepala(response.data.result);
            }
        } catch (error) {
            
        }
    }

    const deleteData = async () => {
        try {
            const response = await DeleteSpt(state.selectedId);
            if (response.data) {
                fetchAllData(1);
                dispatch(setContentType('View'));
                toast.success("Berhasil hapus data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const iconTitle = () => {
        const icon = {
            icons: (
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
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
    console.log(data)

    return (
        <main>
            {/* <MainHeader>
                <HaederContent 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                        </svg>
                    }
                >
                    <div>
                        <h1 className="title">Surat Perintah Tugas(SPT)</h1>
                        {
                            contentType === 'Edit' ? null : (
                                <Button onClick={() => setContentType('Edit')} className="gap-2" backgroundColor="bg-orange-500 mt-2">
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

            <WrapperContent withSearchInput={contentType === 'View' ? true : false}>
                {
                    contentType === 'View' ? 
                    <View /> : 
                    <FormInput />
                }
            </WrapperContent> */}
            <SectionHeader 
                title="Surat Perintah Tugas (SPT)" 
                icon={ iconTitle() }
                count={ listData.length }
            />
            <Content 
                content="Surat Perintah Tugas (SPT)"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelSpt}
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
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' }w-[10%] align-text-top`}>{ result.no_spt }</TableContent>
                                <TableContent className="w-[30%] text-justify align-text-top">{ result.kegiatan.keperluan }</TableContent>
                                <TableContent className="align-text-top whitespace-nowrap">{ moment(result.kegiatan.tgl_berangkat).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent className="align-text-top whitespace-nowrap">{ moment(result.kegiatan.tgl_mulai).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent className="align-text-top whitespace-nowrap">{ moment(result.kegiatan.tgl_selesai).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent className="align-text-top">
                                    <ul>
                                        {
                                            result.kegiatan.lsnamajbatan.map( data => {
                                                return (
                                                    <li>
                                                        {data.nama_pegawai} ({data.nama})
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </TableContent>
                                <TableContent className={`gap-2 text-sm text-[#202020] px-6 py-4 whitespace-nowrap ${index === value.length - 1 ? 'rounded-br-lg' : '' }`}>
                                    {
                                        ListContentTable.Action.map(resultItem => {
                                            return (
                                                <>
                                                    <button data-tooltip-target="tooltip" onClick={() => handleActionContent(resultItem.type, result)} key={resultItem.type} className={`py-[6px] px-[10px] rounded-[50%] mx-1 ${resultItem.color}`}>
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
                        <Views
                            data={data}
                            pegawaiKepala={pegawaiKepala}
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
                    ) : (
                        <FormInput 
                            contentType={state.contentType}
                            item={data}
                            listKegiatan={listKegiatan}
                            onCallback={(value) => {
                                setIsAddData(value.success)
                                fetchAllData(1)
                                setData(null)
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