import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faFire,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [daftarFilm, setDaftarFilm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [kategori, setKategori] = useState("");

  useEffect(() => {
    const ambilDataFilm = async () => {
      try {
        setLoading(true);

        const url =
          kategori === ""
            ? `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/day`
            : `${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie`;

        const response = await axios.get(url, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: "en-US",
            page: page,
            with_genres: kategori !== "" ? kategori : undefined,
          },
        });

        if (page === 1) {
          setDaftarFilm(response.data.results);
        } else {
          setDaftarFilm((dataLama) => [...dataLama, ...response.data.results]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data dari TMDB", error);
        setLoading(false);
      }
    };

    ambilDataFilm();
  }, [page, kategori]);

  const gantiKategori = (idGenre) => {
    setPage(1);
    setKategori(idGenre);
  };

  const arraySkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full">
      <h1 className="capitalize text-3xl font-bold text-emerald-400 mb-8 border-l-4 border-emerald-400 pl-4">
        {kategori === "" ? "sedang trending hari ini" : "daftar film pilihan"}
        <FontAwesomeIcon icon={faFire} className="text-orange-600 ml-2" />
      </h1>

      <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 custom-scrollbar">
        <span className="font-semibold text-slate-400 shrink-0">
          Pilih Kategori:{" "}
        </span>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => gantiKategori("")} 
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Semua
          </button>
          <button onClick={() => gantiKategori("28")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "28" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Action
          </button>
          <button onClick={() => gantiKategori("27")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "27" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Horror
          </button>
          <button onClick={() => gantiKategori("35")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "35" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Komedi
          </button>
          <button onClick={() => gantiKategori("16")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "16" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Animasi
          </button>
          <button onClick={() => gantiKategori("9648")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "9648" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Misteri
          </button>
          <button onClick={() => gantiKategori("10402")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "10402" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Musik
          </button>
          <button onClick={() => gantiKategori("12")}
          className={`px-5 py-2 font-bold rounded-full transition-all duration-300 ${kategori === "12" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30" : "bg-slate-800 text-slate-900 hover:bg-slate-700 border border-slate-700"}`}
          >
          Musik
          </button>
        </div>
      </div>

      <br />

      {loading && page === 1 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {arraySkeleton.map((item) => (
            <div key={item} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col animate-pulse">
              <div className="w-full aspect-2/3 bg-slate-700"></div>

              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-3 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/5"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {daftarFilm.map((film, index) => (
              <Link
                to={`/movie/${film.id}`}
                key={`${film.id}-${index}`}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300 border border-slate-700 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white font-bold bg-emerald-600 px-4 py-2 rounded-full">
                      Lihat Detail <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col grow justify-between gap-2">
                  <h2
                    title={film.title}
                    className="text-lg text-slate-100 font-bold line-clamp-1"
                  >
                    {film.title}
                  </h2>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-emerald-400">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-amber-300"
                      />
                      {film.vote_average.toFixed(1)}
                    </span>
                    <span>{film.release_date?.substring(0, 4)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <br />

          <div className="mt-12 mb-8 flex justify-center">
            <button onClick={() => setPage(page + 1)}
            disabled={loading}
            className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 hover:border-emerald-500 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin duration-500"></span>
                    Memuat Data ...
                </>
              ) : (
                "Muat Lebih Banyak Film"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
