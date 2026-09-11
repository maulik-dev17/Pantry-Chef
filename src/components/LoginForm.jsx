import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onSwitch }) {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })


    useEffect(() => {
        const userToken = localStorage.getItem("userToken");

        console.log(userToken);


        if (!userToken) {
            navigate("/auth")
        }
        else {
            async function verifyUser() {
                let response = await fetch('https://dummyjson-clone-server.vercel.app/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + userToken
                    }
                })

                let result = await response.json();

                console.log(result);

                if (result.username) {
                    navigate("/dashboard")
                }
            }

            verifyUser();
        }
    }, [])

    function handleChange(e) {

        // console.log(e.target.name);
        // console.log(e.target.value);

        let { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleLogin(e) {
        e.preventDefault();

        // console.log(formData);

        const response = await fetch("https://dummyjson-clone-server.vercel.app/api/auth/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json();

        console.log(result);

        if (result) {
            localStorage.setItem("userToken", result.token);

            setTimeout(() => {
                navigate("/dashboard")
            }, 1500)
        }
    }


    return (
        <div className="form-container">

            <h1>
                Welcome back!
            </h1>

            <p className="form-subtitle">
                Enter your login details
            </p>

            <form onSubmit={handleLogin}>

                <div className="input-group">
                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        name="username"
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        name="password"
                    />
                </div>

                <div className="form-options">

                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>

                    <button type="button">
                        Forgot password?
                    </button>

                </div>

                <button
                    type="submit"
                    className="primary-button"
                >
                    Login
                </button>

            </form>

            <div className="divider">
                <span />
                <p>Or</p>
                <span />
            </div>

            <div className="social-buttons">

                <button type="button">
                    <b>G</b>
                    Google
                </button>

                <button type="button">
                    <b></b>
                    Apple
                </button>

                <button type="button">
                    <b>X</b>
                    Twitter
                </button>

            </div>

            <div className="switch-account">

                <span>
                    Don't have an account?
                </span>

                <button
                    type="button"
                    onClick={onSwitch}
                >
                    Sign Up
                </button>

            </div>

        </div>
    );
}

export default LoginForm;