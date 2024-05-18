import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    users: unknown[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: UserState = {
    users: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    searchQuery: "",
};

const fetchUsers = createAsyncThunk("users/fetchUsers", async ({ page, searchQuery }: { page: number, searchQuery: string }) => {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}&search=${searchQuery}`);
    return response.data;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
            state.page = 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.results;
            state.totalPages = Math.ceil(action.payload.count / 10);
        });

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    },
});

export const { setPage, setSearchQuery } = userSlice.actions;

export { fetchUsers };

export default userSlice.reducer;