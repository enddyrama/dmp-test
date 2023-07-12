import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLogin } from '../../Pages/Public';

const RouterPublic = ()=>{
    return(
        <Routes>
            <Route path='/' element={<PageLogin/>} />
        </Routes>
    )
};


export default RouterPublic;