import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function Help() {
    const [data, setData] = useState([]);
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});
    const [helpPosts, setHelpposts] = useState([]);
    const [formfilled, setFormFilled] = useState('notempty');
    const [profession, setProfession] = useState([]);
    const [popprofession, setPopProfession] = useState([]);
    const [subcategoryprofession, setSubcategoryProfession] = useState([]);
    const [helpimage, setHelpImage] = useState('');
    const [searcheddata, setSearchedData] = useState([]);

    useEffect(() => {
        // ComponentDidMount logic here
        fetchData();
    }, []);

    const fetchData = () => {
        document.getElementById('loadingicon').style.display = 'block';
        axios.post('https://domaintobesocial.com/domaintobestart/gethelpposts')
            .then((res) => {
                document.getElementById('loadingicon').style.display = 'none';
                setHelpposts(res.data.message);
            })
            .catch((error) => {
                console.log(error.message);
            });

        let curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        formData.append('user', curentlogin.value);
        axios.post('https://domaintobesocial.com/domaintobestart/getuserprofile', formData)
            .then((response) => {
                setInput(prevState => ({
                    ...prevState,
                    name: response.data.message.name,
                    uid: response.data.message.id
                }));

                setFormFilled(response.data.message.roles === 'vip' ? response.data.message.formfilled : false);

                const userImage = (response.data.message.image == null || response.data.message.image === '') ? '/images/blank.png' : response.data.message.image;
                setHelpImage(userImage);
            })
            .catch((error) => {
                console.log(error.message);
            });

        const formData1 = new FormData();
        formData1.append('id', '16');
        axios.post('https://domaintobesocial.com/domaintobestart/getprofessions', formData1)
            .then(response1 => {
                setProfession(response1.data.message);
            })
            .catch((error) => {
                console.log(error.message);
            });

        axios.get('https://domaintobesocial.com/domaintobestart/getprofessions')
            .then(response2 => {
                setPopProfession(response2.data.message);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleProfession = (event) => {
        const selectedProfession = event.target.value;
        setInput(prevState => ({ ...prevState, [event.target.name]: selectedProfession }));

        const formData = new FormData();
        formData.append('id', selectedProfession);
        axios.post('https://domaintobesocial.com/domaintobestart/getprofessionsubcategory', formData)
            .then((res) => {
                setSubcategoryProfession(res.data.result);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const imageChange = (event) => {
        const preview = document.querySelector('#myImg');
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

        setHelpImage(event.target.files[0]);
    };

    const handleChange = (event) => {
        setInput(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formfilled === 'empty') {
            alert('Complete your personal details');
            window.location = "/userprofile";
            return false;
        } else {
            if (validate()) {
                document.getElementById('loadingicon').style.display = 'block';
                var obj = JSON.parse(window.localStorage.getItem("user"));
                const formData = new FormData();
                formData.append('profession', input.profession);
                formData.append('subprofession', input.subprofession);
                formData.append('description', input.description);
                formData.append('imgsrc', helpimage);
                formData.append('userid', obj.value);

                axios.post('https://domaintobesocial.com/domaintobestart/helprequest', formData)
                    .then((res) => {
                        document.getElementById('exampleModalHelp').style.display = 'none';
                        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                        document.body.removeChild(modalBackdrops[0]);
                        swal('done')
                        window.location.reload()
                        if (res.data.message === 'success') {
                            fetchData();
                        } else {
                            alert(res.data.message);
                        }
                        document.getElementById('loadingicon').style.display = 'none';
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        }
    };

    const validate = () => {
        let errors = {};

        if (!input["profession"]) {
            errors["profession"] = "Please select profession.";
        }

        if (!input["subprofession"]) {
            errors["subprofession"] = "Please select Subcategory profession.";
        }

        if (!input["description"]) {
            errors["description"] = "Please add description.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangeLogout = () => {
        window.localStorage.clear();
        window.location.reload();
    };
    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('search', input.search);
        axios.post('https://domaintobesocial.com/domaintobestart/searchprofessions', formData)
            .then((res) => {
                setSearchedData(res.data.message);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
  return (<>
    <div className='in_center in_center_discussion help'>
        <div className="head" >
                <form className="d-flex" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search" name="search" aria-label="Search" autoComplete="off" onChange={handleChange} value={input.search}/>
                    <button className="btn" type="submit">
                    <img src="images/searchicon.png" alt="icon"/> </button>
                    <div className="setsearchdata">
                        <ul>
                            {searcheddata.map((results) => {
                                return (
                                    <li><Link to={'professions/'+results.id}>{results.name}<i className="fas fa-arrow-right"></i></Link></li>
                                )
                            })}
                        </ul>
                    </div>
                </form>
                <a className="hpl" data-toggle="modal" data-target="#exampleModalHelp"><img src="images/iconS2.png" align="icon"/> <span>Help</span></a>
            </div>
          <div className="listusr discussion help">
            <div className="test">
                <div className="categoryhd">
                    <h3>Help Post</h3>
                </div>
                <div className="loadingicon" id="loadingicon" style={{display:'block'}}><img src="/images/loading.gif" /></div>
                <div className="allctg">
                    <div className="row">
                        {profession.map((results) => (
                            <div key={results.id} className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 mb-3">
                                <Link to={`/professions/${results.id}`}>
                                    <div className="text">
                                        <img src="/images/iconS2.png" align="icon" alt="Icon" />
                                        <h3>{results.name}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {helpPosts.length > 0 ? (
                    <div className="row">
                        {helpPosts.map((result) => (
                            <div key={result.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                                <div className="singleposttest">
                                    <div className="asuser mb-0">
                                        <Link to={{ pathname: `/viewprofile/${result.name}` }}>
                                            <span className="userimg"><img src={result.userimage} align="icon" alt="User" /></span>
                                            <h5>{result.name}</h5>
                                        </Link>
                                        <p>{result.category}</p>
                                        <p>{result.created} Ago</p>
                                    </div>
                                    <div className="contants">
                                        <img className="w-100" src={result.image} alt="Content" />
                                        <p>{result.description}</p>
                                        <Link to={{ pathname: `/viewhelp/${result.id}` }}>View more <i className="fas fa-long-arrow-alt-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="norecord">
                        <img src="/images/nodata.png" alt="No Data" />
                    </div>
                )}
            </div>
        </div>
       
    </div>
    <div className="modal fade" id="exampleModalHelp" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content HelpForm">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle"> Medical / Legal...</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Professions</label>
                                        <select className="form-control" name="profession" value={input.profession} onChange={handleProfession} id="profession">
                                            <option key="" value="">--Select Profession--</option>
                                            {popprofession.map((results) => (
                                                <option key={results.id} value={results.id}>{results.name}</option>
                                            ))}
                                        </select>
                                        <div className="text-danger">{errors.profession}</div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Subcategory Profession</label>
                                        <select className="form-control" value={input.subprofession} onChange={handleChange} name="subprofession" id="subprofession">
                                            <option key="" value="">--Select Subcategory--</option>
                                            {subcategoryprofession.map((results) => (
                                                <option key={results.name} value={results.id}>{results.name}</option>
                                            ))}
                                        </select>
                                        <div className="text-danger">{errors.subprofession}</div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea placeholder="Description" value={input.description} onChange={handleChange} id="description" name="description"></textarea>
                                        <div className="text-danger">{errors.description}</div>
                                    </div>
                                </div>
                                <div className="col-sm-12 text-center">
                                    <div className="form-group mb-0">
                                        <div className="userimgmain">
                                            <input type="file" onChange={imageChange} accept=".jpg,.jpeg,.png" />
                                            <div className="userimg">
                                                <img id="myImg" className="h-100" src="images/usrrr.png" alt="your image" />
                                            </div>
                                            <img className="camerai" src="images/camerai.png" alt="your image" />
                                            <h6 className="mt-3">Upload Image</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Help
