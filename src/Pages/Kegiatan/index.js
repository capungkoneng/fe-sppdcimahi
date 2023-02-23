import { SectionHeader, Content, TableContent } from "Components";
import { ListContentTable } from "Components/Content/data";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetAllBerkendara, GetAllCity, GetAllJabatan } from "Services";
import { DeleteKegiatan, GetAllKegiatan, GetKegiatanById } from "Services/Kegiatan";
import { GetAllListPegawai } from "Services/Pegawai";
import { DataLabelKegiatan } from "./data/tabekKegiatan";
import { FormInput } from "./FormInput";
import { View } from "./View";
import moment from "moment";

export const Kegiatan = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [listCity, setListCity] = useState([]);
    const [listKendaraan, setListKendaraan] = useState([]);
    const [listJabatan, setListJabatan] = useState([]);
    const [listPegawai, setListpegawai] = useState([]);
    const [data, setData] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
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
        fetchCity();
        fetchKendaraan();
        fetchJabatan();
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch,state.contentType, state.selectedId]);

    const fetchCity = async () => {
        try {
            const response = await GetAllCity();
            if (response.data.msg) {
                setListCity(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchKendaraan = async () => {
        try {
            const response = await GetAllBerkendara();
            if (response.data.msg) {
                setListKendaraan(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchJabatan = async () => {
        try {
            const response = await GetAllJabatan();
            if (response.data.msg) {
                setListJabatan(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataById = async id => {
        try {
            const response = await GetKegiatanById(id);
            if (response.data) {
                setData(response.data.msg);
                response.data.msg.lsjabatan.map( (dataJabatan) => {
                    getPegawai(dataJabatan.nama)
                })
            }
        } catch (error) {
            
        }
    }

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllKegiatan({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
                setTotalCount(response.data.totalData)
            }
        } catch (error) {
            setListData([]);
        }
    }

    const deleteDataKegiatan = async () => {
        try {
            const response = await DeleteKegiatan(state.selectedId);
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
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

    const getPegawai = async () => {
        
        try {
            const response = await GetAllListPegawai();
            if (response.data) {
                setListpegawai(response.data.result);
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <SectionHeader 
                title="Kegiatan" 
                icon={ iconTitle() }
                count={ totalCount }
            />
            <Content 
                content="Kegiatan"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelKegiatan}
                // onCallback={data => setActiveContent(data)}
                // onSubmit={() => handleOnSubmit()}
                onDeleteData={deleteDataKegiatan}
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
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' } ${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ result.keperluan }</TableContent>
                                <TableContent className={`${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ result.no_surat }</TableContent>
                                <TableContent className={`${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ result.lokasi }</TableContent>
                                <TableContent className={`${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ moment(result.tgl_berangkat).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent className={`${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ moment(result.tgl_mulai).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent className={`${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ moment(result.tgl_selesai).format('DD-MMM-YYYY') }</TableContent>
                                <TableContent className={`flex gap-2 text-sm text-[#202020] px-6 py-4 whitespace-nowrap ${index === value.length - 1 ? 'rounded-br-lg' : '' } ${result.status === '0' ? 'bg-gray-400' : result.status === '1' ? 'bg-blue-400' : result.status === '2' ? 'bg-yellow-200' : 'bg-green-200'}`}>
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
                            listPegawai={listPegawai}
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
                            listCity={listCity}
                            listKendaraan={listKendaraan}
                            listProvince={state.listProvince}
                            listJabatan={listJabatan}
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
                    )
                }
            </Content>
        </main>
    )
}