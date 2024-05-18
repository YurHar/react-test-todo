import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanetState {
    planets: unknown[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: PlanetState = {
    planets: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    searchQuery: "",
};

const fetchPlanets = createAsyncThunk("planets/fetchPlanets", async ({ page, searchQuery }: { page: number, searchQuery: string }) => {
    const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}&search=${searchQuery}`)

    return response.data;
})

const userSlice = createSlice({
    name: "planets",
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlanets.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchPlanets.fulfilled, (state, action) => {
            state.loading = false;
            state.planets = action.payload.results;
            state.totalPages = Math.ceil(action.payload.count / 10);
        });

        builder.addCase(fetchPlanets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    },
});

export const { setPage } = userSlice.actions;

export { fetchPlanets };

export default userSlice.reducer;