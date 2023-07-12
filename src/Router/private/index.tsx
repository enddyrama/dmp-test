import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageDetail, PageHome } from '../../Pages/Private';

const RouterPrivate = ()=>{
    return(
        <Routes>
            <Route path='/' element={<PageHome/>} />
            <Route path='/:id' element={<PageDetail/>} />
        </Routes>
    )
};


export default RouterPrivate;