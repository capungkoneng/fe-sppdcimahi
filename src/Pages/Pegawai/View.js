export const View = ({item = []}) => {
    return (
        <section>
            {
                item.length !== 0 ? (
                    <>
                        <div class="grid grid-cols-4 gap-4">
                            <div>Nama</div>
                            <div>: { item.nama }</div>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-1">
                            <div>NIP</div>
                            <div>: { item.nip }</div>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-1">
                            <div>Bidang</div>
                            <div>: { item.bidang }</div>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-1">
                            <div>Jabatan</div>
                            <div>: { item.jabatan }</div>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-1">
                            <div>Pangkat</div>
                            <div>: { item.pangkat }</div>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-1">
                            <div>Golongan</div>
                            <div>: { item.gol }</div>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-1">
                            <div>Kontak</div>
                            <div>: { item.phone }</div>
                        </div>
                    </>
                ) : <></>
            }
        </section>
    )
}