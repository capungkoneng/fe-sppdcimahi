import { Button, HaederContent, MainHeader, WrapperContent } from "Components"
import { useState } from "react"
import { FormInput } from "./FormInput";
import { View } from "./View";

export const Spt = () => {
    const [contentType, setContentType] = useState('View');
    return (
        <main>
            <MainHeader>
                <HaederContent 
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                        </svg>
                    }
                >
                    <div>
                        <h1 className="title">Surat Perintah Tugas(SPT)</h1>
                        {
                            contentType === 'Edit' ? null : (
                                <Button onClick={() => setContentType('Edit')} className="gap-2" backgroundColor="bg-orange-500 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    Tambah
                                </Button>
                            )
                        }
                    </div>
                </HaederContent>
            </MainHeader>

            <WrapperContent withSearchInput={contentType === 'View' ? true : false}>
                {
                    contentType === 'View' ? 
                    <View /> : 
                    <FormInput />
                }
            </WrapperContent>
        </main>
    )
}