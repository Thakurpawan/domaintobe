import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = (e) => {
        document.getElementById('errorlogin').style.display = 'none';
        setEmail(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        axios.post('https://domaintobesocial.com/domaintobestart/sendemailforget', formData)
            .then((res) => {
                if (res.data.status === 'success') {
                    setSuccessMessage('Forget Password Email Sent Successfully');
                } else {
                    setError(res.data.message);
                }
            })
            .catch((error) => {
                console.log('Error:', error);
                alert('Something Went Wrong');
            });
    };

    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            document.getElementsByName('submitform')[0].type = 'submit';
        }
    };

    return (
        <section className="loginpage">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="imglogin">
                            <img src="images/loginimg.png" alt="images" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right_login" style={{ backgroundImage: `url(images/loginbg.jpg)` }}>
                            <div className="lgn">
                                <h3>Forgot Password</h3>
                                <p>Please enter your email address.</p>
                                {error && <div className="alert alert-danger" id="errorlogin">{error}</div>}
                                {successMessage && <div className="alert alert-success" id="successlogin">{successMessage}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" value={email} onChange={handleEmailChange} onKeyPress={handleKeypress} />
                                    </div>
                                    <button name="submitform" className="btn" type="submit">Send</button>
                                </form>
                                <h6>Don’t have an Account? <Link to="/Signup">Sign up</Link></h6>
                                <h6><Link to="/">Login</Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Forget;
