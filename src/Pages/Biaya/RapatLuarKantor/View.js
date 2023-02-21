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
                        <div>FullBoard Luar Kota</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.fullboard_luarkota)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>FullBoard Dalam Kota</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.fullboard_dalemkota)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Full Day / Half Day Dalam Kota</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.fullday)) }</div>
                    </div>
                </>
            ) : ( null )
        }
        </div>
    )
}