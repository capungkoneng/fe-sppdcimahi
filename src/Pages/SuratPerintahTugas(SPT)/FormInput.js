import { Button, InputSelect, SectionForm, TextArea, TextInput, WrapperForm } from "Components"

export const FormInput = () => {
    return (
        <WrapperForm
            title="Tambah Data SPT"
        >
            <TextInput 
                withLabel
                label="Nomor SPT"
                placeholder="Nomor SPT"
            />

            <div className="grid md:grid-cols-3 gap-4 mt-4">
                <InputSelect 
                    withLabel
                    label="Nomor Dasar SPT"
                />

                <InputSelect 
                    withLabel
                    label="Tujuan Provinsi"
                />

                <InputSelect 
                    withLabel
                    label="Kota"
                />
            </div>

            <div className="mt-4">
                <TextArea
                    withLabel
                    label="Keperluan"
                    placeholder="Keperluan"
                />
            </div>

            <div className="mt-8">
                <InputSelect 
                    withLabel
                    label="Berkendara"
                />

                <SectionForm
                    column="4"
                    gap="4"
                    className="mt-4"
                >
                    <TextInput 
                        withLabel
                        label="Tgl Berangkat"
                        placeholder="Tgl Berangkat"
                    />
                    <TextInput 
                        withLabel
                        label="Tgl Mulai"
                        placeholder="Tgl Mulai"
                    />
                    <TextInput 
                        withLabel
                        label="Tgl Selesai"
                        placeholder="Tgl Selesai"
                    />
                    <TextInput 
                        withLabel
                        label="Tahun Anggaran"
                        placeholder="Tahun Anggaran"
                    />
                </SectionForm>

                <div className="mt-4">
                    <TextArea 
                        withLabel
                        label="Keterangan"
                        placeholder="Keterangan"
                    />
                </div>
            </div>

            <div className="mt-10 flex pb-10 md:pb-0 lg:pb-0 justify-center md:justify-end lg:justify-end">
                <Button className="w-full md:w-60 lg:w-60" backgroundColor="bg-orange-500">Simpan</Button>
            </div>
        </WrapperForm>
    )
}