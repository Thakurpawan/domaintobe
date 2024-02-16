import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import swal from 'sweetalert';
import EmojiPicker from 'emoji-picker-react';
// Import Firebase if needed
import $ from 'jquery';
function EditPost(props) {
  const [input, setInput] = useState({ search: '' });
  const [searcheddata, setSearchedData] = useState([]);
  const [update, setupdate] = useState(0);
  const [data, setData] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState([]);
  const [videosPreviewUrls, setVideosPreviewUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [formfilled, setFormFilled] = useState('notempty');
  const [chatingdata, setChatingdata] = useState([]);
  const [messagenotificationcount, setMessagenotificationcount] = useState({});
  const [isViprole, setIsViprole] = useState(false);
  const [userimage, setUserimage] = useState('../../images/blank.png');
  const [friendsdata, setFriendsdata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [profession, setProfession] = useState([]);
  const curentlogin = JSON.parse(window.localStorage.getItem('user'));
  const today = new Date().toLocaleDateString();
  const [childVisible, setChildVisible] = useState(false);
  const [query, setQuery] = useState({ tagsearch: '' });
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get('id');
  useEffect(() => {



    const fetchData = async () => {
      try {
        const curentlogin = JSON.parse(window.localStorage.getItem("user"));
        const formData1 = new FormData();
        formData1.append('uid', curentlogin.value);
        formData1.append('pid', id);

        const response = await axios.post('https://domaintobesocial.com/domaintobestart/getFeedById', formData1);

        if (response.data.details.length === 0) {
          setData(response.data.details);
        } else {
          setData(response.data.details);
          setEnteredText(response.data.details.posts);
          setImagesPreviewUrls(response.data.details.images.split(','));
          setVideosPreviewUrls(response.data.details.videos.split(','));
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchData();
  }, [location.search, update]);


  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('search', input.search);
    axios.post(
      'https://domaintobesocial.com/domaintobestart/searchnewsfeed',
      formData
    )
      .then((res) => {
        setSearchedData(res.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const postClick = (i) => {
    document.getElementById('loadingicon').style.display = 'block';
    const formData = new FormData();
    formData.append('id', i);
    axios.post(
      'https://domaintobesocial.com/domaintobestart/getuserspostsbyid',
      formData
    )
      .then((res) => {
        setData(res.data.message);
        setSearchedData([]);
        document.getElementById('loadingicon').style.display = 'none';
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Assuming 'loadingicon' is an element in your JSX, you can set its initial display style
  useEffect(() => {
    document.getElementById('loadingicon').style.display = 'none';
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (formfilled === 'empty') {
        alert('Complete your personal details');
        window.location = '/userprofile';
        return false;
      } else {
        document.getElementById('loadingicon').style.display = 'block';

        // Function to convert post content to HTML with URLs converted to links
        const urlify = (postcontent) => {
          const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
          return postcontent.toString().replace(urlRegex, (url) => {
            return `<a href="${url}" >${url}</a>`;
          });
        };

        // Convert post content to HTML
        const postcontent = enteredText;
        const html = urlify(postcontent);

        const obj = JSON.parse(window.localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('userid', obj.value);
        formData.append('postid', id);
        formData.append('post', html);
        formData.append('tagged', checkedItems);
        formData.append('selectVideo', JSON.stringify(videosPreviewUrls));
        formData.append('selectImage', JSON.stringify(imagesPreviewUrls));

        files.forEach((file) => formData.append('files[]', file));
        videos.forEach((file) => formData.append('videos[]', file));
        formData.append('tagged', JSON.stringify(checkedItems));

        axios.post('https://domaintobesocial.com/domaintobestart/updatenewsfeed', formData)
          .then((res) => {
            let data = res.data.message
            console.log(data)
            document.getElementById('loadingicon').style.display = 'none';
            setEnteredText('');
            setImagesPreviewUrls([]);
            setVideosPreviewUrls([]);
            if (data === 'success') {
              swal("success", "success update", "success")
              setupdate(update + 1)
            } else {
              alert(data);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
  };
  const validate = () => {
    let inputLength = enteredText.length;
    let errors = {};
    let isValid = true;

    if (inputLength === 0) {
      isValid = false;
      errors["post"] = "Please enter post data.";
    }

    setErrors(errors);
    return isValid;
  };

  const updateState = (e) => {
    let myArr = e.target.value.split(",");
    myArr = myArr.filter(item => item);
    setEnteredText(myArr);
  };

  const removeImage = (i) => {
    const newArray = [...imagesPreviewUrls];
    newArray.splice(i, 1);
    setImagesPreviewUrls(newArray);
  };

  const removeVideo = (i) => {
    const newArray = [...videosPreviewUrls];
    newArray.splice(i, 1);
    setVideosPreviewUrls(newArray);
  };

  const _handleImageChange = (e) => {
    e.preventDefault();
    let newFiles = Array.from(e.target.files);

    newFiles.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        const filesize = Math.round((file.size / 1024));
        if (filesize > 2048) {
          swal("Oops!", "File too large, please select a file less than 2mb", 'error');
        } else {
          setFiles(prevFiles => [...prevFiles, file]);
          setImagesPreviewUrls(prevUrls => [...prevUrls, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    });
  };

  const _handleVideoChange = (e) => {
    e.preventDefault();
    let newFiles = Array.from(e.target.files);

    newFiles.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        const filesize = Math.round((file.size / 1024));
        if (filesize > 2048) {
          swal("Oops!", "File too large, please select a file less than 2mb", 'error');
        } else {
          setVideos(prevVideos => [...prevVideos, file]);
          setVideosPreviewUrls(prevUrls => [...prevUrls, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    });
  };

  const onClick = () => {
    setChildVisible(prevVisible => !prevVisible);
  };

  const onEmojiClick = (event, emojiObject) => {
    setEnteredText(prevText => [...prevText, emojiObject.emoji]);
    // Alternatively, if you want to replace the existing text with the emoji:
    // setEnteredText([emojiObject.emoji]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuery(prevQuery => ({ ...prevQuery, [name]: value }));

    // Perform API call if tagsearch has more than 1 character
    if (value.length > 1) {
      let curentlogin = JSON.parse(window.localStorage.getItem("user"));
      const formData2 = new FormData();
      formData2.append('id', curentlogin.value);
      formData2.append('key', value);

      axios.post('https://domaintobesocial.com/domaintobestart/searchtagusers', formData2)
        .then((resp) => {
          setFriendsdata(resp.data.message);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const updateStateList = (e, value, id, image) => {
    if (e.target.checked) {
      // Append to array
      setCheckedItems(prevCheckedItems => [
        ...prevCheckedItems,
        {
          name: value,
          id: id,
          image: image
        }
      ]);
    } else {
      // Remove from array
      setCheckedItems(prevCheckedItems =>
        prevCheckedItems.filter(element => value !== element.name)
      );
    }
  };

  return (
    <div>
      <div className="in_center">
        <div className="head">
          <form className="d-flex" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search" name="search" aria-label="Search" autoComplete="off" onChange={handleChange} value={input.search} />
            <button className="btn" type="submit"><img src="../images/searchicon.png" alt="icon" /> </button>
            <div className="setsearchdata">
              <ul>
                {searcheddata.map((results) => {
                  return (
                    <li className="postsearch" onClick={(e) => postClick(results.id)}>{results.posts}<i className="fas fa-arrow-right"></i></li>
                  )
                })}
              </ul>
            </div>
          </form>
          <Link to="/createpost" className="hpl"><img src="../images/iconS2.png" align="icon" /> <span>Start Discussion</span></Link>
        </div>

        <div className="addpost">
          <h3>Edit post</h3>
          <div className="addhead">
            <div className="loadingicon" id="loadingicon"><img src="../../images/loading.gif" /></div>
            <form className="d-flex" onSubmit={handleSubmit}>
              <Link to="/userprofile" ><span className="userimg"><img src={userimage} align="icon" /></span></Link>
              <textarea name="post" className="form-control " placeholder="Type What are you Thinking..." id="post" value={enteredText} onChange={updateState}></textarea>
              <div className="text-danger">{errors.post}</div>

              <div className="maindivkap">
                <div className="row">
                  {imagesPreviewUrls.map((imagePreviewUrl, i) => {
                    return <div className="col-4 col-sm-3 col-lg-2" onClick={(e) => removeImage(i)}><div className="imgg"><i className="fa fa-times" ></i><img className="upim w-100" key={imagePreviewUrl} alt='previewImg' src={imagePreviewUrl} /></div></div>
                  })}

                  {videosPreviewUrls.map((videoPreviewUrl, i) => {
                    return <div className="col-sm-3 col-lg-2"><div className="imgg"><i className="fa fa-times" onClick={(e) => removeVideo(i)}></i><video width="320" height="240" controls><source src={videoPreviewUrl} type="video/mp4" /></video></div></div>
                  })}


                </div>
              </div>
              <ul>
                <li><input type="file" name="" onChange={_handleImageChange} multiple accept="image/*" /><img src="../images/addicon1.png" align="icon" /></li>
                <li><input type="file" name="" onChange={_handleVideoChange} multiple accept="video/*" /><img src="../images/addicon2.png" align="icon" /></li>

                <li className="dropdown" data-toggle="modal" data-target="#exampleModalHelp"><span ><img src="../images/addicon3.png" align="icon" /></span>
                </li>


                <li className="dropdown"><span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  <img src="../images/addicon4.png" align="icon" />
                </span>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start">
                    <input type="text" className="form-control linkurl" name="url" placeholder="Add Url" onChange={handleChange} id="url" value={input.url} />

                  </div>
                </li>
                <li onClick={() => onClick()}><img src="../images/addicon5.png" align="icon" /></li>
              </ul>
              <button className="btn" type="submit">Update</button>
            </form>
          </div>

          {/* <div className="appendusers">
                        {checkedItems.map((checkedItem,index) => {
                            return (
                                <div className="item">
                                    <i className="fa fa-times"></i>
        
                                    {checkedItem.image ? (
                                        <span className="usersimage"><img className="w-100" src={checkedItem.image} align="icon"/></span>
                                        ) : (
                                        <span className="usersimage"><img className="w-100" src="../images/userimg2.jpg" align="icon"/></span>
                                    )}
                                    
                                    <h5>{checkedItem.name}</h5>
        
                                </div>
                            );
                        })}
                        </div> */}
        </div>

        {
          childVisible
            ? <EmojiPicker onEmojiClick={onEmojiClick.bind()} />
            : null
        }

        {/* {data.length > 0  ? 
                    
                    <div className="listusr">
                        
                   
                    </div>
                    
                    : <div className="loadingicon" id="loadingicon" style={{display:'block'}}><img src="../../images/loading.gif" /></div>
                    
                    } */}

      </div>

      <div className="modal fade" id="exampleModalHelp" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content HelpForm">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Users List</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="tagfriends">
                <input type="text" className="form-control" placeholder="Search user..." autoComplete="off" value={query.tagsearch} name="tagsearch" onChange={handleInputChange} />
                <ul>
                  {friendsdata.map((result, i) => {
                    return (
                      <li>
                        <label className="checkcontainer"><input
                          key={result.name}
                          type="checkbox" name="checkbox" onClick={(e) => updateStateList(e, result.name, result.friendid, result.image)} /><span className="radiobtn"></span></label>
                        <b>
                          <img src={result.image} /></b>{result.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditPost
