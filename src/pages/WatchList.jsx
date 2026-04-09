import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WatchList() {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("watchList")) || [];
        setWatchList(data);
    }, []);

    return (
        <div>
            <h1>Daftar tontonan saya</h1>

            {watchList.length === 0 ? (
                <p>Belum ada film yang kamu tambahkan ke favorit</p>
            ) : (
                <div>
                    {watchList.map((movie) => (
                        <div key={movie.id}>
                            <img 
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            />
                            <h2>
                                {movie.title}
                            </h2>
                            <p>
                                Rating: {movie.vote_average.toFixed(1)}
                            </p>
                            <Link to={`/movie/${movie.id}`}>Lihat detail</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
