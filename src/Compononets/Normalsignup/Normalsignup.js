import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
function Normalsignup() {
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [input, setInput] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 30)));
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const validate = () => {
        // Your validation logic goes here
        return true; // For demonstration purposes, returning true by default
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            const formData = new FormData();
            formData.append('firstname', input.firstname);
            formData.append('lastname', input.lastname);
            formData.append('username', input.username);
            formData.append('email', input.email);
            formData.append('mobile', input.mobile);
            formData.append('age', input.age);
            formData.append('password', input.password);
            formData.append('referral', input.referral);

            axios.post('https://domaintobesocial.com/domaintobestart/normalsignup', formData)
                .then((res) => {
                    if (res.data.message === 'success') {
                        setSuccessMessage('Account created successfully.');
                        setTimeout(() => { window.location = "/"; }, 3000);
                    } else {
                        setErrorMessage(res.data.message);
                        setTimeout(() => { setErrorMessage(''); }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };
    
    return (
        <div className='in_center in_center_discussion'>
            <section className="loginpage">
                <div className="container">
                    <Link to="/Signup" className="gologin"><img src="/images/loginarrow.png" alt="icon" /></Link>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="imglogin">
                                <img src="/images/loginimg.png" alt="images" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="right_login right_signup" style={{ backgroundImage: `url(/images/signupbg1.jpg)` }}>
                                <h3>Sign up free account</h3>
                                <div className="alert alert-danger" id="errorlogin"></div>
                                <div className="alert alert-success" id="successlogin">Successfully Registered</div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>First Name*</label>
                                                <input type="text" name="firstname" value={input.firstname} onChange={handleChange} className="form-control" autoComplete="off" />
                                                <div className="text-danger">{ errorMessage.firstname}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name*</label>
                                                <input type="text" name="lastname" value={input.lastname} onChange={handleChange} id="lastname" className="form-control" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.lastname}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Username*</label>
                                                <input type="text" name="username" value={input.username} onChange={handleChange} id="username" className="form-control" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.username}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address*</label>
                                                <input type="text" name="email" value={input.email} onChange={handleChange} className="form-control" id="email" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.email}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Mobile Number*</label>
                                                <input type="text" name="mobile" value={input.mobile} onChange={handleChange} className="form-control" id="mobile" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.mobile}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Dob<sup>(dd/MM/yyyy)*</sup></label>
                                                <input type="date" className="form-control" name="age" value={input.age} onChange={handleChange} />
                                                {/* <DatePicker  
                                            selected={  selectedDate }  
                                            onChange={ this.handleDateChange.bind(this) }  
                                            name="startDate"  
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control" id="age" 
                                            /> */}
                                                {/* <input type="text" name="age" value={ input.age} onChange={this.handleChange}  className="form-control" id="age" autocomplete="off"/> */}
                                                <div className="text-danger">{ errorMessage.age}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Create Password*</label>
                                                <input type="password" name="password" value={input.password} onChange={handleChange} className="form-control" id="password" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.password}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Confirm Password*</label>
                                                <input type="password" name="confirm_password" value={input.confirm_password} onChange={handleChange} className="form-control" id="confirm_password" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.confirm_password}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label>Referral Code</label>
                                                <input type="text" name="referral" value={input.referral} onChange={handleChange} className="form-control" id="referral" autocomplete="off" />
                                                <div className="text-danger">{ errorMessage.referral}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn" type="submit">Create Account</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Normalsignup
