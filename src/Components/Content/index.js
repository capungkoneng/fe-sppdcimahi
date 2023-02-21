import { useEffect, useState } from "react"
import { Button } from "Components/Button"
import { Pagination } from "Components/Pagination"
import { ContentData } from "./data"
import { ModalContent, ModalDelete } from "Components/Modal"
import { setContentType, setSelectedId } from "Configs/Redux/reducers"
import { useDispatch } from "react-redux"
import { Table } from "Components/Table"

export const Content = ({
    content,
    data = [],
    children,
    listTabData = [],
    onCallback,
    onSubmit,
    onDeleteData,
    onCloseModal,
    currentPage = 1,
    onChangePage,
    totalCount,
    listContentTab = [],
    renderContent = () => {},
    statusModal = {
        contentType: null,
        value: null,
        status: false,
    }
}) => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isOpenModalContent, setIsOpenModalContent] = useState({
        content: null,
        contentType: null,
        status: false
    });

    useEffect(() => {
        setIsOpenModalContent(statusModal);
        setSelectedData(statusModal.value);
    }, [statusModal]);

    const onResetStateModalContent = () => {
        onCloseModal(true);
        dispatch(setContentType(null));
        setIsOpenModalContent({
            content: null,
            contentType: null,
            status: false,
        });
    }

    const handleActionContent = (type, value) => {
        dispatch(setContentType(type));
        switch (type) {
            case 'View':
                setContentType('View');
                setSelectedData(value);
                
                dispatch(setSelectedId(value.id));
                setIsOpenModalContent({
                    content: content,
                    contentType: type,
                    status: true,
                });
                break;
            case 'Edit':
                setContentType('Edit');
                
                dispatch(setSelectedId(value.id));
                setIsOpenModalContent({
                    content: content,
                    contentType: type,
                    status: true,
                });
                break;
            case 'Delete':
                setSelectedData(value);
                setIsOpenModal(true);
                break;
            default:
                break;
        }
    };

    const handleActionButton = (type) => {
        switch (type) {
            case 'PRINTER':
                console.log('Do Something');
                break;
            case 'FILTER':
                console.log('Do Something');
                break;
            case 'CREATE':
                dispatch(setContentType('Add'));
                setIsOpenModalContent({
                    content: content,
                    contentType: type,
                    status: true,
                });
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="bg-white w-full wrapper-shadow p-5 mt-[37px]">
                <div className="flex flex-wrap lg:flex-nowrap md:flex-nowrap">
                    <div className="relative w-full mr-2">
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" className="py-[16px] w-full pl-10 p-2.5 bg-[#F5F6FA] rounded-full border-none outline-[#3F7459]" placeholder={`Search ${content}`} required />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap md:flex-nowrap mt-4 lg:mt-0 md:mt-0">
                        {
                            ContentData.map(value => {
                                return (
                                    <Button
                                        key={value.id}
                                        backgroundColor={value.backgroundColor}
                                        color={value.color}
                                        className={value.className}
                                        text={value.actionType === 'CREATE' ? `New ${content}` : value.name}
                                        withIcon={value.withIcon}
                                        icon={value.icon}
                                        onClick={() => handleActionButton(value.actionType)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>


                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <Table
                                listLabel={listContentTab}
                            >
                                {renderContent(data)}
                            </Table>
                        {/* <div className="overflow-hidden">
                            <table className="min-w-full">
                            <thead>
                                <tr>
                                    {
                                        listContentTab.length === 0 ? ListContentTable.Label.map(value => {
                                            return (
                                                <th key={value.id} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {value.name}
                                                </th>
                                            )
                                        }) : listContentTab.map(value => {
                                            return (
                                                <th key={value.id} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {value.name}
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length === 0 ? null :
                                    data.map((value, index) => {
                                        return (
                                            <tr key={value.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>

                                                <td className="text-sm text-[#202020] font-bold px-6 py-4 whitespace-nowrap">
                                                    {
                                                        value.sup_name ? value.sup_name 
                                                        : value.nama ? value.nama 
                                                        : value.nik
                                                    }
                                                </td>
                                                
                                                <td className="text-sm text-[#202020] font-bold px-6 py-4 whitespace-nowrap">
                                                    {
                                                        value.contact_person_sup ? value.contact_person_sup 
                                                        : value?.cuskontak ? value?.cuskontak[0]?.contact_person 
                                                        : value.nama_karyawan
                                                    }
                                                </td>
                                                
                                                <td className="text-sm text-[#202020] font-bold px-6 py-4 whitespace-nowrap">
                                                    {
                                                        value.jenis_kelamin ? value.jenis_kelamin 
                                                        : value.phone ? value.phone 
                                                        : value?.cuskontak[0].contact_person_telp ? value?.cuskontak[0]?.contact_person_telp : ''
                                                    }
                                                </td>
                                                
                                                <td className="text-sm text-[#202020] font-bold px-6 py-4 whitespace-nowrap">
                                                    {value.departemen ? value.departemen?.namadep : value.email}
                                                </td>
                                                
                                                {
                                                    content === 'Employee' ? (
                                                        <>
                                                            <td className="text-sm text-[#202020] font-bold px-6 py-4 whitespace-nowrap">
                                                                {value.phone}
                                                            </td>
                                                        </>
                                                    ) : null
                                                }

                                                <td className="flex gap-2 text-sm text-[#202020] font-bold px-6 py-4 whitespace-nowrap">
                                                    {
                                                        ListContentTable.Action.map(result => {
                                                            return (
                                                                <button onClick={() => handleActionContent(result.type, value)} key={result.type} className={`py-[6px] px-[10px] rounded-[5px] ${result.color}`}>
                                                                    {result.icon}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {
                totalCount <= 10 ? null  : 
                <Pagination 
                    onChangePage={onChangePage}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    pageSize={10}
                />
            }
            <ModalDelete 
                isOpen={isOpenModalContent.contentType === 'Delete' && isOpenModalContent.status ? true : false} 
                closeModal={() => setIsOpenModalContent({
                    status: false,
                    content: null,
                    contentType: null,
                })}
                onDeleteData={() => onDeleteData(selectedData)}
                name={selectedData?.sup_name ? selectedData?.sup_name : selectedData?.nama ? selectedData?.nama : selectedData?.nama_karyawan ? selectedData?.nama_karyawan : selectedData?.equip_nama}
            />
            <ModalContent 
                isOpen={isOpenModalContent.contentType !== 'Delete' && isOpenModalContent.status} 
                closeModal={() => onResetStateModalContent()}
                content={content}
                contentType={isOpenModalContent.contentType}
                listTabData={listTabData}
                onCallback={(data) => onCallback(data)}
                onSubmit={() => {
                    onSubmit();
                    onResetStateModalContent();
                }}
            >
                {children}
            </ModalContent>
        </>
    )
}