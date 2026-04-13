import {
  faArrowRight,
  faBookmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("watchList")) || [];
    setWatchList(data);
  }, []);

  return (
    <div className="w-full pb-10">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8 border-l-4 border-emerald-400 pl-4 flex items-center gap-3">
        <FontAwesomeIcon icon={faBookmark} />
        Daftar tontonan saya
      </h1>

      {watchList.length === 0 ? (
        <div className="text-center text-slate-400 mt-32">
          <p className="text-xl mb-4">
            Belum ada film yang kamu tambahkan ke favorit
          </p>
          <Link
            to="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            Mulai cari film
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchList.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300 border border-slate-700 flex flex-col group"
            >
              <div className="relative overflow-hidden aspect-2/3 bg-slate-700">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-center p-4">
                    Tidak ada poster
                  </div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white bg-emerald-600 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                    Lihat Detail <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col grow justify-between gap-2">
                <h2
                  title={movie.title}
                  className="text-lg text-slate-100 font-bold line-clamp-1"
                >
                  {movie.title}
                </h2>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-emerald-400">
                    <FontAwesomeIcon icon={faStar} className="text-amber-300" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span>
                    {movie.release_date?.substring(0, 4)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
