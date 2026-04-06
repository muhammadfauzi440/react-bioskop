import { Routes, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
export default function Main() {
    return (
        <main className='container mx-auto p-4  mt-6 grow w-full max-w-7xl'>
            <Routes>
                <Route path="/" element= {
                    <div className='text-center mt-32 animate-pulse'>
                        <h1 className='text-4xl font-bold text-emerald-400 mb-4'>Selamat datang di React Bioskop</h1>
                        <p className='text-lg text-slate-400'>Sedang memuat data . . .</p>
                    </div>
                } />

                <Route path='/search' element = {
                    <div className='text-center mt-32'>
                        <h2 className='text-3xl font-bold text-amber-400 mb-4'>Halaman Pencarian <FontAwesomeIcon icon={faSearch} className='text-2xl'/></h2>
                    </div>
                } />

                <Route path='/movie/:id' element= {
                    <div className='text-center mt-32'>
                        <h2 className='text-3xl font-bold text-blue-400'>Detail Film <FontAwesomeIcon icon={faInfoCircle} className='text-2xl'/></h2>
                    </div>
                } />
            </Routes>
        </main>
    )
}