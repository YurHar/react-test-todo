/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useDeBounce, { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPlanets, setPage } from "../features/planets/planetSlice";
import Search from "./Search";

const PlanetList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { planets, page, totalPages, loading, error, searchQuery } = useAppSelector(
        (state) => state.planets
    );

    
    const [query, setQuery] = useState(searchQuery);
    const debouncedQuery = useDeBounce(query, 700);

    useEffect(() => {
      dispatch(fetchPlanets({ page, searchQuery: debouncedQuery }));
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
          <h1>Planets</h1>
          <Search query={query} setQuery={setQuery} />
          {loading ? (
    <div>Loading...</div>
) : error ? (
    <div>{error}</div>
) : (
  <>
          <div>
            {planets.map((planet: any) => (
              <div key={planet.name} className="user-card">
                <h3>{planet.name}</h3>
                <p>Climate: {planet.climate}</p>
                <p>Diameter: {planet.diameter}</p>
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

export default PlanetList;