import { Link, useParams, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Professions = ({ match }) => {
    const [input, setInput] = useState({});
    const [userImage, setUserImage] = useState('/images/blank.png');
    const [isVipRole, setIsViprole] = useState(false);
    const [professions, setProfessions] = useState([]);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
    console.log(id)
    useEffect(() => {
        const curentlogin = JSON.parse(window.localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('id', curentlogin.value);
        axios.post('https://domaintobesocial.com/domaintobestart/getuserprofile', formData)
            .then((response) => {
                setInput({ name: response.data.message.name, uid: response.data.message.id });
                setIsViprole(response.data.message.roles === 'vip');
                setUserImage(response.data.message.image || '/images/blank.png');
            })
            .catch((error) => {
                console.log(error.message);
            });

        const formData1 = new FormData();
        formData1.append('id', id);
        axios.post('https://domaintobesocial.com/domaintobestart/getselectedprofessions', formData1)
            .then((res) => {
                setProfessions(res.data.data);
                setLoading(false);
                document.getElementById('loadingicon').style.display = 'none';
            })
            .catch((error) => {
                alert('Invalid Login1');
            });

        const checkUserSession = () => {
            const stringValue = window.localStorage.getItem('user');
            if (stringValue !== null) {
                const value = JSON.parse(stringValue);
                const expirationDate = new Date(value.expirationDate);
                if (expirationDate <= new Date()) {
                    window.localStorage.removeItem('user');
                    window.location = '/';
                }
            } else {
                window.localStorage.removeItem('user');
                window.location = '/';
            }
        };
        checkUserSession();
    }, [id]);

    const handleChangeLogout = () => {
        window.localStorage.clear();
        window.location.reload();
    };

    const vipimage = isVipRole ? <img className="vip" src="/images/vip.png" alt="VIP" align="icon" /> : null;

    return ( 
    
    <div className="in_center">
                   
                    <div className="head pr-0">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" name="search" aria-label="Search" autoComplete="off"  />
                            <button className="btn" type="submit"><img src="/images/searchicon.png" alt="icon"/> </button>
                        </form>
                    </div>
                    <div className="loadingicon" id="loadingicon" style={{display:'block'}}><img src="/images/loading.gif" /></div>

                    <div className="my_followers">
                    { professions.length > 0  ? 
                        <div className="row">
                            { professions.map((results) => {
                                return (
                                    <div className="col-lg-3 col-xl-4">
                                      <Link className="postsearch" to={{ pathname: '/viewprofile/'+results.name }}>  
                                      <div className="test">
                                            <span className="userimg"><img src={results.image} align="icon"/></span>
                                            <h5>{results.name}</h5>
                                            <p>{results.pname}</p>
                                            <p>{results.sname}</p>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className="norecord">
                            <img src="/images/nodata.png" />
                        </div>
                     }
                    
                    </div>
                </div>

             


    );
};

export default Professions;
