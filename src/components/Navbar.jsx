import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faSearch, faHome, faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md p-4 shadow-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link
          to="/"
          className="text-2xl font-black text-emerald-400 flex items-center gap-3 hover:scale-105 transition-transform tracking-wide"
        >
          <FontAwesomeIcon icon={faFilm} className="text-3xl" />
          <span>
            React<span className="text-white">Bioskop</span>
          </span>
        </Link>

        <div className="flex gap-6 font-semibold text-slate-300">
          <Link
            to="/"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 hover:scale-110"
          >
            <FontAwesomeIcon icon={faHome} /> Beranda
          </Link>
          <Link
          to="watchlist"
          >
            <FontAwesomeIcon icon={faBookmark}/> Watch List
          </Link>
          <Link
            to="/search"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 hover:scale-110 "
          >
            <FontAwesomeIcon icon={faSearch} /> Cari Film
          </Link>
        </div>
      </div>
    </nav>
  );
}
