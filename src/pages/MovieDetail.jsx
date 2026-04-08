import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt, faClock, faPlay, faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";

export default function MovieDetail() {
    const { id } = useParams();
    const [ detailFilm, setDetailFilm] = useState(null);
    const [ trailer, setTrailer] = useState(null);
    const [ loading, setLoading] = useState(true);

    useEffect(() => { 
        const ambilDetailFilm = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}`,
                    {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: "en-EN",
                            append_to_response: "videos",
                            include_video_language: "id,en"
                        }
                    }
                );

                setDetailFilm(response.data);

                const videoTrailer = response.data.videos?.results?.find(
                    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );

                if (videoTrailer) {
                    setTrailer(videoTrailer.key);
                }
            } catch (error) {
                console.error("Gagal memuat data", error);
            } finally {
                setLoading(false);
            }
        };

        ambilDetailFilm();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center mt-32 text-slate-400">
                <FontAwesomeIcon icon={faSpinner} spin className="text-5xl mb-4 text-emerald-400" />
                <h2 className="text-2xl font-bold animate-pulse">
                    Menyiapkan Bioskop . . .
                </h2>
            </div>
        )
    }

    if (!detailFilm) {
        return (
            <div className="text-center mt-32 text-slate-400">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Waduh!</h2>
                <p>Film yang kamu cari tidak ditemukan atau server sedang sibuk</p>
                <Link to="/" className="inline-block mt-6 bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-full font-bold text-white transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full pb-10">
            <Link to={-1} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg w-fit ml-4">
                <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform"/>
                <span className="group-hover:scale-105 transition-transform font-semibold">Kembali</span>
            </Link>

            <div className="relative  w-full h-75 md:h-100 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 mb-8 border border-slate-700">
                {detailFilm.backdrop_path ? (
                    <img
                    src={`https://image.tmdb.org/t/p/original${detailFilm.backdrop_path}`}
                    alt="Backdrop"
                    className="w-full h-full object-cover opacity-30"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800"></div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute top-0 left-0  p-8 w-full hidden md:flex justify-end gap-6 text-sm font-bold text-slate-600">
                    {detailFilm.runtime > 0 && (
                        <span className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                            <FontAwesomeIcon icon={faClock} className="text-blue-400"/> {detailFilm.runtime} Menit
                        </span>
                    )}

                    {detailFilm.release_date && (
                        <span className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-amber-400"/> {detailFilm.release_date}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:-mt-32 relative z-10 px-4">
                <div className="shrink-0 mx-auto md:mx-0 w-50 md:w-75">
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/30 border-4 border-slate-800 bg-slate-800 aspect-2/3">
                        {detailFilm.poster_path ? (
                            <img
                            src={`https://image.tmdb.org/t/p/w500${detailFilm.poster_path}`}
                            alt={detailFilm.title}
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">Tidak ada poster</div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col grow">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                        {detailFilm.title}
                    </h1>
                    {detailFilm.tagline && (
                        <p className="text-xl text-emerald-400 font-medium italic mb-6">
                            "{detailFilm.tagline}"
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl font-black text-lg flex items-center gap-2">
                            <FontAwesomeIcon icon={faStar} className="text-amber-400"/> {detailFilm.vote_average.toFixed(1)} <span className="text-sm font-normal text-slate-400">/ 10</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {detailFilm.genres.map((genre) => (
                                <span key={genre.id}
                                className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full text-sm font-bold"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-200 mb-3">Sinposis</h3>
                        <p className="text-slate-300 leading-relaxed text-lg font-medium">{detailFilm.overview}</p>
                    </div>

                    {trailer && (
                        <div className="mt-auto pt-4">
                            <a
                            href={`https://www.youtube.com/watch?v=${trailer}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-900/50"
                            >
                                <FontAwesomeIcon icon={faPlay}/> Tonton trailer 
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}