import { Button, Card, Container } from "react-bootstrap";
import FacebookLogin, { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { useContext, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { GlobalContext } from "../../../Context";
const appId = "824409035494519"

declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: any;
    }
}

const PageLogin = () => {
    const { state, login } = useContext(GlobalContext)
    useEffect(() => {
        // Facebook SDK initialization
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: appId,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v17.0'
            });
        };
        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            const js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/all.js';
            fjs.parentNode?.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    const handleLoginClick = () => {
        try {
            window.FB.login((response: any) => {
                if (response.authResponse) {
                    // User is logged in
                    console.log('User logged in:', response.authResponse);
                } else {
                    // User cancelled login or did not fully authorize
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'public_profile,email' });
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <Container className="mt-4 mb-4" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: `80vh` }}>
            <Card className="text-center" style={{ width: 400 }}>
                <Card.Header>Login</Card.Header>
                <Card.Body className="">
                    <div className="d-grid gap-2">
                        {/* <Button
                            onClick={handleLoginClick}
                            variant="primary" size="lg">
                            Block level button
                        </Button> */}
                        {/* <div className="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="false"></div> */}
                        {/* <FacebookLogin
                            appId={appId}
                            style={{
                                backgroundColor: '#4267b2',
                                color: '#fff',
                                fontSize: '16px',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            onSuccess={(response) => {
                                console.log('Login Success!', response);
                            }}
                            onFail={(error) => {
                                console.log('Login Failed!', error);
                            }}
                            onProfileSuccess={(response) => {
                                console.log('Get Profile Success!', response);
                            }}
                        /> */}
                        <GoogleLogin
                            onSuccess={res => {
                                // console.log(res);
                                login(res.credential)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">enddy.rama@gmail.com</Card.Footer>
            </Card>
        </Container>
    )
}

export default PageLogin;