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
                        <div>Roda Empat</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.roda4)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Roda 6 / Bus Sedang</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.roda6_biskecil)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Roda6 / Bus Besar</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.roda6_bisbesar)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Taxi</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.taxi)) }</div>
                    </div>
                </>
            ) : ( null )
        }
        </div>
    )
}