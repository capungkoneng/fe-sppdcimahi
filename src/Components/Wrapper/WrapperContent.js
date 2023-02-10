import { TextInput } from "Components/TextInput"
import { useSelector } from "react-redux"

export const WrapperContent = ({children, withSearchInput = false}) => {
    const state = useSelector(state => state.root);
    return (
        <div className="wrapper-content">
            {
                (state.contentType === 'View' || state.contentType === 'Delete') && (
                    <TextInput 
                        placeholder="Cari Data"
                    />
                )
            }

            {children}
        </div>
    )
}