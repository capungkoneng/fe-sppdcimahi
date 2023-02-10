import { Button, HaederContent, MainHeader, WrapperContent } from "Components"
import { ModalDelete } from "Components/ModalDelete";
import { setContentType } from "Configs/Redux/reducers";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetAllBerkendara, GetAllCity } from "Services";
import { DeleteKegiatan, GetAllKegiatan, GetKegiatanById } from "Services/Kegiatan";
import { FormInput } from "./FormInput";
import { View } from "./View";

export const Kegiatan = () => {
    const state = useSelector(state => state.root);
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const [listCity, setListCity] = useState([]);
    const [listKendaraan, setListKendaraan] = useState([]);
    const [data, setData] = useState(null);
    const [isAddData, setIsAddData] = useState(false);

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

    const fetchDataById = async id => {
        try {
            const response = await GetKegiatanById(id);
            if (response.data) {
                setData(response.data.msg);
            }
        } catch (error) {
            
        }
    }

    const fetchAllData = async (value) => {
        try {
            const response = await GetAllKegiatan({page: value, perpage: 10});
            if (response.data.result) {
                setListData(response.data.result);
            }
        } catch (error) {
            console.log(error);
            setListData([]);
        }
    }

    const deleteData = async () => {
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
    return (
        <main>
            <MainHeader>
                <HaederContent 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                            <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                        </svg>

                    }
                >
                    <div>
                        <h1 className="title">Kegiatan</h1>
                        {
                            state.contentType === 'Edit' ? null : (
                                <Button onClick={() =>  dispatch(setContentType('Add'))} className="gap-2 w-32" backgroundColor="bg-orange-500 mt-2">
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
                    state.contentType === 'View' || state.contentType === 'Delete' ? 
                    <View 
                        data={listData}
                    /> : 
                    <FormInput 
                        listCity={listCity}
                        listKendaraan={listKendaraan}
                        listProvince={state.listProvince}
                        contentType={state.contentType}
                        item={data}
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
            />
        </main>
    )
}