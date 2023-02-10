import { Hero, MainHeader } from "Components"
import { Header } from "./components"

export const Dashboard = () => {


    return (
        <main>
            <MainHeader>
                <Header />
            </MainHeader>
            <div className="wrapper-content">
                <section className="pb-2 border-b-2 border-[#68902dd9]">
                    <Hero textColor="text-[#68902dd9]" />
                </section>

                <section className="border-l-4 border-[#68902dd9] mt-8 pl-8 py-2">
                    <p className="text-lg font-semibold">
                        SPD adalah surat yang memuat keterangan tentang penugasan seseorang pejabat/pegawai suatu kantor, untuk bertugas ke suatu wilayah dengan biaya kantor untuk jangka waktu yang ditentukan. Dalam dinas pemerintahan sering disebut Surat Perintah Perjalanan Dinas (SPPD) yang ditujukan kepada seorang pegawai untuk melakukan tugas tertentu. Yang dimaksud dengan perjalanan dinas adalah perjalanan ke luar dari tempat kedudukan yang jaraknya minimal 5km dari batas kota, dilakukan atas perintah dan wewenang untuk keperluan Negara
                    </p>
                </section>
                
                <section className="border-r-4 border-[#68902dd9] mt-8 pr-8 py-2 w-full md:w-3/4 lg:w-3/4 ml-auto">
                    <p className="text-lg font-semibold text-right">
                        SPD berguna sebagai pelengkap keterangan bagi si pemilik agar dalam melaksankan tugas dinas dapat berjalan dengan efisien sesuai dengan jadwal waktu yang sudah tersedia
                    </p>
                </section>
            </div>
        </main>
    )
}