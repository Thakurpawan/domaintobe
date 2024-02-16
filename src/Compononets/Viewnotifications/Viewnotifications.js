import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Viewnotifications = () => {
    const [filterValue, setFilterValue] = useState('');
    const [notification, setNotification] = useState([]);
    let curentlogin = JSON.parse(window.localStorage.getItem("user"));
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData1 = new FormData();
                formData1.append('id', curentlogin.value); 
                const response = await axios.post('https://domaintobesocial.com/domaintobestart/getnotifications', formData1);
                setNotification(response.data.message);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='in_center in_center_discussion'>
            <div className="head pr-0">
                <form className="d-flex w-100">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={filterValue}
                        onChange={handleFilterChange}
                    />
                    <button className="btn" type="submit">
                        <img src="images/searchicon.png" alt="icon" />
                    </button>
                </form>
            </div>
            <section className="section-50 mt-3">
                <div className="container">
                    <h3 className="m-b-50 heading-line">
                        Notifications <i className="fa fa-bell text-muted" />
                    </h3>
                    <div className="notification-ui_dd-content">
                        {notification.map((result, i) => (
                            <React.Fragment key={i}>
                                {result.blocked &&
                                result.blocked.filter(item => item.name.includes(result.name) && item.status === 1)
                                    .length > 0 ? (
                                    ''
                                ) : (
                                    <div className="notification-list notification-list--unread">
                                        <Link
                                            to={{
                                                pathname: '/Notification',
                                                state: { pid: result.postId }
                                            }}>
                                            <div className="notification-list_content">
                                                <div className="notification-list_img">
                                                    <img src={result.image} alt="user" />
                                                </div>
                                                <div className="notification-list_detail">
                                                    <p>
                                                        <b>{result.name}</b> {result.action} By {result.posts}
                                                    </p>
                                                    <p className="text-muted">{result.action === 'Comment on post' ? result.description : ''}</p>
                                                    <p className="text-muted">
                                                        <small>{result.created}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Viewnotifications;
