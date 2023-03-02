import { Layout } from "Components";
import { Auth, Dashboard, Harian, Kegiatan, Pegawai, Penginapan, RapatLuarKantor, Representasi, SewaKendaraan, Spt, Spd, Pjsppd, Kwitansi, Np2d, Sp2d, Jabatan, Pangkat, Bidang, Golongan, Berkendara, Urusan, Unit, SubUnit } from "Pages";
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import { ProtectRoute } from "./ProtectRoute";

export const RootRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ProtectRoute><Dashboard /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pegawai" element={<ProtectRoute><Pegawai /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/biaya/harian" element={<ProtectRoute><Harian /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/biaya/representasi" element={<ProtectRoute><Representasi /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/biaya/penginapan" element={<ProtectRoute><Penginapan /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/biaya/rapat-luar-kantor" element={<ProtectRoute><RapatLuarKantor /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/biaya/sewa-kendaraan" element={<ProtectRoute><SewaKendaraan /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/kegiatan" element={<ProtectRoute><Kegiatan /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/spt" element={<ProtectRoute><Spt /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/spd" element={<ProtectRoute><Spd /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pertanggungjawaban" element={<ProtectRoute><Pjsppd /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/kpd/kwitansi" element={<ProtectRoute><Kwitansi /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/kpd/np2d" element={<ProtectRoute><Np2d /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/kpd/sp2d" element={<ProtectRoute><Sp2d /></ProtectRoute>} />
                    {/* Pengaturan */}
                    <Route path="/pemkot-cimahi/pengaturan/jabatan" element={<ProtectRoute><Jabatan /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/pangkat" element={<ProtectRoute><Pangkat /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/Bidang" element={<ProtectRoute><Bidang /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/Golongan" element={<ProtectRoute><Golongan /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/Berkendara" element={<ProtectRoute><Berkendara /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/Urusan" element={<ProtectRoute><Urusan /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/Unit" element={<ProtectRoute><Unit /></ProtectRoute>} />
                    <Route path="/pemkot-cimahi/pengaturan/SubUnit" element={<ProtectRoute><SubUnit /></ProtectRoute>} />
                </Route>
                <Route path="/login" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}
