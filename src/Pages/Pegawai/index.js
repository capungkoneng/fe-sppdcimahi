import { useEffect, useState } from "react";
import { 
    Content,
    SectionHeader,
    TableContent
} from "Components";
import { DataLabelEmploye } from './data/tableEmployeSchema'
import { ListContentTable } from "Components/Content/data";
import { DeletePegawai, GetAllGolongan, GetAllJabatan, GetAllPangkat, GetAllPegawai, GetPegawaiById, GetAllBidang } from "Services/Pegawai";
import { useDispatch, useSelector } from "react-redux";
import { setContentType, setSelectedId } from "Configs/Redux/reducers";
import { toast } from "react-toastify";
import { FormInput } from "./FormInput";

export const Pegawai = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [listJabatan, setListJabatan] = useState([]);
    const [listPangkat, setListPangkat] = useState([]);
    const [listGolongan, setListGolongan] = useState([]);
    const [listBidang, setListBidang] = useState([]);
    const [item, setItem] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [isAddData, setIsAddData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState({
        contentType: null,
        value: null,
        status: false
    })

    useEffect(() => {
        if (isAddData) {
            fetchAllData(currentPage);
        }
    }, [isAddData, currentPage]);

    useEffect(() => {
        fetchAllData(1);
        fetchJabatan();
        fetchGolongan();
        fetchPangkat();
        fetchBidang();
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }else if(state.contentType === 'View'){
            fetchDataById(state.selectedId);
        }
    }, [dispatch, state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllPegawai({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
                setTotalCount(response.data.totalData)
            }
        } catch (error) {
            console.log(error);
            setListData([]);
        }
    };

    const fetchDataById = async id => {
        try {
            const response = await GetPegawaiById(id);
            if (response.data) {
                setItem(response.data.msg);
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
            setListJabatan([]);
        }
    }

    const fetchPangkat = async () => {
        try {
            const response = await GetAllPangkat();
            if (response.data.msg) {
                setListPangkat(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            setListPangkat([]);
        }
    }

    const fetchGolongan = async () => {
        try {
            const response = await GetAllGolongan();
            if (response.data.msg) {
                setListGolongan(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            setListJabatan([]);
        }
    }

    const fetchBidang = async () => {
        try {
            const response = await GetAllBidang();
            if (response.data.msg) {
                setListBidang(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            setListBidang([]);
        }
    }

    const deletePegawai = async () => {
        try {
            const response = await DeletePegawai(state.selectedId);
            if (response.data) {
                fetchAllData(1);
                dispatch(setContentType('View'));
                toast.success("Berhasil hapus data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleActionContent = (type, value) => {
        const changeData = {
            contentType: type,
            value: value,
            status: true
        }
        setStatusModal(changeData);
        dispatch(setContentType(type));
        dispatch(setSelectedId(value.id));
    };

    const iconTitle = () => {
        const icon = {
            icons: (
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                </svg>
            )
        }
        return icon
    }

    return (
        <main>
            <SectionHeader 
                title="Pegawai" 
                icon={ iconTitle() }
                count={ totalCount }
            />
            <Content 
                content="Pegawai"
                data={listData}
                // listTabData={DataTabsSupplier}
                listContentTab={DataLabelEmploye}
                // onCallback={data => setActiveContent(data)}
                // onSubmit={() => handleOnSubmit()}
                onDeleteData={deletePegawai}
                onCloseModal={(value) => {
                    value && setIsAddData(null);
                    setItem(null);
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
                                colSpan="8"
                                className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600 bg-gray-100 rounded-bl-lg rounded-br-lg text-center`}
                            >
                                Tidak Ada Data
                            </td>
                        </tr>
                    ) : value.map((result, index) => {
                        return (
                            <tr key={index}>
                                <TableContent className={`${index === value.length - 1 ? 'rounded-bl-lg' : '' }`}>{ result.nama }</TableContent>
                                <TableContent>{ result.nip }</TableContent>
                                <TableContent>{ result.bidang }</TableContent>
                                <TableContent>{ result.jabatan }</TableContent>
                                <TableContent>{ result.pangkat }</TableContent>
                                <TableContent>{ result.gol }</TableContent>
                                <TableContent>{ result.phone }</TableContent>
                                <TableContent className={`flex gap-2 text-sm text-[#202020] px-6 py-4 whitespace-nowrap ${index === value.length - 1 ? 'rounded-br-lg' : '' }`}>
                                    {
                                        ListContentTable.Action.map(resultItem => {
                                            return (
                                                <button onClick={() => handleActionContent(resultItem.type, result)} key={resultItem.type} className={`py-[6px] px-[10px] rounded-[50%] ${resultItem.color}`}>
                                                    {resultItem.icon}
                                                </button>
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
                        <>
                            { item !== null ? (
                                <>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Nama</div>
                                        <div>: { item.nama }</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-1">
                                        <div>NIP</div>
                                        <div>: { item.nip }</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-1">
                                        <div>Bidang</div>
                                        <div>: { item.bidang }</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-1">
                                        <div>Jabatan</div>
                                        <div>: { item.jabatan }</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-1">
                                        <div>Pangkat</div>
                                        <div>: { item.pangkat }</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-1">
                                        <div>Golongan</div>
                                        <div>: { item.gol }</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-1">
                                        <div>Kontak</div>
                                        <div>: { item.phone }</div>
                                    </div>
                                </>
                            ) : null 
                            }
                        </>
                    ) : (
                        <FormInput 
                            contentType={state.contentType}
                            item={item}
                            listData={{
                                jabatan: listJabatan,
                                golongan: listGolongan,
                                pangkat: listPangkat,
                                bidang: listBidang
                            }}
                            onCallback={(value) => {
                                setIsAddData(value.success)
                                const changeData = {
                                    contentType: null,
                                    value: null,
                                    status: false
                                }
                                setStatusModal(changeData);
                                if(value.contentType === 'Edit'){
                                    setItem(value.data)
                                }
                            }}
                        />
                    )
                }
            </Content>
        </main>
    )
}