import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function MovieDetail() {
    const { id } = useParams();

    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
                Detail Film <FontAwesomeIcon icon={faInfoCircle}/> 
            </h2>
            <p className="text-slate-400">
                detail untuk Film: <span className="font-bold text-white">{id}</span>
            </p>
        </div>
    )
}