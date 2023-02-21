export const SectionHeader = ({title,icon, count}) => {
    return (
        <div className="flex items-center">
            <div className="bg-[#3F7459] text-white p-2 flex justify-center items-center" style={{width: "62px", height: "60px", borderRadius: 50}}>
                { icon.icons }
            </div>

            <div className="ml-[13px]">
                <h1 className="title">{title}</h1>
                <p className="text-small">{ count } {title}</p>
            </div>
        </div>
    )
}