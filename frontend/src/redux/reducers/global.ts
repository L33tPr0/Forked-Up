import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
    isUserDropdownOpen: boolean;
}

const initialState: InitialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: true,
    isUserDropdownOpen: false,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (
            state: InitialStateTypes,
            action: PayloadAction<boolean>
        ): void => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (
            state: InitialStateTypes,
            action: PayloadAction<boolean>
        ): void => {
            state.isDarkMode = action.payload;
        },
        setIsUserDropdownOpen: (
            state: InitialStateTypes,
            action: PayloadAction<boolean>
        ): void => {
            state.isUserDropdownOpen = action.payload;
        },
    },
});

export const { setIsDarkMode, setIsSidebarCollapsed, setIsUserDropdownOpen } =
    globalSlice.actions;

export default globalSlice.reducer;
