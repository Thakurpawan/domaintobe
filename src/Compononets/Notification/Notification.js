import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';

const Notification = ({ props }) => {
  const location = useLocation();
  const[update,setUpdate]=useState(0)
  const { state } = location;
  const [errors, setErrors] = useState({});
  const [isViprole, setIsViprole] = useState(false);
  const [userimage, setUserimage] = useState('');
  const [enteredText, setEnteredText] = useState('');
  const [values, setValues] = useState('');
  const [formfilled, setFormFilled] = useState('');
  const [comments, setComments] = useState('');
  const [hidecomment, setHideComment] = useState('');
  const [input, setInput] = useState({});
  console.log(location)
  const [data, setData] = useState([]);

  useEffect(() => {

    let currentUser = JSON.parse(window.localStorage.getItem("user"));

    const formData = new FormData();
    formData.append('id', currentUser.value);


    formData.append('pid', 119);


    axios.post('https://domaintobesocial.com/domaintobestart/getnewfeeds', formData)
      .then(res => {
        if (res.data.message === 'false') {
          // Handle false case if needed
        } else {
          setData(res.data.message);
          console.log(res.data.message)
        }
      })
      .catch(error => {
        console.error('Error fetching new feeds:', error);
        // Handle error if needed
      });
  }, [update]);
 

  useEffect(() => {
      // Fetch isViprole and userimage from state or API and update state accordingly
      // Example:
      // const fetchedIsViprole = // Fetch isViprole from state or API
      // const fetchedUserimage = // Fetch userimage from state or API
      // setIsViprole(fetchedIsViprole);
      // setUserimage(fetchedUserimage);

      // For now, using dummy values
      setIsViprole(true); // Example value, replace with actual logic
      setUserimage('/path/to/userimage.png'); // Example value, replace with actual logic
  }, []);

  let vipimage;

  if (isViprole) {
      vipimage = <img className="vip" src="/images/vip.png" align="icon" />;
  } else {
      vipimage = null;
  }
  const commentLike = (i, id, post, formfilled, componentDidMount) => {
    if (formfilled === 'empty') {
        alert('Complete your personal details');
        window.location = "/userprofile";
        return false;
    } else {
        let userid = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append('userid', userid.value);
        formData.append('commentid', id);
        formData.append('feedid', post);
        axios.post('https://domaintobesocial.com/domaintobestart/postcommentlike', formData)
            .then((res) => {
                if (res.data.message === 'success') {
                    componentDidMount();
                } else {
                    alert(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
};
const openReplycomment = (id) => {
  document.getElementById('rid' + id).style.display = "block";
};
const handleReplysubmit = (i, e) => {
  e.preventDefault();
  if (this.state.formfilled === 'empty') {
      alert('Complete your personal details');
      window.location = "/userprofile";
      return false;
  } else {
      let userid = JSON.parse(window.localStorage.getItem("user"));
      const formData = new FormData();
      formData.append('userid', userid.value);
      formData.append('commentid', e.target.getAttribute('commentid'));
      formData.append('postid', e.target.getAttribute('data-id'));
      formData.append('comment', this.state.values[i]);
      axios.post('https://domaintobesocial.com/domaintobestart/postreplycomment', formData)
          .then((res) => {
              // console.log(res);
              if (res.data.message === 'success') {
                  this.componentDidMount();
              } else {
                  alert(this.data.message);
              }
              document.getElementById('rid' + e.target.getAttribute('commentid')).style.display = "none";
          })
          .catch((error) => {
              console.log(error.message);
          });
  }
};
const handlereply = (i, e) => {
  setValues(prevState => ({
      ...prevState,
      values: {
          ...prevState.values,
          [i]: e.target.value
      }
  }));
};
const commentSubmit = (i, e) => {
  e.preventDefault();

  if (!comments) {
    swal('Oops!', 'Please fill the comment field', 'error');
    return;
  }

 
  let userid = JSON.parse(window.localStorage.getItem('user'));
  const formData = new FormData();
  formData.append('userid', userid.value);
  formData.append('comment', comments[i]);
  formData.append('hidecomment',hidecomment[i]);
  formData.append('feedname', data[i].username);
  formData.append('feedemail', data[i].useremail);
  formData.append('postuser', data[i].postuser);
  formData.append('posts', data[i].posts);
  formData.append('sendername', input.name);
  formData.append('senderemail', input.email);
  formData.append('feedid', e.target.attributes['data-tag'].value);

  axios.post('https://domaintobesocial.com/domaintobestart/commentsonfeeds', formData)
    .then((res) => {
      if (res.data.message === 'success') {
        setComments('');
        e.target.reset();
setUpdate(update+1)
        // Assuming you have a function to update the component state after comment submission
        // Update this line accordingly based on your component structure
        // Example: updateCommentsState();
      } else {
        swal('Oops!', res.data.message, 'error');
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};


const handleHidecomment = (i, e) => {
  if (e.target.checked) {
      setHideComment(prevState => ({
          ...prevState,
          [i]: e.target.value
      }));
  } else {
      const newState = { ...hidecomment };
      delete newState[i];
      setHideComment(newState);
  }
};

const handleGetreply = (i, e) => {
  setComments(prevState => ({
      ...prevState,
      [i]: e.target.value
  }));
};
const handleReportSubmit = (event) => {
  event.preventDefault();
  if (validates()) {
      if (formfilled === 'empty') {
          alert('Complete your personal details');
          window.location = "/userprofile";
          return false;
      } else {
          const userId = JSON.parse(window.localStorage.getItem("user"));
          const routeState = JSON.parse(window.localStorage.getItem("routeState"));
          const formData = new FormData();
          formData.append('userid', userId.value);
          formData.append('feedid', event.target.attributes['data-id'].value);      
          formData.append('commentid', event.target.attributes['commentid'].value);
          formData.append('category', input.category);
          formData.append('description', input.description);
          axios.post('https://domaintobesocial.com/domaintobestart/postcommentreports', formData)
              .then((res) => {
                  if (res.data.message === 'success') {
                    setUpdate(update+1)
                      swal("Successfully", "Report Submit", "success");
                      window.location.reload();
                  } else {
                      alert(res.data.message);
                  }
              })
              .catch((error) => {
                  console.log(error.message);
              });
      }
  }
};
const validates = () => {
  let currentInput = input;
  let currentErrors = {};
  let isValid = true;
  if (!currentInput["category"]) {
      isValid = false;
      currentErrors["category"] = "Category field is required.";
  }
  if (!currentInput["description"]) {
      isValid = false;
      currentErrors["description"] = "Description is required.";
  }
  setErrors(currentErrors);
  return isValid;
};
const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div className='in_center in_center_discussion'>
      <div className="listusr">
        <div className="test">
          {data.map((result, i) => (
            <div key={i}>
              {/* <a onClick={() => postLike(i, result.id)}>
                        {result.userlike === '1' ? (
                            <img className="hearticon" src="images/iconS8.png" align="icon" style={{ filter: 'none' }} />
                        ) : (
                            <img className="hearticon" src="images/iconS8.png" align="icon" />
                        )}
                    </a> */}
              <div className="asuser">
                <Link to={{ pathname: '/viewprofile/' + result.username }}>
                  <span className="userimg">
                    <img src={result.userimage} align="icon" />
                  </span>
                </Link>
                <h5>
                  <Link to={{ pathname: '/viewprofile/' + result.username }}>{result.username}</Link>{' '}
                  {result.counttaguser === 2 ? (
                    <span>
                      is with{' '}
                      {result.taggedusers.map((taggeduser, i) => (
                        <Link to={{ pathname: '/viewprofile/' + taggeduser.name }} key={i}>{taggeduser.name}</Link>
                      ))}
                    </span>
                  ) : (
                    ''
                  )}
                </h5>
                <p>{result.created} Ago</p>
                <p dangerouslySetInnerHTML={{ __html: result.posts }} />
                {result.url && result.url.split('/')[2] === 'youtu.be' && (
                  <iframe
                    width="100%"
                    height="400px"
                    src={'https://www.youtube.com/embed/' + result.url.split('/')[3]}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
                <div className="row">
                  {result.images.map((galleryimage, i) => (
                    <div className="col-6 col-sm-4 col-lg-3" key={i}>
                      <div className="testin">
                        <img className="w-100" src={galleryimage.image} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row">
                  {result.videos.map((galleryvideos, i) => (
                    <div className="col-6 col-sm-4 col-lg-3" key={i}>
                      <div className="testin">
                        <video width="320" height="240" controls>
                          <source src={galleryvideos.videos} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="likecomment">
                  <li>
                    <img src="images/like.png" alt="ion" /> {result.likes}
                  </li>
                  <li>
                    <img src="images/comment.png" alt="ion" /> {result.comments}
                  </li>
                </ul>
                <div className="allcomment">
      {result.sendcomments.length > 0 ? result.sendcomments.map((object, index) => (
        <>
          {object.hidecomment === "1" && isViprole !== false ? (
            <div className="commentin" key={index}>
              <Link to={{ pathname: '/viewprofile/' + object.name }}>
                <span className="userimg">
                  <img className="w-100" src={object.image} align="icon" />
                </span>
              </Link>
              <h5>
                <Link to={{ pathname: '/viewprofile/' + object.name }}>{object.name}</Link>
                <button
                  className="reportbtn"
                  data-toggle="modal"
                  data-target={`#exampleModalHelp${object.id}`}
                >
                  Report
                </button>
              </h5>
              <p>{object.comment} (<span>{object.created} Ago</span>)</p>
              <ul className="likecomment">
                <li style={{ cursor: 'pointer' }} onClick={() => commentLike(i, object.id, result.id)}>
                  <img src="images/like1.png" alt="ion" />
                  {object.clike}
                </li>
                <li style={{ cursor: 'pointer' }} onClick={() => openReplycomment(i, object.id, result.id)}>
                  <img src="images/reply.png" alt="ion" /> Reply
                </li>
              </ul>

              <form className="replyid" id={'rid' + object.id} onSubmit={(e) => handleReplysubmit(i, e)} data-id={result.id} commentid={object.id}>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Your Comment..."
                  aria-label="Search"
                  autoComplete="off"
                  id={'reply' + object.id}
                  name={''} // Add correct name here
                  value={''} // Add correct value here
                  onChange={(e) => handlereply(i, e)}
                />
                <button className="comment" type="submit">
                  <span className="send">
                    <img src="images/send.png" alt="ion" />
                  </span>
                  <span>Comment</span>
                </button>
              </form>

              <div className="modal fade" id={`exampleModalHelp${object.id}`} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content HelpForm">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Report</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form onSubmit={handleReportSubmit} data-id={result.id} commentid={object.id}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <h6>Categories {errors.category ? <span style={{ color: "red" }}>*</span> : ''}</h6>
                              <select value={input.category} onChange={handleChange} name="category" id="category">
                                <option key="" value="">--Select Category--</option>
                                <option key="Abusive" value="Abusive">Abusive</option>
                                <option key="Adult" value="Adult">Adult</option>
                                <option key="Others" value="Others">Others</option>
                              </select>
                              <div className="text-danger">{errors.category}</div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <h6>Description {errors.description ? <span style={{ color: "red" }}>*</span> : ''}</h6>
                              <textarea placeholder="Description" value={input.description} onChange={handleChange} id="description" name="description"></textarea>
                              <div className="text-danger">{errors.description}</div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary submit">Submit</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <>
            </>
          )}
        </>
      )) : (
        <></> // Add alternate content if there are no comments
      )}
    </div>
        <div className="likeshare">
            <form onSubmit={(e) => commentSubmit(i, e)} data-tag={result.id} id={result.id}>
                {isViprole ? <div className="pcheck"><input type="checkbox" value="1" onChange={(e) => handleHidecomment(i, e)} />Hide comment</div> : null}
                <input id={'comments' + result.id} className="form-control me-2" type="text" placeholder="Your Comment..." aria-label="Search" value={comments[i]} name={comments[i]} onChange={(e) => handleGetreply(i, e)} autoComplete="off" />
                <button className="comment" type="submit"><span className="send"><img src="images/send.png" alt="ion" /></span><span>Comment</span></button>
            </form>
        </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notification
