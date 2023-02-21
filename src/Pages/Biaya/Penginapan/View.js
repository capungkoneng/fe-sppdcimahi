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
                        <div>Pejabat / Eselon I</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.peselon1)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Pejabat / Eselon II</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.peselon2)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Eselon III / Gol IV</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.g2eselon1)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Eselon IV / Gol III</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.g3eselon3)) }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Gol I / Gol II</div>
                        <div className="col-span-3">: { formatterCurrency.format(parseInt(data.g4eselon4)) }</div>
                    </div>
                </>
            ) : ( null )
        }
        </div>
    )
}