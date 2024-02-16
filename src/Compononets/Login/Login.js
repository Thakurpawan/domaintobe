import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(undefined);
  const [inputPassword, setInputPassword] = useState("password");
  const [icon, setIcon] = useState("fa fa-eye");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.getElementById("loadingicon").style.display = "block";
    axios.get("https://domaintobesocial.com/domaintobestart/getmode").then((res) => {
      console.log("res", res);
      if (res.data.message && res.data.message.mode === "false") {
        document.getElementById("loadingicon").style.display = "none";
        setPage(false);
      } else {
        setPage(true);
      }
    });

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("id")) {
      const formData = new FormData();
      formData.append("id", queryParams.get("id"));
      axios
        .post("https://domaintobesocial.com/domaintobestart/verifyemail", formData)
        .then((res) => {
          if (res.data.message === "success") {
            document.getElementById("successlogin").style.display = "block";
            setTimeout(function () {
              document.getElementById("successlogin").style.display = "none";
            }, 3000);
          } else {
            setErrorMessage(res.data.message);
            setTimeout(function () {
              document.getElementById("errorlogin").style.display = "none";
            }, 2000);
          }
        })
        .catch((error) => {
          alert("Error in request");
        });
    }
  }, []);

  const handleEmailChange = (e) => {
    document.getElementById("errorlogin").style.display = "none";
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    document.getElementById("errorlogin").style.display = "none";
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://domaintobesocial.com/domaintobestart/loginapi", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "login") {
          let expirationDate = new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000
          );
          let newValue = {
            value: res.data.message,
            role: res.data.role,
            expirationDate: expirationDate.toISOString(),
          };
          window.localStorage.setItem("user", JSON.stringify(newValue));
          window.location = "/userdashboard";
        } else {
          setErrorMessage(res.data.message);
        }
      })
      .catch((error) => {
        console.log("errror", error);
        console.log(error.message);
      });
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      document.getElementsByName("submitform")[0].type = "submit";
    }
  };

  const changeText = () => {
    if (inputPassword === "password") {
      setInputPassword("text");
      setIcon("fa fa-eye-slash");
    } else {
      setInputPassword("password");
      setIcon("fa fa-eye");
    }
  };

  return (
    <>
      {" "}
      <>
        <div
          className="loadingicon"
          id="loadingicon"
          style={{ display: "none" }}
        >
          <img src="../../images/loading.gif" />
        </div>
        {page == true ? (
          <div class="commingsoon text-center">
            <div class="commingin">
              <img src="../../images/loginimg.png" alt="images" />
              <h3 class="mt-3">Coming Soon</h3>
            </div>
          </div>
        ) : (
          <section className="loginpage">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="imglogin">
                    <img src="../../images/loginimg.png" alt="images" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="right_login"
                    style={{ backgroundImage: `url("../../images/loginbg.jpg")` }}
                  >
                    <div className="lgn">
                      <h3>Login</h3>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                      <div className="alert alert-danger" id="errorlogin"></div>
                      <div className="alert alert-danger" id="errorlogin"></div>
                      <div className="alert alert-success" id="successlogin">
                        Successfully verified
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            onKeyPress={handleKeypress}
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type={inputPassword}
                            className="form-control"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            onKeyPress={handleKeypress}
                          />
                          <i
                            class={icon}
                            onClick={changeText}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <button name="submitform" className="btn" type="submit">
                          Login
                        </button>
                      </form>
                      <h6>
                        Don’t have an Account? <Link to="/Signup">Sign up</Link>
                      </h6>
                      <h6>
                        <Link to="/Forget">Forget Password?</Link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    </>
  );
};

export default Login;
