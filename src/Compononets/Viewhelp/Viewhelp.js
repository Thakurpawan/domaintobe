import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function Viewhelp(props) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const [helpposts, setHelpposts] = useState([]);
  const [helpcomments, setHelpcomments] = useState([]);
  const [values, setValues] = useState('');
  const [hidecomment, setHidecomment] = useState('');
  const [formfilled, setFormfilled] = useState('');
  const [isViprole, setIsViprole] = useState(false);
  const [userimage, setUserimage] = useState('');
  const [vipimage, setVipImage] = useState('');
  const curentlogin = JSON.parse(window.localStorage.getItem('user'));
 
 let {id} = useParams();
console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('id', id);
        const res = await axios.post('https://domaintobesocial.com/domaintobestart/viewsinglehelp', formData);
        setHelpposts(res.data.message);
        document.getElementById('loadingicon').style.display = 'none';
      } catch (error) {
       
      }
    };

    fetchData();
  }, [id]);


  const handleChange = (event) => {
    setInput(prevInput => ({ ...prevInput, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // Your form submission logic
    }
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!input.category) {
      errors.category = "Please select category.";
      isValid = false;
    }

    if (!input.description) {
      errors.description = "Please add description.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const likePost = () => {
    // Like post logic
  };

  const commentSubmit = (event) => {
    event.preventDefault();
    if (validates()) {
      // Comment submission logic
    }
  };

  const validates = () => {
    let isValid = true;
    let errors = {};

    if (!input.comment) {
      errors.comment = "Please enter comment.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const handleChangeLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  const handleReplysubmit = (i, e) => {
    e.preventDefault();

    let userid = JSON.parse(window.localStorage.getItem("user"));
    let routeState = JSON.parse(window.localStorage.getItem("routeState"));
    const formData = new FormData();
    formData.append('postid', props.match.params.id);
    formData.append('userid', userid.value);
    formData.append('comment', values[i]);
    formData.append('replyid', e.target.attributes['data-tag'].value);
    axios.post('https://domaintobesocial.com/domaintobestart/relpyhelpcomments',
      formData
    )
      .then((res) => {
        if (res.data.message === 'success') {
          document.getElementById("reply" + e.target.attributes['data-tag'].value).value = '';
          document.getElementById(e.target.attributes['data-tag'].value).style.display = "none";
         // Update data after successful submission if needed
        } else {
          alert(res.data.message);
       // Update data after failed submission if needed
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGetreply = (i, e) => {
    setValues(prevValues => ({
      ...prevValues,
      [i]: e.target.value
    }));
  };
  const handleHidecomment = (e) => {
    if (e.target.checked) {
      setHidecomment(e.target.value);
    } else {
      setHidecomment('');
    }
  };
  const openLikereply = (id, props) => {
    let userid = JSON.parse(window.localStorage.getItem("user"));

    const formData = new FormData();
    formData.append('userid', userid.value);
    formData.append('id', id);
    formData.append('postid', props.match.params.id);
    
    axios.post('https://domaintobesocial.com/domaintobestart/likereplyhelp', formData)
        .then((res) => {
            if (res.data.message === 'Liked' || res.data.message === 'Like') {
                props.componentDidMount();
            } else {
                alert(res.data.message);
                props.componentDidMount();
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
};
const openReplycomment = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = "block";
    }
};
const getUserID = () => {
    const user = window.localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return null; // or handle the case when user is not found in local storage
    }
};

// Usage:
const userid = getUserID();
  return (
<>
                <div className="in_center in_center_discussion help ">

                    <div className="head" style={{display:  'none' }}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn" type="submit"><img src="/images/searchicon.png" alt="icon"/> </button>
                        </form>
                    </div>
                    {console.log(helpposts)}
                    <div>
      {helpposts.length > 0 ? (
        <div className="listusr discussion help mt-0">
          {helpposts.map((result) => (
            <div className="test" key={result.id}>
              <div className="categoryhd">
                <h3>Help Post</h3>
                <input type="hidden" value={result.userid} id="discussionuser"/>
              </div>
              <div className="asuser">
                <Link to={{ pathname: '/viewprofile/' + result.name }}>
                  <span className="userimg"><img src={result.userimage} align="icon" /></span>
                  <h5>{result.name}</h5>
                </Link>
                <h5><a className="d_report" data-toggle="modal" data-target="#exampleModalHelp">Report</a></h5>
                <p>{result.created} Ago</p>
                <p>{result.description}</p>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="testin mt-0 h-auto">
                      <img className="w-100" src={result.image} alt="ion" />
                    </div>
                  </div>
                </div>
                <ul className="likecomment">
                  <li onClick={likePost}><img src="/images/like.png" alt="ion" /> {result.likes}</li>
                  <li><img src="/images/comment.png" alt="ion" />{result.comments}</li>
                </ul>
              </div>
            </div>
          ))}
          <div className="allcomment">
            {helpcomments.length > 0 ? helpcomments.map((results, i) => (
              <>
                {results.hidecomment == "1" && isViprole !== false ? (
                  <div className="commentin">
                    <span className="userimg"><img className="w-100" src={results.image} align="icon" /></span>
                    <div style={{ display: "flex" }}><h5>{results.name}</h5>
                      &nbsp; &nbsp;<h6>{`(${results?.created} Ago)`}</h6></div>
                    <p>{results.comment}</p>
                    <ul className="likecomment">
                      <li onClick={() => openLikereply(i, results.id)}><img src="/images/like1.png" alt="ion" />{results.commentlike}</li>
                      <li onClick={() => openReplycomment(i, results.id)}><img src="/images/reply.png" alt="ion" /> Reply</li>
                    </ul>
                    <form className="replyid" data-tag={results.id} id={results.id} onSubmit={handleReplysubmit.bind(this, i)}>
                      <input className="form-control me-2" type="search" placeholder="Your Comment..." aria-label="Search" autoComplete="off" id={'reply' + results.id} value={values[i]} name={values[i]} onChange={handleGetreply.bind(this, i)} />
                      <button className="comment" type="submit">Comment</button>
                    </form>
                  </div>
                ) : (
                  <>
                    {results.hidecomment == "1" && userid.value == results.discussionuser ? (
                      <div className="commentin">
                        <span className="userimg"><img className="w-100" src={results.image} align="icon" /></span>
                        <div style={{ display: "flex" }}><h5>{results.name}</h5>
                          &nbsp;&nbsp;<h6>{`(${results?.created} Ago)`}</h6></div>
                        <p>{results.comment}</p>
                        <ul className="likecomment">
                          <li onClick={() => openLikereply(i, results.id)}><img src="/images/like1.png" alt="ion" />{results.commentlike}</li>
                          <li onClick={() => openReplycomment(i, results.id)}><img src="/images/reply.png" alt="ion" /> Reply</li>
                        </ul>
                        <form className="replyid" data-tag={results.id} id={results.id} onSubmit={handleReplysubmit.bind(this, i)}>
                          <input className="form-control me-2" type="search" placeholder="Your Comment..." aria-label="Search" autoComplete="off" id={'reply' + results.id} value={values[i]} name={values[i]} onChange={handleGetreply.bind(this, i)} />
                          <button className="comment" type="submit">Comment</button>
                        </form>
                      </div>
                    ) : (
                      <>
                        {results.hidecomment == "0" ? (
                          <div className="commentin">
                            <span className="userimg"><img className="w-100" src={results.image} align="icon" /></span>
                            <div style={{ display: "flex" }}><h5>{results.name}</h5>
                              &nbsp;&nbsp;<h6>{`(${results?.created} Ago)`}</h6></div>
                            <p>{results.comment}</p>
                            <ul className="likecomment">
                              <li onClick={() => openLikereply(i, results.id)}><img src="/images/like1.png" alt="ion" />{results.commentlike}</li>
                              <li onClick={() => openReplycomment(i, results.id)}><img src="/images/reply.png" alt="ion" /> Reply</li>
                            </ul>
                            <form className="replyid" data-tag={results.id} id={results.id} onSubmit={handleReplysubmit.bind(this, i)}>
                              <input className="form-control me-2" type="search" placeholder="Your Comment..." aria-label="Search" autoComplete="off" id={'reply' + results.id} value={values[i]} name={values[i]} onChange={handleGetreply.bind(this, i)} />
                              <button className="comment" type="submit">Comment</button>
                            </form>
                          </div>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </>
            )) : null}
          </div>
          <div className="likeshare">
            <form onSubmit={commentSubmit}>
              {isViprole && <div className="pcheck"><input type="checkbox" value="1" onChange={handleHidecomment.bind(this)} />Hide comment</div>}
              <input className="form-control me-2" type="search" placeholder="Your Comment..." aria-label="Search" name="comment" value={input.comment} onChange={handleChange} autoComplete="off" id="commentext" />
              <div className="text-danger">{errors.comment}</div>
              <button className="comment" type="submit">Comment</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="loadingicon" id="loadingicon" style={{ display: 'block' }}><img src="/images/loading.gif" /></div>
      )}
    </div>
                </div>

               

                <div className="modal fade" id="exampleModalHelp"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content HelpForm">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Help</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={ handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Categories</label>
                                            <select value={ input.category} onChange={ handleChange} name="category" id="category">
                                                <option key="" value="">--Select Category--</option>
                                                <option key="Abuse" value="Abuse">Abuse</option>
                                                <option key="Anti-bullying" value="Anti-bullying">Anti-bullying</option>
                                            </select>
                                            <div className="text-danger">{ errors.category}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea placeholder="Description" value={ input.description} onChange={ handleChange} id="description" name="description"></textarea>
                                            <div className="text-danger">{ errors.description}</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit"  className="btn btn-primary submit">Submit</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

          
    </>
  )
}

export default Viewhelp
