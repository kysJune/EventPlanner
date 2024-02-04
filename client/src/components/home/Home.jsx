import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home  = () =>{
    const navigate = useNavigate();
    const handleLogin = () => {
        console.log("login button clicked");
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div className="home">
            <header>
                <nav>
                    <button onClick = {handleLogin}>login</button>
                    <button onClick = {handleRegister}>register</button>
                </nav>
            </header>
            <h1>Welcome to the Weather App</h1>
            
        </div>
    )
}

export default Home;