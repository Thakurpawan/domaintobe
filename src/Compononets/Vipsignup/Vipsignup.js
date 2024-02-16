import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
function Vipsignup(props) {
    const [formData, setFormData] = useState(new FormData());
    const [planprice, setPlanPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [input, setInput] = useState({});
    const [data, setData] = useState([]);
    const [coupon, setCoupon] = useState('');
    const [state, setState] = useState({
        input: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          mobile: '',
          age: '',
          password: '',
          company: '',
          referral: '',
        },
        coupon_id: '',
        data: [],
        amt: 0,
      });

    const [amt, setAmt] = useState(0);

    useEffect(() => {
        // Fetch plan data
        axios.get('https://domaintobesocial.com/domaintobestart/getplan')
            .then(res => {
                setData(res.data.message);
            })
            .catch(error => {
                console.error('Error fetching plan data:', error);
            });

        // Fetch document data
        axios.get('https://domaintobesocial.com/domaintobestart/fetch_docs')
            .then(res => {
                setAmt(res.data.data.amount);
            })
            .catch(error => {
                console.error('Error fetching document data:', error);
            });
    }, []);
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (validate() && state.data.length > 0 && state.amt > 0) {
        const planprice = state.data.find((x) => x.id === state.input.plan).price;
        setPlanPrice(planprice);
  
        try {
          formData.append('firstname', state.input.firstname);
          formData.append('lastname', state.input.lastname);
          formData.append('username', state.input.username);
          formData.append('email', state.input.email);
          formData.append('mobile', state.input.mobile);
          formData.append('age', state.input.age);
          formData.append('password', state.input.password);
          formData.append('company_name', state.input.company);
          formData.append('coupon', state.coupon_id);
          formData.append('plan', state.input.plan);
          formData.append('ordl', state.amt);
          formData.append('planprice', planprice);
          formData.append('referral', state.input.referral);
  
          const response = await axios.post('https://domaintobesocial.com/domaintobestart/vipsignup', formData);
  
          if (response.data.message === 'success') {
            setFormData(formData);
            setErrorMessage('');
            setSuccessMessage('Successfully Registered');
            if (response.data.repo) {
              setFormData(response.data.repo);
            }
            //setTimeout(function(){ window.location = "/"; }, 3000);
          } else {
            setSuccessMessage('');
            setErrorMessage(response.data.message);
            setTimeout(function () {
              setErrorMessage('');
            }, 2000);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    const [errors, setErrors] = useState({});

    const validate = () => {
      let errors = {};
      let isValid = true;
  
      if (!input["username"]) {
        isValid = false;
        errors["username"] = "Please enter your username.";
      }
  
      if (!input["firstname"]) {
        isValid = false;
        errors["firstname"] = "Please enter your firstname.";
      }
  
      if (!input["lastname"]) {
        isValid = false;
        errors["lastname"] = "Please enter your lastname.";
      }
  
      if (!input["username"]) {
        if(input["username"].length < 6 ){
          isValid = false;
          errors["username"] = "Please enter valid username.";
        }
      }
  
      if (!input["plan"]) {
        isValid = false;
        errors["plan"] = "Please select your plan.";
      }
      if (!input["tc"]) {
        isValid = false;
        errors["tc"] = "Please select your T&C.";
      }
  
      if (!input["mobile"]) {
        isValid = false;
        errors["mobile"] = "Please enter your mobile.";
      }
  
      if (typeof input["mobile"] !== "undefined") {
        const rep = /^\d*$/;
        if(input["mobile"].length < 10 || !rep.test(input["mobile"])){
          isValid = false;
          errors["mobile"] = "Please enter your valid 10 digit mobile.";
        }
      }
  
      if (!input["age"]) {
        isValid = false;
        errors["age"] = "Please enter your age.";
      }
  
      if (!input["company"]) {
        isValid = false;
        errors["company"] = "Please enter company name.";
      }
  
      if(!input['age']) {
        isValid = false;
        errors['age'] = "Please fill the input"
      } else {
        var parts =input["age"].split("-");
        var dtDOB = new Date(parts[2] + "/" + parts[1] + "/" + parts[0]);
        var dtCurrent = new Date();
        if(dtCurrent.getFullYear() - parts[0] < 16 ) {
          isValid = false;
          errors["age"] = "Eligibility minimum 16 years.";
        }
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 16) {
          if (dtCurrent.getMonth() < parts[1]) {
            isValid = false;
            errors["age"] = "Eligibility minimum 16 years.";
          }
          if (dtCurrent.getMonth() == parts[1]) {
            if (dtCurrent.getDate() < parts[0]) {
              isValid = false;
              errors["age"] = "Eligibility minimum 16 years.";
            }
          }
        }
      }
  
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
  
      if (typeof input["email"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 6){
          isValid = false;
          errors["password"] = "Please add at least 6 charachter.";
        }
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
        if (input["password"] != input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      }
  
      setErrors(errors);
  
      return isValid;
    };
  
    const handleChange = (event) => {
      setInput({ ...input, [event.target.name]: event.target.value });
    };
    const handlecoupon = (e) => {
        if (e.target.value) {
          setCoupon(e.target.value);
          getcode(); // Call the getcode function here
        }
      };
    
      const getcode = () => {
        // Implement your getcode logic here
        console.log("getcode function called");
      };
    
  return (
    <div className='in_center in_center_discussion'>
         <section className="loginpage vipsignup">
            <div className="container">
                <Link to="/Signup" className="gologin"><img src="/images/loginarrow.png" alt="icon" /></Link>
                <div className="row">
                    <div className="col-md-6">
                        <div className="imglogin">
                            <img src="/images/loginimg.png" alt="/images" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="right_login right_signup" style={{ backgroundImage: `url(/images/signupbg1.jpg)` }}>
                            <div className="lgn">
                                <h3>Sign up vip account</h3>
                                <div className="alert alert-danger" id="errorlogin"></div>
                                <div className="alert alert-success" id="successlogin">Successfully Registered</div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>First Name*</label>
                                                <input type="text" name="firstname" value={input.firstname} onChange={handleChange} className="form-control" autoComplete="off" />
                                                <div className="text-danger">{errors.firstname}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Last Name*</label>
                                            <input type="text" name="lastname" value={ input.lastname} onChange={ handleChange} id="lastname"  className="form-control" autoComplete="off"/>
                                            <div className="text-danger">{ errors.lastname}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Username*</label>
                                            <input type="text" name="username" value={ input.username} onChange={ handleChange} id="username"  className="form-control" autoComplete="off"/>
                                            <div className="text-danger">{ errors.username}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email Address*</label>
                                            <input type="text"  name="email" value={ input.email} onChange={ handleChange}  className="form-control" id="email" autoComplete="off"/>
                                            <div className="text-danger">{ errors.email}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Mobile Number*</label>
                                            <input type="text" name="mobile" value={ input.mobile} onChange={ handleChange}  className="form-control" id="mobile" autoComplete="off"/>
                                            <div className="text-danger">{ errors.mobile}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Dob<sup>(dd/MM/yyyy)*</sup></label>
                                            <input type="date" className="form-control" name="age" value={  input.age }  onChange={ handleChange}   />
                                            {/* <DatePicker  
                                            selected={  selectedDate }  
                                            onChange={  handleDateChange.bind(this) }  
                                            name="startDate"  
                                            dateFormat="MM/dd/yyyy"
                                            className="form-control" id="age" 
                                            /> */}
                                            <div className="text-danger">{ errors.age}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Create Password*</label>
                                            <input type="password" name="password"  value={ input.password} onChange={ handleChange} className="form-control" id="password"  autoComplete="off"/>
                                            <div className="text-danger">{ errors.password}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Confirm Password*</label>
                                            <input type="password"  name="confirm_password" value={ input.confirm_password} onChange={ handleChange} className="form-control" id="confirm_password" autoComplete="off"/>
                                            <div className="text-danger">{ errors.confirm_password}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Company Name*</label>
                                            <input type="text"  name="company" value={ input.company} onChange={ handleChange} className="form-control" id="company" autoComplete="off"/>
                                            <div className="text-danger">{ errors.company}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Referral Code</label>
                                            <input type="text"  name="referral" value={ input.referral} onChange={ handleChange} className="form-control" id="referral" autoComplete="off"/>
                                            <div className="text-danger">{ errors.referral}</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Apply for vouchers</label>
                                            <input type="text"  name="coupon" value={ coupon} onChange={ handlecoupon.bind(this)} className="form-control" id="coupon" autoComplete="off"/>
                                            <div id="errorcoupon" className="text-danger">Invalid Coupon</div>
                                            <div id="successcoupon">Your coupon added</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                    <div className="form-group">
                                       <label>Plan*</label>
                                        <div className="row">

                                        { data.map((result) => {
                                        return (
                                            // <input type="radio"  name="referral" key={result.id} value={result.id} onChange={ handleChange} className="form-control"  autoComplete="off"/>
                                            <div className="col-md-12 mb-2">
                                                <div class="checkcontainer">
                                                    <input type="radio" name="plan" key={result.id} value={result.id} onChange={ handleChange}/>
                                                    <span class="radiobtn"></span>
                                                    {result.duration} / ${result.price}
                                                </div>
                                            </div>
                                            )
                                        })}
                                        <div className="text-danger">   { errors.plan}</div>
                                        </div>
                                    </div>  
                                    </div>
                                    <div className="col-sm-12">
                                    <div className="form-group">
                                       <label>Terms and Conditions*</label>
                                        <div className="row">

                                       
                                           
                                            <div className="col-md-12 mb-2">
                                                <div class="checkcontainer">
                                                    <input type="checkbox" name="tc"   onChange={handleChange} />
                                                    <span class="radiobtn"></span>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum.
                                                </div>
                                            </div>
                                         
                                        <div className="text-danger">{ errors.tc}</div>
                                        </div>
                                    </div>  
                                    </div>
                                    </div>
                                    {formData!==false ? <CheckoutForm price={planprice} form={formData} planid={input.plan&&input.plan}  /> : <button className="btn" type="submit"  >Create Account</button>}
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Vipsignup
