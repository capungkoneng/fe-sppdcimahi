import { useEffect, useState } from "react";
import { Card } from './components/Card';
import { DataOverview } from './data';
import { GetAllPegawai } from "Services/Pegawai";

export const Dashboard = () => {

    const [totalPegawai, setTotalPegawai] = useState(0);

    useEffect(() => {
        fetchAllPegawai();
    }, []);

    const fetchAllPegawai = async () => {
        try {
            const response = await GetAllPegawai({page: 1, perpage: 10});
            if (response.data.result) {
                setTotalPegawai(response.data.totalData)
            }
        } catch (error) {
            console.log(error);
            setTotalPegawai(0)
        }
    };

    return (
        <main>
            <div className="">
                <h2 className="text-2xl text-center font-bold">
                    SELAMAT DATANG DI DASHBOARD
                </h2>
                <h2 className="text-2xl text-center font-bold">
                    APLIKASI SPPD
                </h2>
                <div className="flex items-center mt-8 gap-5 lg:flex-row flex-col">
                    {
                        DataOverview.map(value => {
                            return <Card key={value.name} title={value.name} total={value.name === 'Jumlah Pegawai' ? totalPegawai : 0} icon={value.icons}/>
                        })
                    }
                </div>
                <section className="border-l-4 border-[#36AC70] mt-8 pl-8 pr-8 py-2">
                    <p className="text-lg text-justify font-semibold">
                        SPD adalah surat yang memuat keterangan tentang penugasan seseorang pejabat/pegawai suatu kantor, untuk bertugas ke suatu wilayah dengan biaya kantor untuk jangka waktu yang ditentukan. Dalam dinas pemerintahan sering disebut Surat Perintah Perjalanan Dinas (SPPD) yang ditujukan kepada seorang pegawai untuk melakukan tugas tertentu. Yang dimaksud dengan perjalanan dinas adalah perjalanan ke luar dari tempat kedudukan yang jaraknya minimal 5km dari batas kota, dilakukan atas perintah dan wewenang untuk keperluan Negara
                    </p>
                </section>
                
                <section className="border-r-4 border-[#36AC70] mt-8 pl-8 pr-8 py-2">
                    <p className="text-lg font-semibold text-justify">
                        SPD berguna sebagai pelengkap keterangan bagi si pemilik agar dalam melaksankan tugas dinas dapat berjalan dengan efisien sesuai dengan jadwal waktu yang sudah tersedia
                    </p>
                </section>
            </div>
        </main>
    )
}