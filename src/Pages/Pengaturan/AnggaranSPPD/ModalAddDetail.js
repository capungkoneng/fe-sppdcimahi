import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { TextInput, TextArea } from "Components";
import { Form, Formik } from "formik";

export const ModalAddDetail = ({
    isOpen = false,
    onSubmitDetail = () => { },
    index = 0,
    onCloseModal
}) => {
    const [open, setOpen] = useState(false);
    const [dataDetailAnggaran, setDataListDetailAnggaran] = useState({
        judul: "",
        keperluan: "",
        jumlah_peserta: "",
        jenis: "",
        jumlah: "",
        grandtotal: "",
        index: ""
    })

    useEffect(() => {
        setDataListDetailAnggaran({
            judul: "",
            keperluan: "",
            jumlah_peserta: "",
            jenis: "",
            jumlah: "",
            grandtotal: "",
            index: index
        })
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative w-full" onClose={() => onCloseModal()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black z-40 bg-opacity-25 w-full h-screen" />
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
                                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                                            </svg>
                                        </div>
                                        <Dialog.Title
                                            as="h4"
                                            className="text-base font-bold leading-6 text-white"
                                        >
                                            Tambah Detail Biaya Anggaran
                                        </Dialog.Title>
                                    </div>

                                    <button onClick={() => onCloseModal()} className="text-white text-sm font-semibold">
                                        Tutup
                                    </button>
                                </div>

                                <Formik
                                    initialValues={dataDetailAnggaran}
                                    enableReinitialize={true}
                                    onSubmit={value => {onSubmitDetail(value)}}
                                >
                                    {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => (
                                        <div className="p-4">
                                            <Form>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div>
                                                        <TextArea
                                                            id="keperluan"
                                                            name="keperluan"
                                                            withLabel
                                                            label="Keperluan"
                                                            placeholder="Keperluan"
                                                            value={values.keperluan}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <TextInput
                                                            type="number"
                                                            id="jumlah_peserta"
                                                            name="jumlah_peserta"
                                                            withLabel
                                                            label="Jumlah"
                                                            placeholder="Jumlah"
                                                            value={values.jumlah_peserta}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextInput
                                                            id="jenis"
                                                            name="jenis"
                                                            withLabel
                                                            label="Jenis"
                                                            placeholder="Orang / Barang"
                                                            value={values.jenis}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 mt-3">
                                                    <div>
                                                        <TextInput
                                                            type="number"
                                                            id="total_anggaran"
                                                            name="jumlah"
                                                            withLabel
                                                            label="Total Anggaran"
                                                            placeholder="Total Anggaran"
                                                            value={values.jumlah}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-6 mb-4 mr-3 flex justify-end">
                                                    <div className="flex gap-2 items-center">
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                                            onClick={() => { handleSubmit() }}
                                                        >
                                                            Tambah Detail Biaya Anggaran
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                </Formik>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
