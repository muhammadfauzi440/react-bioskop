import { Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import MovieDetail from '../pages/MovieDetail';
import WatcList from '../pages/WatchList';

export default function Main() {
    return (
        <main className='container mx-auto p-4 mt-6 grow w-full max-w-7xl'>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/search' element={<Search />}/>
                <Route path='/movie/:id' element={<MovieDetail />}/>
                <Route path='/watchlist' element={<WatcList />}/>
            </Routes>
        </main>
    )
}