import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [daftarFilm, setDaftarFilm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilDataFilm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/day`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "id-ID",
            },
          },
        );

        setDaftarFilm(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data dari TMDB: ".error);
        setLoading(false);
      }
    };

    ambilDataFilm();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8 border-l-4 border-emerald-400 pl-4">
        Sedang Tren Hari ini{" "}
        <FontAwesomeIcon icon={faFire} className="text-orange-600" />
      </h1>

      {loading ? (
        <div className="text-center animate-pulse text-slate-400 mt-20">
          <p className="text-xl font-bold">Memuat daftar film . . .</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {daftarFilm.map((film) => (
            <Link
              to={`/movie/${film.id}`}
              key={film.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300 border border-slate-700 flex flex-col group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white font-bold bg-emerald-600 px-4 py-2 rounded-full">
                    Lihat Detail <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col grow justify-between gap-2">
              <h2 title={film.title} className="text-lg text-slate-100 font-bold line-clamp-1">
                {film.title}
              </h2>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-emerald-400">
                    <FontAwesomeIcon icon={faStar} className="text-amber-300" />
                    {film.vote_average.toFixed(1)}
                  </span>
                  <span>{film.release_date?.substring(0, 4)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
