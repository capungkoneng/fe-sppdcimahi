export const Card = ({
    title = "Total Customer",
    total = 0,
    icon = ''
}) => {
    return (
        <div className="flex border rounded-xl shadow-md py-4 px-5 w-full justify-between">
            <div>
                <h4 className="text-base font-semibold text-gray-500">{title}</h4>
                <h2 className="mt-3 text-3xl font-semibold">{total}</h2>
            </div>
            <div className="bg-[#3F7459] text-white p-2 flex justify-center items-center" style={{width: "62px", height: "60px", borderRadius: 59}}>
                { icon }
            </div>
        </div>
    );
};