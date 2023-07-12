import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Components';
import RouterPrivate from './private';
import RouterPublic from './public';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GlobalContext } from '../Context';
import { useContext } from 'react';

const AppRouter = () => {
    const { state, login } = useContext(GlobalContext)
    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId="385617021943-f6pph3vfsohpss1p7jcif0evoqrtogs2.apps.googleusercontent.com">
                <div style={{ height: `100vh` }}>
                    <Header />
                    {
                        state.token ?
                            <RouterPrivate />
                            :
                            <RouterPublic />
                    }
                </div>
            </GoogleOAuthProvider>
        </BrowserRouter>
    )
}


export default AppRouter;
