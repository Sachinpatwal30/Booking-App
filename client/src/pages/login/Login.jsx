import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import "./login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate(1);
        } catch (err) {

            console.log("inside failure & error is ",err.response.data.errorMessage);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });    
        }
    };


    return (
        <div className="login">

            <div className="lContainer">
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleClick} className="lButton">
                    Login
                </button>
                {error && <span style={{color:"red"}}>{error.errorMessage}</span>}
            </div>
        </div>
    );
};

export default Login;
