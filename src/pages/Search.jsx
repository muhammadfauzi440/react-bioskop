import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faArrowRight, faStar, faSpinner, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function Search() {
    const [ kataKunci, setKataKunci ] = useState("");
    const [ hasilPencarian, setHasilPencarian] = useState([]);
    const [ loading, setLoading] = useState(false);
    const [ sudahDicari, setSudahDicari] = useState(false);
    const [ page, setPage] = useState(1);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCariFilm = async (event) => {
        event.preventDefault();

        if (kataKunci.trim() === "") return;

        setLoading(true);
        setSudahDicari(true);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_TMDB_BASE_URL}/search/movie`,
                {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_API_KEY,
                        language: "id-ID",
                        query: kataKunci,
                        page: 1
                    },
                }
            );

            setHasilPencarian(response.data.results);
        } catch (error) {
            console.error("Gagal memuat data film: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-emerald-400 mb-8 border-l-4 border-emerald-400 pl-4">
                Cari judul Film <FontAwesomeIcon icon={faSearch} className="text-slate-400 ml-2"/>
            </h1>

            <form onSubmit={handleCariFilm} className="max-w-2xl mx-auto mb-12 flex gap-2">
                <input 
                ref={inputRef}
                type="text"
                placeholder="Ketik judul film yang ingin dicari"
                value={kataKunci}
                onChange={(event) => setKataKunci(event.target.value)}
                className="w-full p-4 rounded-xl bg-slate-800 border-2 border-slate-700 text-slate-100 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all text-lg placeholder:text-slate-500"
                />

                <button
                type="submit"
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-8 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-lg"
                >
                {loading ? <FontAwesomeIcon icon={faSpinner} spin/> : "Cari"}
                </button>
            </form>

            {loading ? (
                <div className="text-center text-slate-400 mt-20">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl mb-4 text-emerald-400" />
                    <p className="text-xl font-bold animate-pulse">Mencari Film . . . </p>
                </div>
            ) : (
                <>
                    {sudahDicari && hasilPencarian.length === 0 && (
                        <div className="text-center text-slate-400 mt-20">
                            <p className="text-xl">Yah, film {kataKunci} tidak ditemukan <FontAwesomeIcon icon={faCircleXmark} className="text-red-600"/> </p>
                            <p className="text-sm mt-2">Coba cari dengan kata kunci lain</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {hasilPencarian.map((film) => (
                            <Link
                            to={`/movie/${film.id}`}
                            key={film.id}
                            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-emerald-500/20 transition-all duration-300 border border-slate-700 flex flex-col group"
                            >
                                <div className="relative overflow-hidden aspect-2/3 bg-slate-700">
                                    {film.poster_path ? (
                                        <img
                                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                        alt={film.title}
                                        className="w-full h-full object-cover"    
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-center p-4">
                                            Tidak ada poster
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="text-slate-900 font-bold bg-emerald-400 px-4 py-2 rounded-full">
                                            Lihat detail <FontAwesomeIcon icon={faArrowRight}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col grow justify-between gap-2">
                                    <h2 title={film.title} className="text-lg text-slate-100 font-bold line-clamp-1">
                                        {film.title}
                                    </h2>
                                    <div className="flex justify-between items-center text-sm font-semibold">
                                        <span>
                                            <FontAwesomeIcon icon={faStar} className="text-amber-300 mr-1"/>
                                            {film.vote_average.toFixed(1)}
                                        </span>
                                        <span>
                                            {film.release_date?.substring(0, 4) || "-"}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}