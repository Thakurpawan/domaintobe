import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import axios from 'axios';
function Signup(props) {
    const [popupOpen, setPopupOpen] = useState(false);
    const[update,setUpdate]=useState(0);
    const [popupdata, setPopupData] = useState(null);
    
    const handlePopupClose = () => {
        setPopupOpen(false);
    };
    const [state, setState] = useState({
        popupopne: false,
        popupdata: ""
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPopupOpen(true);
        }, 4000);

        axios.get('https://domaintobesocial.com/domaintobestart/get_coupon')
            .then(res => {
                console.log(res.data.data);
                setPopupData(res.data.data[0]);
            });

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

  return (
    
   <section className="loginpagetow signup1 " style={{ backgroundImage: `url(/images/signupbg.jpg)` }}>
                <div className="container">
                    {popupdata ? <Popup open={handlePopupClose} position="right center">
                        <div className="coupon">
                            <div className="containerpopup">
                                <h3><img src="/images/logo.png" alt="Avatar" /></h3>
                            </div>
                            {/* <img src="/w3images/hamburger.jpg" alt="Avatar" style={{ width: "100%" }} /> */}
                            <div className="container" style={{ backgroundColor: "white" }}>
                                <h2>
                                    {popupdata.type == "percentage" ? <b>{popupdata?.value}% OFF Signup VIP </b> : <b>{popupdata.value} fixed OFF Signup VIP </b>}
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit amet, et nam pertinax gloriatur. Sea te minim soleat
                                    senserit, ex quo luptatum tacimates voluptatum, salutandi delicatissimi
                                    eam ea. In sed nullam laboramus appellantur, mei ei omnis dolorem
                                    mnesarchum.
                                </p>
                            </div>
                            <div className="containerpopup">
                                <p>
                                    Use Promo Code: <span className="promo">{ popupdata.coupon_code &&  popupdata.coupon_code}</span>
                                </p>
                                <p className="expire">Expires: { popupdata.end_date && new Date( popupdata.end_date * 1000).toLocaleString()}</p>
                            </div>
                            <button className='btn btn-primary' onClick={() => this.setState({ handlePopupClose: false })}>
                                Close modal
                            </button>
                        </div>

                    </Popup> : ""}
                    <Link to="/" className="gologin"><img src="/images/loginarrow2.png" alt="icon" /></Link>
                    <h2>Signup with</h2>
                    <div className="row">
                        <div className="col-sm-6">
                            <Link to="/Signup">
                                <div className="signone bird">
                                    <div className="images">
                                        <img src="/images/useri_1.png" alt="images" />
                                    </div>
                                    <ul>
                                        <li>1. <span>Quick Posting</span> using feed along with features like attaching photo, video, tagging user and using emojis</li>
                                        <li>2. <span>Posting on Message</span> board to start a discussion thread under particular created(Category/sub category managed by administrator)</li>
                                        <li>3. <span>Posting feed</span> or Discussion thread as private with custom duration and password access with share function.</li>
                                        <li>4. <span>Marking profile</span> hidden while adding comments</li>
                                        <li>5. <span>Creating custom</span> profile page with different colour theme, Banner, photos, video, bio, URL and Location</li>
                                        <li>6. <span>Posting feed</span> or Discussion thread as private with custom duration and password access with share function</li>
                                        <li>7. <span>To get discounts</span> on membership renewal by allowing ads on profile page</li>
                                        <li>8. <span>To receive requests</span> for chat , video call and Help information</li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6">
                        {/* {props.location.search ? '/vipuser/?' + props.location.search?.substring(1) : '/vipuser'} */}
                            <Link>
                                <div className="signtwo ">
                                    <div className="images">
                                        <img src="/images/useri_2.png" alt="images" />
                                        <img className="vip" src="/images/vip.png" alt="images" />
                                    </div>
                                    <ul>
                                        <li>1. <span>Quick Posting</span> using feed along with features like attaching photo, video, tagging user and using emojis</li>
                                        <li>2. <span>Posting on Message</span> board to start a discussion thread under particular created(Category/sub category managed by administrator)</li>
                                        <li>3. <span>Marking profile</span> hidden while adding comments</li>
                                        <li>4. <span>Creating custom</span> profile page with different colour theme, Banner, photos, video, bio, URL and Location</li>
                                        <li>5. <span>Posting feed</span> or Discussion thread as private with custom duration and password access with share function</li>
                                        <li>6. <span>To get discounts</span> on membership renewal by allowing ads on profile page</li>
                                        <li>7. <span>To receive requests</span> for chat , video call and Help information</li>
                                    </ul>
                                    {/* <div className="monweek">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label className="checkcontainer">
                                                <input type="radio" name="checkbox"/>
                                                <span className="radiobtn" checked="">
                                                    <h3>weekly </h3>
                                                    <h2>200.00 $</h2>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="checkcontainer">
                                                <input type="radio" name="checkbox"/>
                                                <span className="radiobtn">
                                                    <h3>Monthly</h3>
                                                    <h2>240.00 $</h2>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-12 text-center mt-4">
                            {/* {props.location.search ?
                                <Link to={'/normalsignup/?' + props.location.search?.substring(1)} className="nextbutton">Next</Link>
                                :
                                <Link to="/normalsignup" className="nextbutton">Next</Link>
                            } */}
                        </div>
                    </div>
                </div>
            </section>
    
  )
}

export default Signup
