import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    users: unknown[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    search: string;
}

const initialState: UserState = {
    users: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    search: "",
};

const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { getState }) => {
    const { users: { page, search } } = getState();
    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}&search=${search}`);
    return response.data;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setSearch(state, action) { // Add setSearch reducer
            state.search = action.payload;
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

export const { setPage, setSearch } = userSlice.actions;

export { fetchUsers };

export default userSlice.reducer;