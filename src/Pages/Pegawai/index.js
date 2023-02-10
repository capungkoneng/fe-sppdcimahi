import { useEffect, useState } from "react";
import { 
    Button, 
    HaederContent, 
    MainHeader, 
    WrapperContent
} from "Components";
import { FormInput } from "./FormInput";
import { View } from "./View";
import { DeletePegawai, GetAllGolongan, GetAllJabatan, GetAllPangkat, GetAllPegawai, GetPegawaiById } from "Services/Pegawai";
import { useDispatch, useSelector } from "react-redux";
import { setContentType } from "Configs/Redux/reducers";
import { ModalDelete } from "Components/ModalDelete";
import { toast } from "react-toastify";

export const Pegawai = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [listJabatan, setListJabatan] = useState([]);
    const [listPangkat, setListPangkat] = useState([]);
    const [listGolongan, setListGolongan] = useState([]);
    const [item, setItem] = useState(null);
    const [isAddData, setIsAddData] = useState(false);
    const [page] = useState(1);

    useEffect(() => {
        if (isAddData) {
            fetchAllData(page);
        }
    }, [isAddData, page]);

    useEffect(() => {
        fetchAllData(1);
        fetchJabatan();
        fetchGolongan();
        fetchPangkat();
    }, []);

    useEffect(() => {
        if (state.contentType === 'Edit') {
            fetchDataById(state.selectedId);
            dispatch(setContentType('Edit'));
        }
    }, [dispatch, state.contentType, state.selectedId]);

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllPegawai({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
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

    return (
        <main>
            <MainHeader>
                <HaederContent 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                        </svg>
                    }
                >
                    <div>
                        <h1 className="title">Pegawai</h1>
                        {
                            state.contentType === 'Add' ? null : (
                                <Button onClick={() => {
                                    dispatch(setContentType('Add'));
                                }} className="gap-2" backgroundColor="bg-orange-500 mt-2">
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

            <WrapperContent withSearchInput={state.contentType === 'View' ? true : false}>
                {
                    state.contentType === 'View' || state.contentType === 'Delete' ? 
                    <View data={listData} /> : state.contentType !== 'Delete' ?
                    <FormInput 
                        contentType={state.contentType}
                        item={item}
                        listData={{
                            jabatan: listJabatan,
                            golongan: listGolongan,
                            pangkat: listPangkat
                        }}
                        onCallback={(value) => {
                            setIsAddData(value.success)
                            dispatch(setContentType('View'));
                        }}
                    /> : null
                }
            </WrapperContent>
            <ModalDelete
                isOpen={state.contentType === 'Delete' ? true : false}
                onDeleteData={() => deletePegawai()}
                closeModal={() => dispatch(setContentType('View'))}
            />
        </main>
    )
}