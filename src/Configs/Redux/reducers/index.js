import { createSlice } from "@reduxjs/toolkit";
import { ContentTypeAction } from "../actions/ContentTypeAction";
import { ListProvinceAction } from "../actions/ListProvinceAction";
import { LoginAction } from "../actions/LoginAction";
import { SelectedIdAction } from "../actions/SelectedIdAction";
import { UsernameAction } from "../actions/UsernameActions";

const initialState = {
    isAuthenticated: false,
    username: null,
    contentType: 'View',
    selectedId: null,
    listProvince: []
};

export const RootSlice = createSlice({
    name: 'rootSlice',
    initialState,
    reducers: {
        setAuth: LoginAction,
        setUsername: UsernameAction,
        setContentType: ContentTypeAction,
        setSelectedId: SelectedIdAction,
        setListProvince: ListProvinceAction 
    }
});

export const { 
    setAuth,
    setUsername,
    setContentType,
    setSelectedId,
    setListProvince
} = RootSlice.actions;
export default RootSlice.reducer;