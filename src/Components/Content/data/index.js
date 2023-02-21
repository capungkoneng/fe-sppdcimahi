export const ContentData = [
    {
        id: 'print',
        name: 'Print',
        backgroundColor: 'bg-white',
        color: 'text-black',
        className: 'wrapper-shadow border hover:bg-gray-100',
        withIcon: true,
        actionType: 'PRINTER',
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
        )
    },
    {
        id: 'filter',
        name: 'Filter',
        backgroundColor: 'bg-white',
        color: 'text-black',
        className: 'wrapper-shadow border hover:bg-gray-100',
        withIcon: true,
        actionType: 'FILTER',
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        )
    },
    {
        id: 'new',
        name: 'New',
        backgroundColor: 'bg-white',
        color: 'text-black',
        className: 'wrapper-shadow border hover:bg-gray-100',
        withIcon: true,
        actionType: 'CREATE',
        icon: (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
        )
    },
];

export const ListContentTable = {
    Label: [
        {id: 1, name: 'No'},
        {id: 2, name: 'Customer Name'},
        {id: 3, name: 'Contact Person'},
        {id: 4, name: 'Phone'},
        {id: 5, name: 'Email'},
        {id: 6, name: 'Action'},
    ],
    Action: [
        {
            id: 1, 
            type: 'View',
            color: 'bg-green-500 hover:bg-green-600',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            )
        },
        {
            id: 2,
            type: 'Edit',
            color: 'bg-yellow-400 hover:bg-yellow-500',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            )
        },
        {
            id: 3, 
            type: 'Delete', 
            color: 'bg-red-400 hover:bg-red-500',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            )
        },
    ]
}