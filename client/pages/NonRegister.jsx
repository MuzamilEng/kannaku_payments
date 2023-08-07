import React, { useState, useContext } from "react";
import Link from "next/link";
import AuthContext, { useGlobalContext } from "../store/authStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import images from "../authentication/Images";

const NonRegister = (props) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const nameRegex = /^[A-Za-z ]{2,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // Validation function
    const validateInput = (input, regex) => {
        if (regex instanceof RegExp) {
            return regex.test(input) || input === '';
        }
        return true; // Return true for non-regex values
    };

    const submitForm = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const data = {
                email,
                name
            };
            // baba@gmail.com  babaA@123
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow',
            };

            const response = await fetch('http://localhost:3000/api/v1/nonRegister/', requestOptions);
            const result = await response.json();
            console.log(result?.username, "success response", result);
            console.log(response, "response login");
            localStorage.setItem('username', result?.name);
            const username = localStorage.getItem('username');
            console.log(username, "login user name");
            if (response.status === 200 || 201) {
                window.location.href = `/`;
            } else {
                alert(result.message);
                window.location.href = "/register";
            }
        } catch (error) {
            console.log('error', error);
        }
        setEmail("")
        setName("")
    };

    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <>
            {/* Main Wrapper */}
            <Grid container>
                <Grid item xs={2} md={8}>
                    <div
                        className="imgslider"
                        style={{ paddingLeft: "2rem", marginTop: "5.5rem" }}
                    >
                        <Slider {...settings}>
                            {images.map((item) => (
                                <div key={item.id}>
                                    <img src={item.src} alt={item.alt} width="100%" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Grid>
                <Grid item xs={10} md={4}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "5.5rem",
                        }}
                    >
                        <Card>
                            <div className="login-wrapper">
                                <div>
                                    {/* <span className="img-fluid logo-dark mb-2">
                            <Image src={Logo} alt="Logo" />
                        </span> */}
                                    <div className="loginbox">
                                        <div className="login-right">
                                            <div className="login-right-wrap">
                                                <h1>Continue</h1>
                                                <p className="account-subtitle">
                                                    No need to register an account!
                                                </p>
                                                <div>
                                                    <div className="form-group">
                                                        <label className="form-control-label">
                                                            Name
                                                        </label>
                                                        <div className="pass-group">
                                                            <input
                                                                id="name"
                                                                type="text"
                                                                className="form-control pass-input relative"
                                                                placeholder="Enter name"
                                                                value={name}
                                                                onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }}
                                                            />

                                                            {/* Display an error message if the email is invalid */}
                                                            {!validateInput(name, nameRegex) && name !== '' && (
                                                                <span className="error-message text-red-600">please enter a valid name </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-control-label">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            value={email}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (validateInput(value, email)) {
                                                                    setEmail(value);
                                                                }
                                                            }}
                                                        />
                                                        {/* Display an error message if the email is invalid */}
                                                        {!validateInput(email, emailRegex) && email !== '' && (
                                                            <span className="error-message text-red-600">Invalid email address</span>
                                                        )}
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="custom-control-input"
                                                                        id="cb1"
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="cb1"
                                                                    >
                                                                        Remember me
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 text-end">
                                                                <Link href="/forgot-password">
                                                                    <a className="forgot-link">
                                                                        Forgot Password ?
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn btn-lg btn-block btn-primary w-100"
                                                        type="submit"
                                                        onClick={submitForm}
                                                    >
                                                        Continue
                                                    </button>
                                                    <div className="text-center dont-have">
                                                        Want to join as a costumer?
                                                        <Link href="/register">Register</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
export default NonRegister;
