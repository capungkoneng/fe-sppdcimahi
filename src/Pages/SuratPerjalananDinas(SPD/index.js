import { SectionHeader, Content, TableContent } from "Components"
import { ListContentTable } from "Components/Content/data";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSptNoPage } from "Services/Spt";
import { GetAllSpd, GetSpdById, DeleteSpd } from "Services/Spd";
import { DataLabelSpd } from "./data/tabelSpd";
import { GetPegawaiKepalaDinas, GetPegawaiKepalaDinasBidang } from "Services/Pegawai";
import { toast } from "react-toastify";
import { FormInput } from "./FormInput";
import { View } from "./View";
import moment from "moment";

export const Spd = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listSpt, setListSpt] = useState([]);
    const [listData, setListData] = useState([]);
    const [data, setData] = useState(null);
    const [pegawaiKepala, setPegawaiKepala] = useState(null);
    const [pegawaiKepalaDinas, setPegawaiKepalaDinas] = useState(null);
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
        fetchDataSpt();
        fetchPegawaiKepala();
        fetchPegawaiKepalaBidang();
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch,state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllSpd({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
            }
        } catch (error) {
            setListData([]);
        }
    }

    const fetchDataById = async id => {
        try {
            const response = await GetSpdById(id);
            if (response.data) {
                setData(response.data.msg);
            }
        } catch (error) {
            setData([])
        }
    }

    const fetchDataSpt = async () => {
        try {
            const response = await GetAllSptNoPage();
            if (response.data.result) {
                setListSpt(response.data.result);
            }
        } catch (error) {
            setListSpt([])
        }
    }

    const deleteData = async () => {
        try {
            const response = await DeleteSpd(state.selectedId);
            if (response.data) {
                fetchAllData(1);
                dispatch(setContentType('View'));
                toast.success("Berhasil hapus data");
            }
        } catch (error) {
            toast.success("Gagal hapus data");
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

    const fetchPegawaiKepalaBidang = async () => {
        try {
            const response = await GetPegawaiKepalaDinasBidang();
            if (response.data.result) {
                setPegawaiKepalaDinas(response.data.result);
            }
        } catch (error) {
            
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

    return (
        <main>
            <SectionHeader 
                title="Surat Perjalanan Dinas (SPD)" 
                icon={ iconTitle() }
                count={ listData.length }
            />
            <Content 
                content="Surat Perjalanan Dinas (SPD)"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelSpd}
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
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' }`}>{ result.no_spd }</TableContent>
                                <TableContent>{ result.no_spt }</TableContent>
                                <TableContent className="w-[30%] text-justify">{ result.spt.kegiatan.keperluan }</TableContent>
                                <TableContent>{ moment(result.spt.kegiatan.tgl_berangkat).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent>{ moment(result.spt.kegiatan.tgl_mulai).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent>{ moment(result.spt.kegiatan.tgl_selesai).format('DD-MMM-YYYY') }</TableContent>
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
                        <View 
                            data={data}
                            pegawaiKepala={pegawaiKepala}
                            pegawaiKepalaDinas={pegawaiKepalaDinas}
                        />
                    ) : ( 
                        <FormInput 
                            contentType={state.contentType}
                            item={data}
                            listSpt={listSpt}
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