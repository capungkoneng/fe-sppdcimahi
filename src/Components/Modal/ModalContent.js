import { Dialog, Transition } from '@headlessui/react'
import { Tabs } from 'Components/Tab';
import { Fragment } from 'react'
import { useSelector } from 'react-redux';

export const ModalContent = ({
    isOpen = false,
    closeModal,
    content,
    contentType,
    isDisableButton,
    onSubmit,
    children,
    listTabData = [],
    onCallback
}) => {
    const state = useSelector(state => state.root);
    // const [headerColor, setHeaderColor] = useState('bg-[#66B6FF]');
    // const [iconColor, setIconColor] = useState('text-[#66B6FF]');

    // useEffect(() => {
    //     switch(contentType) {
    //         case 'View':
    //             setHeaderColor('bg-[#62C654]');
    //             setIconColor('#62C654');
    //         break;
    //         case 'Edit':
    //             setHeaderColor('bg-[#F6C250]');
    //             setIconColor('#F6C250');
    //         break;
    //         case 'Add':
    //             setHeaderColor('bg-[#66B6FF]');
    //             setIconColor('#66B6FF');
    //         break;
    //         default:
    //             break;
    //     }
    // }, [isOpen, contentType]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative w-full" onClose={() => closeModal()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black z-20 bg-opacity-25 w-full h-screen" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 overflow-y-auto w-full">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-6xl transform overflow-x-auto rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                <div className={`flex items-center justify-between px-5 py-[10px] bg-[#3F7459]`}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                                        {contentType === 'CREATE' ? (
                                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                                            </svg>
                                        ) : contentType === 'View' ? (
                                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                                            </svg>
                                        ) }
                                        </div>
                                        <Dialog.Title
                                            as="h4"
                                            className="text-base font-bold leading-6 text-white"
                                        >
                                            {contentType === 'CREATE' ? `Tambah ${content}` : contentType === 'View' ? `Data ${content}` : `Edit ${content}` }
                                        </Dialog.Title>
                                    </div>

                                    <button onClick={() => closeModal()} className="text-white text-sm font-semibold">
                                        Tutup
                                    </button>
                                </div>

                                <div className="p-6">
                                    {
                                        state.contentType === 'View' ? children : (
                                            <div className="mt-2">
                                                {/* Content */}
                                                <Tabs 
                                                    data={listTabData}
                                                    onCallback={(data) => onCallback(data)}
                                                    contentType={contentType}
                                                />
                                                {children}
                                            </div>
                                        )
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
