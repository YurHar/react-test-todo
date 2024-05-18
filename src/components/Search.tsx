/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface SearchProps {
    query: string;
    setQuery: any;
}

const Search: React.FC<SearchProps> = React.memo(({ query, setQuery }) => {
    return (
        <div className="search">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
            />
        </div>
    );
});

export default Search;
