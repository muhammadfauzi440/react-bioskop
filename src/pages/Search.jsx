import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Search() {
    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
            Halaman Pencarian <FontAwesomeIcon icon={faSearch}/>
            </h2>
            <p className="text-slate-400 animate-pulse">
                Coming Soon . . . 
            </p>
        </div>
    )
}