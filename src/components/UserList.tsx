/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useDeBounce, { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, setPage } from "../features/users/userSlice";
import Search from "./Search";

const UserList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, page, totalPages, loading, error, searchQuery } = useAppSelector(
        (state) => state.users
    );

    const [query, setQuery] = useState(searchQuery);
    const debouncedQuery = useDeBounce(query, 700);

    useEffect(() => {
        dispatch(fetchUsers({ page, searchQuery: debouncedQuery }));
    }, [dispatch, page, debouncedQuery]);

    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    }

    return (
        <div className="users">
            <h1>Users</h1>
            <Search query={query} setQuery={setQuery} />
            {loading ? (
    <div>Loading...</div>
) : error ? (
    <div>{error}</div>
) : (
    <>
        <div>
            {users.map((user: any) => (
                <div key={user.name} className="user-card">
                    <h3>{user.name}</h3>
                    <p>Height: {user.height}</p>
                    <p>Mass: {user.mass}</p>
                </div>
            ))}
        </div>
        <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
        </button>
        <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
        </button>
    </>
)}
        </div>
    );
}

export default UserList;
