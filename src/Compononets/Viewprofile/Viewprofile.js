import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import $ from 'jquery'

function Viewprofile(props) {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [isFriendRequest, setIsFriendRequest] = useState(false);
    const [isViprole, setIsVipRole] = useState(false);
    const [friendsdata, setFriendsData] = useState([]);
    const [followingdata, setFollowingData] = useState([]);
    const [postsdata, setPostsData] = useState([]);
    const [galleryimages, setGalleryImages] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [firendstatus, setFriendStatus] = useState(false);
    const [themeimage, setThemeImage] = useState('select2.jpg');
    const [setbannerimage, setSetBannerImage] = useState('https://localhost:3000/images/bannerimage.png');
    const [plans, setPlans] = useState([]);
    const [businesscardimages, setBusinessCardImages] = useState([]);
    const [from, setFrom] = useState('00:00');
    const [to, setTo] = useState('00:00');
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState([]);
    const [advertisementModal, setAdvertisementModal] = useState(false);
    const [advertisementData, setAdvertisementData] = useState({});
    let button, follow, message, vipimage, advertisement;
    let currentlogin = JSON.parse(window.localStorage.getItem("user"));
    const [isMain, setIsMain] = useState(false);
    const [input, setInput] = useState({ postDescription: '' });
    let { name, id } = useParams();

    // if (isFriendRequest) {
    //     button = '';
    //     follow = '';
    //     message = '';
    //     advertisement = <li><a data-toggle="tab" href="#Membership">Vip Membership</a></li>;
    // } else {
    //     if (firendstatus) {
    //         button = <li onClick={() => props.sendFriendRequest(props.input.uid)} style={{ cursor: "pointer" }}>{props.input.firendstatus}</li>;
    //     } else {
    //         button = <li>{firendstatus}</li>;
    //     }

    //     follow = <li onClick={() => props.sendFollowRequest(props.input.uid)} style={{ cursor: "pointer" }}>Follow</li>;
    //     message = <li onClick={() => props.redirectmessages()} style={{ cursor: "pointer" }}>Message</li>;
    //     advertisement = '';
    // }
    const blockuser = (firendid) => {
        const formData = new FormData();
        formData.append('userid', currentlogin.value);
        formData.append('friendid', firendid);

        axios.post('https://domaintobesocial.com/domaintobestart/blockuser', formData)
            .then((res) => {
                document.getElementById('loadingicon').style.display = 'none';
                if (res.data.message === 'success') {
                    // You may want to handle  state change differently
                    // .setState({ showModal: false })
                    alert('Successfully sent');
                } else {
                    alert(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    const helpPop = () => {
        setShowModal(true);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let currentlogin = JSON.parse(window.localStorage.getItem("user"));
                currentlogin(currentlogin);

                const formData0 = new FormData();
                formData0.append('id', 9);
                const advertisementResponse = await axios.post('https://domaintobesocial.com/domaintobestart/getadvertisementpost', formData0);
                setAdvertisementData(advertisementResponse.data);

                const formData = new FormData();
                formData.append('id', name);
                formData.append('user', currentlogin.value);
                const userProfileResponse = await axios.post('https://domaintobesocial.com/domaintobestart/getuserprofilename', formData);
                const userData = userProfileResponse.data.message;

                setInput({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    lname: userData.lname,
                    mobile: userData.mobile,
                    profession: userData.profession,
                    subprofession: userData.professionsubcategory,
                    professionview: userData.professionname,
                    subprofessionview: userData.subprofessionname,
                    buisnessname: userData.buisnessname,
                    days: userData.days,
                    address: userData.address,
                    description: userData.description,
                    age: userData.age,
                    uid: userData.id,
                    friendstatus: userData.firendrequeststatus,
                    plan: userData.plan,
                    planstatus: userData.planstatus,
                    expireddate: userData.expireddate,
                    facebook: userData.facebook,
                    twitter: userData.twitter,
                    tumbler: userData.tumbler,
                    snapchat: userData.snapchat,
                    amazon: userData.amazon,
                    ebay: userData.ebay,
                    whatsapp: userData.whatsapp,
                    marital_status: userData.marital_status,
                });

                setThemeImage(userData.themeimage || 'select2.jpg');
                setSetBannerImage(userData.bannerimage || 'https://localhost:3000/images/bannerimage.png');

                setFriendStatus(userData.firendrequeststatus === 'Send Request');
                setIsVipRole(userData.roles === 'vip');
                setIsFriendRequest(userData.id === currentlogin.value);

                setGalleryImages(userData.galleryimages);
                setBusinessCardImages(userData.businesscard);

                if (!userData.image || userData.image === '') {
                    document.querySelector('#myImg').src = '/images/blank.png';
                } else {
                    document.querySelector('#myImg').src = userData.image;
                }

                setFrom(userData.from);
                setTo(userData.to);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [name]);

    const openPop = () => {
        setIsMain(prevState => !prevState);
    };
    useEffect(() => {

        if (input.postDescription !== '') {
            handleReportSubmit();
        }
    }, [input.postDescription]);

    const handleReportSubmit = () => {
        const event = {
            preventDefault: () => { },
            target: {
                attributes: {
                    'data-id': { value: 'your_post_id' }
                }
            }
        };

        if (validates()) {
            alert(event.target.attributes['data-id'].value)
            const curentlogin = JSON.parse(window.localStorage.getItem("user"));
            const formData = new FormData();
            formData.append('id', event.target.attributes['data-id'].value);
            formData.append('userid', curentlogin.value);
            formData.append('category', "");
            formData.append('description', input.postDescription);

            axios.post('https://domaintobesocial.com/domaintobestart/reporthelpost', formData)
                .then((res) => {
                    if (res.data.message === 'success') {
                        swal('Successfully', 'Report submit', "success");
                        window.location.reload();
                    } else {
                        swal('Oops', res.data.message, "success");
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                    alert('Invalid Login1');
                });
        }
    };
    const validates = () => {
        let errors = {};
        let isValid = true;

        if (!input["postDescription"]) {
            isValid = false;
            errors["postDescription"] = "Description field is required.";
        }

        setErrors(errors);
        return isValid;
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        let curentlogin = JSON.parse(window.localStorage.getItem("user"));

        const fetchData = async () => {
            try {
                const formData0 = new FormData();
                formData0.append('id', 9);
                const res0 = await axios.post('https://domaintobesocial.com/domaintobestart/getadvertisementpost', formData0);
                setAdvertisementData(res0.data);

                const formData = new FormData();
                formData.append('id', name);
                formData.append('user', curentlogin.value);
                const res = await axios.post('https://domaintobesocial.com/domaintobestart/getuserprofilename', formData);
                const message = res.data.message;
                setInput({
                    id: message.id,
                    name: message.name,
                    email: message.email,
                    lname: message.lname,
                    mobile: message.mobile,
                    profession: message.profession,
                    subprofession: message.professionsubcategory,
                    professionview: message.professionname,
                    subprofessionview: message.subprofessionname,
                    buisnessname: message.buisnessname,
                    days: message.days,
                    address: message.address,
                    description: message.description,
                    age: message.age,
                    uid: message.id,
                    friendstatus: message.firendrequeststatus,
                    plan: message.plan,
                    planstatus: message.planstatus,
                    expireddate: message.expireddate,
                    facebook: message.facebook,
                    twitter: message.twitter,
                    tumbler: message.tumbler,
                    snapchat: message.snapchat,
                    amazon: message.amazon,
                    ebay: message.ebay,
                    whatsapp: message.whatsapp,
                    marital_status: message.marital_status
                });

                if (message.themeimage == null) {
                    setThemeImage('select2.jpg');
                } else {
                    setThemeImage(message.themeimage);
                }

                if (message.bannerimage == null) {
                    setSetBannerImage('https://localhost:3000/images/bannerimage.png');
                } else {
                    setSetBannerImage(message.bannerimage);
                }

                setFriendStatus(message.firendrequeststatus === 'Send Request');
                setGalleryImages(message.galleryimages);
                setBusinessCardImages(message.businesscard);

                setIsVipRole(message.roles === 'vip');
                setIsFriendRequest(input.uid === curentlogin.value);

                if (message.image == null || message.image == '') {
                    var image = '/images/blank.png';
                } else {
                    var image = message.image;
                }

                setFrom(message.from);
                setTo(message.to);

                const preview = document.querySelector('#myImg');
                preview.src = image;

                const formData1 = new FormData();
                formData1.append('id', name);
                formData1.append('user', curentlogin.value);
                const response1 = await axios.post('https://domaintobesocial.com/domaintobestart/getfriendlistname', formData1);
                if (response1.data.status === 'data') {
                    setFriendsData(response1.data.message);
                } else {
                    alert(response1.data.message);
                }

                const formData2 = new FormData();
                formData2.append('id', name);
                const response2 = await axios.post('https://domaintobesocial.com/domaintobestart/getfollowingname', formData2);
                if (response2.data.status === 'data') {
                    setFollowingData(response2.data.message);
                } else {
                    alert(response2.data.message);
                }

                const formData3 = new FormData();
                formData3.append('id', name);
                const response3 = await axios.post('https://domaintobesocial.com/domaintobestart/getuserspostsname', formData3);
                if (response3.data.status === 'data') {
                    setPostsData(response3.data.message);
                } else {
                    alert(response3.data.message);
                }

                const formData5 = new FormData();
                formData5.append('id', name);
                const response4 = await axios.post('https://domaintobesocial.com/domaintobestart/getfollowersname', formData5);
                if (response4.data.status === 'data') {
                    setFollowers(response4.data.message);
                } else {
                    alert(response4.data.message);
                }

                const response6 = await axios.post('https://domaintobesocial.com/domaintobestart/membershipplans');
                setPlans(response6.data.result);

                const response7 = await axios.get('https://domaintobesocial.com/domaintobestart/category');
                setCategory(response7.data.message);

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();

        return () => {
            // Cleanup function if necessary
        };
    }, [name]);

    return (
        <span>
            <div className="inbanner" style={{ backgroundImage: `url(${setbannerimage})` }} ></div>
            <section className="dashboard dashboard_pro" style={{ backgroundImage: `url(${'/images/' + themeimage})` }}>
                <div className="container">
                    <div className="dash_top">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="user usernew">
                                    <div className="uphead">
                                        {vipimage}
                                        <div className="userimg">
                                            <img id="myImg" src="/images/blank.png" alt="your image" />
                                        </div>
                                        {currentlogin.role == 'vip' ?
                                            <a className="help" onClick={() => helpPop()}>Help <span><img src="/images/mark.png" alt="your image" /></span> </a>
                                            : ""}

                                        <ul>
                                            {button}
                                            {follow}
                                            {message}
                                            <li onClick={() => blockuser(input.uid)} style={{ cursor: "pointer" }}>Userblock</li>
                                            {/* <button onClick={()=>blockuser(input.uid)} style={{ cursor: "pointer" }} >userblock</button> */}
                                        </ul>
                                        <h5 className="socialicon">
                                            {/* {input.facebook ? <span><a href={input.facebook} ><i className="fab fa-facebook-f"></i></a></span> : ""}
                                        
                                        {input.twitter ?  <span><a href={input.twitter}><i className="fab fa-twitter"></i></a></span> : ""}
                                       
                                        {input.snapchat ? <span><a href={input.snapchat}><i className="fab fa-snapchat-ghost"></i></a></span> : "" }

                                        {input.amazon ? <span><a href={input.amazon}><i className="fab fa-amazon"></i></a></span> : ""}
                                        
                                        {input.whatsapp ? <span><a href={'https://wa.me/'+input.whatsapp}><i className="fab fa-whatsapp"></i></a></span> : "" }

                                        {input.tumbler ? <span><a href={input.tumbler}><i className="fab fa-tumblr"></i></a></span> : ""}

                                        {input.ebay ? <span><a href={input.ebay}><i className="fab fa-ebay"></i></a></span> : ""} */}

                                            {input.facebook && input.facebook !== "" ? <span><a href={input.facebook} target="_blank" ><i className="fab fa-facebook-f"></i></a></span> : ""}

                                            {input.twitter && input.twitter !== "" ? <span><a href={input.twitter} target="_blank"><i className="fab fa-twitter"></i></a></span> : ""}

                                            {input.snapchat && input.snapchat !== "" ? <span><a href={input.snapchat} target="_blank"><i className="fab fa-snapchat-ghost"></i></a></span> : ""}

                                            {input.amazon && input.amazon !== "" ? <span><a href={input.amazon} target="_blank"><i className="fab fa-amazon"></i></a></span> : ""}

                                            {input.whatsapp && input.whatsapp !== "" ? <span><a href={'https://wa.me/' + input.whatsapp} target="_blank"><i className="fab fa-whatsapp"></i></a></span> : ""}

                                            {input.tumbler && input.tumbler !== "" ? <span><a href={input.tumbler} target="_blank"><i className="fab fa-tumblr"></i></a></span> : ""}

                                            {input.ebay && input.ebay !== "" ? <span><a href={input.ebay} target="_blank"><i className="fab fa-ebay"></i></a></span> : ""}

                                        </h5>
                                    </div>
                                    <h3>{input.name}</h3>
                                    <p>{input.description}</p>
                                    <p>{'Status: ' + input.marital_status}</p>
                                    {/* <h5>{input.email}</h5> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dash_topmain dash2">
                        <i className="fas fa-bars side_b" onClick={openPop.bind()}></i>
                        <div className="dash_sidebar">
                            <i className="fas fa-times side_b close" onClick={openPop.bind()}></i>
                            <ul className="nav nav-tabs">
                                <li><Link to="/userdashboard">Home</Link></li>
                                <li><a className="active" data-toggle="tab" href="#posts">Posts</a></li>
                                {(isViprole) ? (input.buisnessname) ? <li><a data-toggle="tab" href="#home">Business Details</a></li> : "" : ""}
                                <li><a data-toggle="tab" href="#Friends">Friends</a></li>
                                <li><a data-toggle="tab" href="#Gallery">Gallery</a></li>
                                <li><a data-toggle="tab" href="#followers">Followers</a></li>
                                <li><a data-toggle="tab" href="#following">Following</a></li>
                                {/* {membership} */}
                                {advertisement}
                            </ul>
                        </div>
                        <div className="loadingicon" id="loadingicon"><img src="/images/loading.gif" /></div>
                        <div className="tab-content">
                            <div id="home" className="tab-pane fade">
                                <div className="bus_det businessddl">
                                    <div className="tes">
                                        <h4><b>Business Name</b>
                                            <span>{input.buisnessname}</span>
                                            {/* <ul>
                                        <li>Recovered 2000 + Patients</li>
                                        <li><span><img src="/images/brand1.png" alt="icon"/></span></li>
                                        <li><span><img src="/images/brand2.png" alt="icon"/></span></li>
                                        <li><span><img src="/images/brand3.png" alt="icon"/></span></li>
                                        <button className="btn2ul">+</button>
                                    </ul> */}
                                        </h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>Profession</b> <span>{input.professionview}</span></h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>Subcategory Profession</b> <span>{input.subprofessionview}</span></h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>Working Days</b>
                                            <span>{input.days}</span>
                                        </h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>From Time</b>
                                            <span>{(from == false) ? '00:00' : from} </span>
                                        </h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>To Time</b>
                                            <span>{(to == false) ? '00:00' : to} </span>
                                        </h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>Summary</b>
                                            <span>{input.description}</span>
                                        </h4>
                                    </div>z
                                    <div className="tes">
                                        <h4><b>Mobile Number</b> <span>{input.mobile}</span></h4>
                                    </div>
                                    <div className="tes">
                                        <h4><b>Address</b>
                                            <span>{input.address}</span>
                                        </h4>
                                    </div>


                                    <div className="tes">
                                        <h4><b>Business Card</b>
                                            <div className="row">
                                                {businesscardimages.map((businesscardimage, i) => (
                                                    <div className="col-sm-6 mb-2">
                                                        <img className="cart w-100" src={businesscardimage} />
                                                    </div>
                                                ))}
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div id="posts" className="tab-pane fade show active">
                                <h3>Posts</h3>
                                <div className="listusr help Postall">
                                    <div className="row">

                                        {postsdata.map((resultp) => {
                                            console.log(resultp)
                                            return (
                                                <>
                                                    <div className="col-sm-6 col-lg-6  mb-3">
                                                        <div className="singleposttest">
                                                            <div className="asuser mb-0">
                                                                <span className="userimg"><img src={resultp.userimage} align="icon" /></span>
                                                                <h5>{resultp.username}<a className="d_report" data-toggle="modal" data-target={'#exampleModalHelp' + resultp.id}>Report</a>
                                                                </h5>
                                                                <p>{resultp.created} Ago</p>
                                                            </div>
                                                            <div className="contants">
                                                                <p>{resultp.posts}</p>
                                                                <Link to={{
                                                                    pathname: "/Notification",
                                                                    state: { pid: resultp.id }
                                                                }}>View more <i className="fas fa-long-arrow-alt-right"></i></Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="modal fade" id={'exampleModalHelp' + resultp.id} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                                            <div className="modal-content HelpForm">
                                                                <div className="modal-header ghg">
                                                                    <h5 className="modal-title" id="exampleModalLongTitle">Report</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <form onSubmit={handleReportSubmit} data-id={resultp.id} postuser={resultp.postuser}>
                                                                    <div className="modal-body">
                                                                        <div className="row">
                                                                            <div className="col-sm-12">
                                                                                <div className="form-group">
                                                                                    <h6>Description {errors.postDescription ? <span style={{ color: "red" }}>*</span> : ''}</h6>
                                                                                    <textarea placeholder="Description" value={input.postDescription} id="postDescription" name="postDescription"></textarea>
                                                                                    <div className="text-danger">{errors.postDescription}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" onChange={handleChange} data-dismiss="modal">Close</button>
                                                                                <button type="submit" className="btn btn-primary submit">Submit</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>




                            <div id="Gallery" className="tab-pane fade">
                                <h3>Gallery</h3>
                                <div className="row allvideoimages mt-0">

                                    {galleryimages.map((galleryimage, i) => (
                                        <div className="col-sm-6 col-lg-6 mb-3">
                                            <div className="imagetest">
                                                {galleryimage.image ? (
                                                    <a href={galleryimage.image} data-fancybox><img className="w-100" src={galleryimage.image} alt="ion" /></a>
                                                ) : (
                                                    <video width="320" height="240" controls src={galleryimage.video} />

                                                )}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div id="Friends" className="addfrbfil tab-pane fade">
                                <h3>All Friends</h3>
                                <div className="row">
                                    {friendsdata.map((result) => {
                                        return (
                                            <div className="col-lg-6 mb-3">
                                                <div className="testfrnd">
                                                    <span className="userimg">
                                                        {/* <span>
                                            <i className="fas fa-video"></i>
                                            </span> */}
                                                        <img src={result.image} align="icon" /></span>
                                                    <h5>{result.name}</h5>
                                                    <ul className="followmessage">
                                                        <li className="w-100">
                                                            <a className="mg" onClick={() => { window.location.href = "/viewprofile/" + result.name }} style={{ cursor: "pointer" }}>View Profile</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div id="followers" className="addfrbfil tab-pane fade">
                                <h3>All Followers</h3>
                                <div className="row">
                                    {followers.map((resultfo) => {
                                        return (
                                            <div className="col-lg-6 mb-3">
                                                <div className="testfrnd">
                                                    <span className="userimg">
                                                        {/* <span><i className="fas fa-video"></i></span
                                                > */}
                                                        <img src={resultfo.image ? resultfo.image : "/images/useri_1.png"} align="icon" /></span>
                                                    <h5>{resultfo.name}</h5>
                                                    <ul className="followmessage">
                                                        <li>
                                                            <a className="mg" style={{ cursor: "pointer" }} onClick={() => { window.location.href = "/viewprofile/" + resultfo.name }}>View Profile</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                            <div id="following" className="addfrbfil tab-pane fade">
                                <h3>All Following</h3>
                                <div className="row">
                                    {followingdata.map((results) => {
                                        return (
                                            <div className="col-lg-6 mb-3">
                                                <div className="testfrnd">
                                                    <span className="userimg">
                                                        {/* <span><i className="fas fa-video"></i></span> */}
                                                        <img src={results.image} align="icon" /></span>
                                                    <h5>{results.name}</h5>
                                                    <ul className="followmessage">
                                                        <li>
                                                            <a className="mg" onClick={() => { window.location.href = "/viewprofile/" + results.friendid + '/' + results.name }}>View Profile</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>



                            <div id="Membership" className="tab-pane fade">
                                <h3>Membership</h3>
                                <div className="row">
                                    {plans.map((plan, i) => (

                                        <div className="col-lg-4 mb-3">
                                            <div className="testup">
                                                <div className="test">
                                                    <div className="head_me">
                                                        <h5>{plan.duration} Plan
                                                            {input.plan == plan.id ? (
                                                                <span style={{ float: 'right', color: 'red' }}>{input.planstatus}</span>
                                                            ) : (
                                                                <span></span>
                                                            )}
                                                        </h5>
                                                        <h4>${plan.price}</h4>
                                                    </div>
                                                    <h5>Features</h5>
                                                    <ul>
                                                        {plan.quickposting ? (
                                                            <li>Quick Posting using feed along with features like attaching photo, video, tagging user and themselves too and using emojis</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.messageboard ? (
                                                            <li>Posting on Message board to start a discussion</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.markingprofile ? (
                                                            <li>Marking profile hidden while adding comments</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.customprofile ? (
                                                            <li>Creating custom profile page with different colour theme, Banner, photos, video, bio, URL and Location</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.feed ? (
                                                            <li>Posting feed or Discussion thread as private with custom duration and password access with share function</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.membershiprenewal ? (
                                                            <li>To get discounts on membership renewal by allowing ads on profile page</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.chatvideo ? (
                                                            <li>To receive requests for chat , video call and Help information</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.galleryfiles ? (
                                                            <li>Multiple delete of gallery files</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.posts ? (
                                                            <li>Search posts by date</li>
                                                        ) : (
                                                            <li></li>
                                                        )}

                                                        {plan.livevideo ? (
                                                            <li>Live video streaming</li>
                                                        ) : (
                                                            <li></li>
                                                        )}


                                                    </ul>

                                                    <button className="btn btn-primary">Choose Plan</button>

                                                    {input.plan == plan.id ? (
                                                        <button style={{ float: 'right' }} className="btn btn-success">Current Plan</button>
                                                    ) : (
                                                        <span></span>
                                                    )}

                                                    {input.plan == plan.id ? (
                                                        <h5 >Renew on: <span> {input.expireddate}</span>
                                                        </h5>
                                                    ) : (
                                                        <span></span>
                                                    )}

                                                </div>
                                            </div>
                                        </div>

                                    ))}


                                </div>
                            </div>

                            <div id="Advertisement" class="tab-pane fade">
                                <h3>Advertisement</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>

                        </div>
                        {advertisementData.type == 2 && advertisementModal == false ?
                            <div className="psotiv_right2">
                                <a><i className="fas fa-times" onClick={() => {
                                    // advertisementModal = true;
                                    // showModal = false
                                    setAdvertisementModal({ advertisementModal: true, showModal: false });
                                    console.log("advertisementModal", advertisementModal);
                                    console.log("showModal", showModal);
                                }
                                }></i></a>
                                <div className="inpost">
                                    <><h5>Advertisement</h5>
                                        <img className="w-100" src={advertisementData.post} align="icon" style={{ height: "300px" }} />
                                        <div className="intap">
                                            <h6>{advertisementData.description}</h6>
                                        </div>
                                        <a href={advertisementData.link} target="_blank" >Click Here</a>
                                    </>

                                </div>
                            </div> : ""}
                    </div>
                </div>



            </section>
        </span>
    )
}

export default Viewprofile
