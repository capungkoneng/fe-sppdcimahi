import { useEffect, useState } from "react"

export const Tabs = ({
    data = [
        {id: 1, name: 'Supplier'},
        {id: 2, name: 'Contact Person'}
    ],
    onCallback,
    contentType
}) => {
    const [activeTab, setActiveTab] = useState(data[0]);
    const [activeClass, setActiveClass] = useState(null);

    useEffect(() => {
        // onCallback(activeTab);
    }, [activeTab, onCallback]);

    useEffect(() => {
        switch(contentType) {
            case 'View':
                setActiveClass('text-[#62C654] border-b-4 border-[#62C654]');
            break;
            case 'Edit':
                setActiveClass('text-[#F6C250] border-b-4 border-[#F6C250]');
            break;
            case 'CREATE':
                setActiveClass('text-[#66B6FF] border-b-4 border-[#66B6FF]');
            break;
            default:
                break;
        }
    }, [contentType]);
    return (
        <div className="flex items-center gap-4">
            {
                data.map(value => {
                    return (
                        <button 
                            key={value.id}
                            className={`text-base font-semibold ${activeTab.name === value.name ? activeClass : 'text-[#9A9A9A]'}`}
                            onClick={() => setActiveTab(value)}
                        >
                            {value.name}
                        </button>
                    )
                })
            }
        </div>
    )
}