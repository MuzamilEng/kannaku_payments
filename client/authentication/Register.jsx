import React, { useEffect, useState } from "react";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Grid } from "@material-ui/core";
import { useRouter } from 'next/router';
import { Card } from "react-bootstrap";
import images from "./Images";
import RegisterForm1 from "./RegisterForm1";
import RegisterForm2 from "./RegisterForm2";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    type: "",
  });

  //Proceed to next step
  // const nextStep = () => {
  //   const { step } = values;
  //   setValues({ ...values, step: step + 1 });
  // };

  // // Go back to previous step
  // const prevStep = () => {
  //   const { step } = values;
  //   setValues({ ...values, step: step - 1 });
  // };

  // const [values, setValues] = useState({username:"", phone: "", email: "", password:""})

  const submitForm = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const data = {
        username,
        phone,
        password,
        email,
      };

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/api/v1/auth/signup', requestOptions);
      const result = await response.json();
      console.log(response.status, "whats the result status");
      if (response?.status === 200 || 201) {
        router.push("/login");
      }
      console.log(result, "whats the result");
    } catch (error) {
      console.log('error', error);
    }
    setUsername('')
    setEmail('')
    setPhone('')
    setPassword('')
  };;

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const mod = document.querySelector("#register-modal");
    // mod?.modal({ show: true });
    console.log(mod);
  }, []);
  const nameRegex = /^[A-Za-z ]{2,50}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^[0-9 ()-]{8,15}$/;


  // Validation function
  const validateInput = (input, regex) => {
    if (regex instanceof RegExp) {
      return regex.test(input) || input === '';
    }
    return true; // Return true for non-regex values
  };


  const { step } = values;
  return (
    <>
      <Grid container>
        <Grid item xs={2} md={8}>
          <div
            className="imgslider"
            style={{ paddingLeft: "2rem", marginTop: "4.5rem" }}
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
              marginTop: "3rem",
            }}
          >
            {/* register from */}
            <div className="login-wrapper" style={{ paddingTop: "0" }}>
              <div>
                <div className="loginbox">
                  <div className="login-right">
                    <div className="login-right-wrap">
                      <h1>Adventure starts here</h1>
                      <p className="account-subtitle">
                        Making app management easy and fun!
                      </p>

                      {/* Form */}
                      <form>
                        <div className="form-group">
                          <label className="form-control-label">Name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter User Name"
                            value={username}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (validateInput(value, username)) {
                                setUsername(value);
                              }
                            }}
                          />
                          {/* Display an error message if the email is invalid */}
                          {!validateInput(username, nameRegex) && username !== '' && (
                            <span className="error-message text-red-600">Invalid name</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-control-label">Email Address</label>
                          <input
                            className="form-control"
                            type="email"
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
                          <label className="form-control-label">Password</label>
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (validateInput(value, password)) {
                                setPassword(value);
                              }
                            }}
                          />
                          {!validateInput(password, passwordRegex) && password !== '' && (
                            <span className="error-message text-red-600">Invalid password. must contain at least 8 characters and a number and a special character </span>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-control-label">Phone Number</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter your Phone Number"
                            value={phone}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (validateInput(value, phone)) {
                                setPhone(value);
                              }
                            }}
                          />
                          {!validateInput(phone, phoneRegex) && phone !== '' && (
                            <span className="error-message text-red-600">Invalid phone number</span>
                          )}
                        </div>
                        {/* <div className="form-group">
                          <label
                            htmlFor="customer"
                            className="mr-4"
                            style={{ marginRight: "1rem" }}
                          >
                            <input
                              type="radio"
                              name="customer"
                              id="customer"
                              className="mr-2"
                              value="CUSTOMERS"
                              checked={values.type === "CUSTOMERS"}
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  type: e.target.value,
                                });
                              }}
                            />
                            Customer
                          </label>
                          <label htmlFor="service" className="mr-3">
                            <input
                              type="radio"
                              name="service"
                              id="service"
                              className="mr-2"
                              value="MERCHANTS"
                              checked={values.type === "MERCHANTS"}
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  type: e.target.value,
                                });
                              }}
                            // onClick={nextStep}
                            />
                            Service Provider/Merchant
                          </label>
                        </div> */}
                        <div className="form-group mb-0">
                          <button
                            className="btn btn-lg btn-block btn-primary w-100"
                            onClick={submitForm}
                            type="button"
                          >
                            Sign up
                          </button>
                        </div>
                      </form>
                      <div className="text-center dont-have" onClick={submitForm}>
                        Already have an account?{" "}
                        <Link href="/login">Sign in instead</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default Register;
