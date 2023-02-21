import { formatterCurrency } from "utils";

export const View = ({
    data = []
}) => {
    return (
        <div>
            { data !== null ? (
                <>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Provinsi</div>
                        <div className="col-span-3">: { data.provinsi }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Satuan</div>
                        <div className="col-span-3">: { data.satuan }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Luar Kota</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.luar_kota)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Dalam Kota</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.dalam_kota)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Diklat</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.diklat)) }</div>
                    </div>
                </>
            ) : ( null )
        }
        </div>
    )
}