import { Navbar, Container } from "react-bootstrap";
import { GlobalContext } from "../../Context";
import { useContext } from "react";

const Header: React.FC = () => {
    const { state, login, logout } = useContext(GlobalContext)
    return (
        <Navbar variant="primary" style={{ background: "#007bff", color: "white" }}>
            <Navbar.Brand href="/" style={{ marginLeft: 20, color: "white" }}>GitJobs</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text
                    onClick={logout}
                    style={{ marginRight: 20, color: "white", cursor: "pointer" }}>
                    <a style={{ color: "white" }}>Logout</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
