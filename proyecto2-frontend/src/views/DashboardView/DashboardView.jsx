import React from "react";
import MoviesList from "../../components/moviesList/MoviesList";
import { useSelector } from 'react-redux';
import Header from "../../components/header/Header";

const DashboardView = () => {
    const MOVIES = useSelector(state => state.movies);
    return(
        <div className="dashboard-view-container">
            <Header title='Películas Dispobibles' />
            {
                MOVIES.loading ? <h1>Cargando...</h1> : <MoviesList list={MOVIES.movies} filter='all'/>
            }
        </div>
    );
};

export default DashboardView;