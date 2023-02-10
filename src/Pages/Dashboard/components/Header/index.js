import moment from "moment"

export const Header = () => {
    const listData = [
        {id: 0, name: 'TAHUN', value: moment(new Date()).format('YYYY')},
        {id: 1, name: 'SPPD Aktif', value: 0},
        {id: 2, name: 'SPPD Tuntas', value: 0},
        {id: 3, name: 'Jumlah Pegawai', value: 0},
        {id: 5, name: 'Biaya SPPD', value: 0},
    ]
    return (
        <div className="flex items-center gap-2">
            {
                listData.map((value, index) => {
                    return (
                        <div key={value.id} className={`text-center px-2 lg:px-4 md:px-4 ${listData.length === index + 1 ? '' : 'border-r-2 border-white'}`}>
                            <p className="font-bold text-xs lg:text-lg md:text-lg">{value.name}</p>
                            <p className="font-bold text-xs md:text-sm lg:text-sm mt-2">{value.value}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}