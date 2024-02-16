import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Picker from "emoji-picker-react";
import ReadMoreReact from "read-more-react";
// import firebase from 'firebase';
import $ from "jquery";
import swal from "sweetalert";
import Searchbar from "../Searchbar/Searchbar";
// import 'firebase/messaging';

const Userdashboard = () => {
  const [update, setUpdate] = useState(0)
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const [isViprole, setIsViprole] = useState(false);
  const [userimage, setUserimage] = useState("/images/blank.png");
  const [comments, setComments] = useState("");
  const [hidecomment, setHidecomment] = useState("");
  const [values, setValues] = useState("");
  const [chatimages, setChatimages] = useState("");
  const [formfilled, setFormfilled] = useState("notempty");
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState([]);
  const [imagesPreviewUrls2, setImagesPreviewUrls2] = useState([]);
  const [videosPreviewUrls, setVideosPreviewUrls] = useState([]);
  const [videos, setVideos] = useState([]);
  const [enteredText, setEnteredText] = useState([]);
  const [friendsdata, setFriendsdata] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [childVisible, setChildVisible] = useState(false);
  const [chatingdata, setChatingdata] = useState([]);
  const [showdata, setShowdata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popupchat, setPopupchat] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [searcheddata, setSearcheddata] = useState([]);
  const [profession, setProfession] = useState([]);
  const [query, setQuery] = useState({});
  const [notificationcount, setNotificationcount] = useState("");
  const [searchoption, setSearchoption] = useState("");
  const [filterValue, setFilterValue] = useState(null);
  const [subcategory, setSubcategory] = useState("");
  const [professionsubcategory, setProfessionsubcategory] = useState("");
  const [commentinput, setCommentinput] = useState(false);
  const [commentdataid, setCommentdataid] = useState("");
  const [messagenotificationcount, setMessagenotificationcount] = useState([]);
  const [blockdata, setBlockdata] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [userImage, setUserImage] = useState("/images/blank.png");
  const myRef = useRef();
  const navigate = useNavigate();
  let curentlogin = JSON.parse(window.localStorage.getItem("user"));
  let handleHideComment = (i, e) => {
    if (e.target.checked) {
      hidecomment.setState({
        hidecomment: { ...hidecomment.state.values, [i]: e.target.value }
      });
    } else {
      hidecomment.setState({
        hidecomment: { ...hidecomment.state.values, [i]: '' }
      });
    }
  }

  const handleGetreply = (i, e) => {
    setComments((prevComments) => ({ ...prevComments, [i]: e.target.value }));
  };

  const commentSubmit = (i, e) => {
    e.preventDefault();

    if (!comments) {
      swal('Oops!', 'Please fill the comment field', 'error');
      return;
    }

    document.getElementById('loadingicon').style.display = 'block';
    console.log(comments)
    alert(comments)
    let userid = JSON.parse(window.localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('userid', userid.value);
    formData.append('comment', comments[i]);
    formData.append('hidecomment', hidecomment[i]);
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
          document.getElementById('loadingicon').style.display = 'none';
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
  //   useEffect(() => {
  //     blockdatashow();
  //   }, []);
  const postLike = (i, id) => {
    if (formfilled === 'empty') {
      alert('Complete your personal details');
      window.location = "/userprofile";
      return false;
    } else {
      document.getElementById('loadingicon').style.display = 'block';
      const userId = JSON.parse(window.localStorage.getItem("user"));
      const formData = new FormData();

      formData.append('userid', userId.value);
      formData.append('postid', id);
      formData.append('feedname', data[i].username);
      formData.append('feedemail', data[i].useremail);
      formData.append('postuser', data[i].postuser);
      formData.append('posts', data[i].posts);
      formData.append('sendername', input.name);
      formData.append('senderemail', input.email);

      axios.post('https://domaintobesocial.com/domaintobestart/postlike', formData)
        .then((res) => {
          if (res.data.message === 'success') {
            setUpdate(update + 1)
            document.getElementById('loadingicon').style.display = 'none';
            // window.location.reload();
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const _handleImageChange = (e) => {
    e.preventDefault();
    let newFiles = Array.from(e.target.files);

    newFiles.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        const filesize = Math.round(file.size / 1024);
        if (filesize > 200048) {
          swal(
            "!Oops",
            "File too large, please select a file less than 2mb",
            "error"
          );
        } else {
          setFiles((prevFiles) => [...prevFiles, file]);
          setImagesPreviewUrls((prevUrls) => [...prevUrls, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
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
              setUpdate(update + 1)
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
  const _handleVideoChange = (e) => {
    e.preventDefault();
    let newFiles = Array.from(e.target.files);

    newFiles.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        const filesize = Math.round(file.size / 1024);
        if (filesize > 200048) {
          alert("File too large, please select a file less than 2mb");
        } else {
          setVideos((prevVideos) => [...prevVideos, file]);
          setVideosPreviewUrls((prevUrls) => [...prevUrls, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleClick = () => {
    setChildVisible((prevChildVisible) => !prevChildVisible);
  };
  const parseURLParams = (url) => {
    var queryStart = url.indexOf("?") + 1,
      queryEnd = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {},
      i,
      n,
      v,
      nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlString = window.location.href;
        const urlParams = parseURLParams(urlString);

        if (urlParams?.comment) {
          // setLoading(true);

          const formData = new FormData();
          formData.append("search", urlParams.comment[0]);

          const searchRes = await axios.post(
            "https://domaintobesocial.com/domaintobestart/searchnewsfeed",
            formData
          );
          console.log("searchNewFeed", searchRes.data.message);

          setSearchedData(searchRes.data.message);

          const userPostsFormData = new FormData();
          userPostsFormData.append("id", searchRes.data.message[0]?.id);

          const userPostsRes = await axios.post(
            "https://domaintobesocial.com/domaintobestart/getuserspostsbyid",
            userPostsFormData
          );
          console.log("res", userPostsRes);

          setData(userPostsRes.data.message);
          setSearchedData([]);
          // setLoading(false);
        } else {
          const formData1 = new FormData();
          formData1.append("id", curentlogin.value);

          const newFeedsRes = await axios.post(
            "https://domaintobesocial.com/domaintobestart/getnewfeeds",
            formData1
          );
          if (newFeedsRes.data.message !== "false") {
            setData(newFeedsRes.data.message);
          }

          // setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
        // setLoading(false);
      }

      try {
        const formData = new FormData();
        formData.append("id", curentlogin.value);
        formData.append("user", curentlogin.value);

        const response = await axios.post(
          "https://domaintobesocial.com/domaintobestart/getuserprofile",
          formData
        );

        setInput({
          name: response.data.message.name,
          email: response.data.message.email,
          uid: response.data.message.id,
        });

        setFormfilled(response.data.message.formfilled);

        if (response.data.message.roles === "vip") {
          setIsViprole(true);
        } else {
          setIsViprole(false);
        }

        setUserimage(response.data.message.image || "/images/blank.png");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [update]);

  const handleZoom = (index) => {
    setZoomedIndex(index === zoomedIndex ? null : index);
  };
  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("search", input.search);

      if (searchoption === "user") {
        const response = await axios.post(
          "https://domaintobesocial.com/domaintobestart/getusers",
          formData
        );
        setSearchedData(response.data.message);
      } else {
        formData.append("vip", searchoption === "vip" ? "3" : "");
        const response = await axios.post(
          "https://domaintobesocial.com/domaintobestart/searchnewsfeed",
          formData
        );
        setSearchedData(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validate = () => {
      let isValid = true;
      let newErrors = {};

      if (enteredText.length === 0) {
        isValid = false;
        newErrors["post"] = "Please enter post data.";
      }

      setErrors(newErrors);

      return isValid;
    };
    const urlify = (postcontent) => {
      const urlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      return postcontent.toString().replace(urlRegex, (url) => {
        return `<a href="${url}" >${url}</a>`;
      });
    };
    if (validate()) {
      if (formfilled === "empty") {
        window.location = "/userprofile";
        return false;
      } else {
        document.getElementById("loadingicon").style.display = "block";

        const html = urlify(enteredText);

        const obj = JSON.parse(window.localStorage.getItem("user"));
        const formData = new FormData();
        formData.append("userid", obj.value);
        formData.append("post", html);
        formData.append("tagged", checkedItems);
        formData.append("url", input.url);
        files.forEach((file) => formData.append("files[]", file));
        videos.forEach((file) => formData.append("videos[]", file));
        formData.append("tagged", JSON.stringify(checkedItems));

        try {
          const res = await axios.post(
            "https://domaintobesocial.com/domaintobestart/savenewsfeed",
            formData
          );

          document.getElementById("loadingicon").style.display = "none";
          setEnteredText("");
          setImagesPreviewUrls([]);
          setVideosPreviewUrls([]);
          setFiles([]);
          setVideos([]);

          if (res.data.message === "success") {
            setUpdate(update + 1)
          } else {
            alert(res.data.message);
          }
        } catch (error) {
          console.error("Error submitting data:", error.message);
        }
      }
    }
  };
  const updateState = (e) => {
    let myArr = e.target.value.split(",");
    myArr = myArr.filter((item) => item);

    setEnteredText(myArr);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setEnteredText((prevEnteredText) => [
      ...prevEnteredText,
      emojiObject.emoji,
    ]);
  };

  const handleReply = (i, e) => {
    setValues(prevValues => ({ ...prevValues, [i]: e.target.value }));
  };
  const handleReplySubmit = (i, e) => {
    e.preventDefault();

    if (formfilled === "empty") {
      alert("Complete your personal details");
      window.location = "/userprofile";
      return false;
    } else {
      const userId = JSON.parse(window.localStorage.getItem("user"));
      const formData = new FormData();

      formData.append("userid", userId.value);
      formData.append("commentid", e.target.attributes["commentid"].value);
      formData.append("postid", e.target.attributes["data-id"].value);
      formData.append("comment", values[i]);

      axios
        .post(
          "https://domaintobesocial.com/domaintobestart/postreplycomment",
          formData
        )
        .then((res) => {
          if (res.data.message === "success") {
            setUpdate(update + 1)
          } else {
            alert(res.data.message);
          }

          document.getElementById(
            "rid" + e.target.attributes["commentid"].value
          ).style.display = "none";
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="in_center">
      <div className="head">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Post Name and User by Name"
            name="search"
            aria-label="Search"
            autoComplete="off"
            onChange={handleChange}
            value={input.search}
          />
          <select
            onChange={(e) => {
              setSearchoption(e.target.value);
            }}
          >
            <option value="">Select one...</option>
            <option value="user">user</option>
            <option value="vip">Vip</option>
            <option value="post">post</option>
          </select>
          <button className="btn" type="submit">
            <img src="images/searchicon.png" alt="icon" />{" "}
          </button>
          <div className="setsearchdata">
            <ul>
              {searchedData[0] != "data" ? (
                searchedData.map((results) => {
                  return (
                    <>
                      {results.posts ? (
                        <li
                          className="postsearch"
                          onClick={(e) => this.postClick(results.id)}
                          key={results.id}
                        >
                          {results.posts}
                          <i id={results.id} className="fas fa-arrow-right"></i>
                        </li>
                      ) : results.name ? (
                        <Link
                          className="postsearch"
                          to={{ pathname: "/viewprofile/" + results.name }}
                        >
                          {results.name}
                        </Link>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              ) : (
                <>
                  <li>data not found</li>
                </>
              )}
            </ul>
          </div>
        </form>
        <Link to="/createpost" className="hpl">
          <img src="images/iconS2.png" align="icon" />{" "}
          <span>Start Discussion</span>
        </Link>
      </div>
      <div className="addpost">
        <h3>Add post</h3>
        <div className="addhead">
          <div className="loadingicon" id="loadingicon">
            <img src="/images/loading.gif" />
          </div>
          <form className="d-flex" onSubmit={handleSubmit}>
            <Link to="/userprofile">
              <span className="userimg">
                <img src={userimage} align="icon" />
              </span>
            </Link>
            <textarea
              name="post"
              className="form-control "
              placeholder="Type What are you Thinking..."
              id="post"
              value={enteredText}
              onChange={updateState}
            ></textarea>
            <div className="text-danger">{errors.post}</div>

            <div className="maindivkap">
              <div className="row">
                {imagesPreviewUrls.map((imagePreviewUrl, i) => {
                  return (
                    <div
                      className="col-4 col-sm-3 col-lg-2"
                      onClick={(e) => this.removeImage(i)}
                    >
                      <div className="imgg">
                        <i className="fa fa-times"></i>
                        <img
                          className="upim w-100"
                          key={imagePreviewUrl}
                          alt="previewImg"
                          src={imagePreviewUrl}
                        />
                      </div>
                    </div>
                  );
                })}

                {videosPreviewUrls.map((videoPreviewUrl, i) => {
                  return (
                    <div className="col-sm-3 col-lg-2">
                      <div className="imgg">
                        <i
                          className="fa fa-times"
                          onClick={(e) => this.removeVideo(i)}
                        ></i>
                        <video width="320" height="240" controls>
                          <source src={videoPreviewUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <ul>
              <li>
                <input
                  type="file"
                  name=""
                  onChange={_handleImageChange}
                  multiple
                  accept="image/*"
                />
                <img src="images/addicon1.png" align="icon" />
              </li>
              {isViprole ? (
                <>
                  <li>
                    <input
                      type="file"
                      name=""
                      onChange={_handleVideoChange}
                      multiple
                      accept="video/*"
                    />
                    <img src="images/addicon2.png" align="icon" />
                  </li>

                  <li
                    className="dropdown"
                    data-toggle="modal"
                    data-target="#exampleModalHelp"
                  >
                    <span>
                      <img src="images/addicon3.png" align="icon" />
                    </span>
                  </li>

                  <li className="dropdown">
                    <span
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <img src="images/addicon4.png" align="icon" />
                    </span>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      x-placement="bottom-start"
                    >
                      <input
                        type="text"
                        className="form-control linkurl"
                        name="url"
                        placeholder="Add Url"
                        onChange={handleChange}
                        id="url"
                        value={input.url}
                      />
                    </div>
                  </li>
                </>
              ) : (
                ""
              )}
              <li onClick={handleClick}>
                <img src="images/addicon5.png" align="icon" />
              </li>
            </ul>
            <button className="btn" type="submit">
              Post
            </button>
          </form>
        </div>

        <div className="appendusers">
          {checkedItems.map((checkedItem, index) => {
            console.log(checkedItems);
            return (
              <div className="item">
                <i className="fa fa-times"></i>

                {checkedItem.image ? (
                  <span className="usersimage">
                    <img
                      className="w-100"
                      src={checkedItem.image}
                      align="icon"
                    />
                  </span>
                ) : (
                  <span className="usersimage">
                    <img
                      className="w-100"
                      src="images/userimg2.jpg"
                      align="icon"
                    />
                  </span>
                )}

                <h5>{checkedItem.name}</h5>
              </div>
            );
          })}
        </div>
      </div>
      {childVisible && <Picker onEmojiClick={onEmojiClick} />}
      {data.length > 0 ? (
        <div className="listusr">
          {data.map((result, i) => {
            return (
              <>
                {blockdata &&
                  blockdata.filter(
                    (item) =>
                      item.friendid.includes(result.postuser) && item.status == 1
                  ).length > 0 ? (
                  ""
                ) : (
                  <div className="test" key={i}>
                    <a onClick={() => postLike(i, result.id)}>
                      {result.userlike == "1" ? (
                        <img
                          className="hearticon"
                          src="images/iconS8.png"
                          align="icon"
                          style={{ filter: "none" }}
                        />
                      ) : (
                        <img
                          className="hearticon"
                          src="images/iconS8.png"
                          align="icon"
                        />
                      )}
                    </a>
                    <div className="asuser">
                      <Link
                        to={{ pathname: "/viewprofile/" + result.username }}
                      >
                        <span className="userimg">
                          <img
                            src={result.userimage ? result.userimage : ""}
                            align="icon"
                          />
                        </span>
                      </Link>

                      <h5>
                        <Link
                          to={{ pathname: "/viewprofile/" + result.username }}
                        >
                          {result.username}
                        </Link>{" "}
                        {result.counttaguser == 2 ? (
                          <span>
                            is with{" "}
                            {result.taggedusers.map((taggeduser, i) => (
                              <Link
                                to={{
                                  pathname: "/viewprofile/" + taggeduser.name,
                                }}
                              >
                                {taggeduser.name}
                              </Link>
                            ))}
                          </span>
                        ) : (
                          ""
                        )}
                      </h5>

                      <p>{result.created} Ago</p>
                      {/* <div className="dropdown">
                                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-h"></i>
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div> */}
                      {result.posts.length > 100 ? (
                        <ReadMoreReact
                          text={result.posts ? result.posts : ""}
                          numberOfLines={3}
                          showLessButton={true}
                          readMoreText="click here to read more"
                        />
                      ) : (
                        result.posts
                      )}

                      {/* <p dangerouslySetInnerHTML={{__html: result.posts}} /> */}
                      <div className="row">
                        {result.images.map((galleryimage, i) => (

                          <div className="col-6 col-sm-8 col-md-4 col-lg-6" key={galleryimage.image}>

                            <div className="testin">
                              <div className="zoom-image-container">
                                <img
                                  className={`zoom-image ${galleryimage.image === zoomedIndex ? " zoomed" : ""}`}
                                  src={galleryimage.image}
                                  onClick={() => handleZoom(galleryimage.image)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="row">
                        {result.videos.map((galleryvideos, i) => (
                          <div className="col-6 col-sm-8 col-md-4 col-lg-6">
                            <div className="testin">
                              <video width="320" height="240" controls>
                                <source
                                  src={galleryvideos.videos}
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        {result.url &&
                          result.url.split("/")[2] == "youtu.be" ? (
                          <>
                            <iframe
                              width="100%"
                              height="400px"
                              src={
                                "https://www.youtube.com/embed/" +
                                result.url.split("/")[3]
                              }
                              title="YouTube video player"
                              allowFullScreen
                            ></iframe>
                          </>
                        ) : result.url.split("/")[2] == "www.youtube.com" &&
                          result.url.split("/")[3] == "live" ? (
                          <>
                            <iframe
                              width="100%"
                              height="400px"
                              src={
                                "https://www.youtube.com/embed/" +
                                result.url.split("/")[4]
                              }
                              title="YouTube video player"
                              allow="autoplay"
                              allowFullScreen
                            ></iframe>
                          </>
                        ) : result.url.split("/")[2] == "rumble.com" ? (
                          <iframe
                            width="100%"
                            height="400px"
                            src={
                              "https://rumble.com/embed/" +
                              result.url.split("/")[4]
                            }
                            title="YouTube video player"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          ""
                        )}
                      </div>

                      <ul className="likecomment">
                        <li>
                          <img
                            src="images/like.png"
                            alt="ion"
                            onClick={() => postLike(i, result.id)}
                          />{" "}
                          {result.likes}
                        </li>
                        <li>
                          <img
                            src="images/comment.png"
                            alt="ion"
                            onClick={(e) => {
                              setCommentinput(prevState => !prevState);
                              setCommentdataid(result.id);
                            }}
                          />

                          {result.comments}
                        </li>
                      </ul>

                      <div className="allcomment">
                        {result.sendcomments.length > 0
                          ? result.sendcomments.map((object, i) => (
                            <>

                              {object.hidecomment == "1" &&
                                isViprole !== false ? (
                                <div className="commentin">
                                  <Link
                                    to={{
                                      pathname: "/viewprofile/" + object.name,
                                    }}
                                  >
                                    <span className="userimg">
                                      <img
                                        className="w-100"
                                        src={object.image}
                                        align="icon"
                                      />
                                    </span>
                                  </Link>
                                  <h5>
                                    <Link
                                      to={{
                                        pathname:
                                          "/viewprofile/" + object.name,
                                      }}
                                    >
                                      {object.name}
                                    </Link>
                                    <a
                                      className="reportbtn"
                                      data-toggle="modal"
                                      data-target={
                                        "#exampleModalHelp" + object.id
                                      }
                                    >
                                      Report
                                    </a>
                                  </h5>
                                  <p>
                                    {object.comment} (
                                    <span>{object.created} Ago</span>)
                                  </p>
                                  <ul className="likecomment">
                                    <li
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        this.commentLike(
                                          i,
                                          object.id,
                                          result.id
                                        )
                                      }
                                    >
                                      <img src="images/like1.png" alt="ion" />
                                      {object.clike}
                                    </li>
                                    <li
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        this.openReplycomment(
                                          i,
                                          object.id,
                                          result.id
                                        )
                                      }
                                    >
                                      <img src="images/reply.png" alt="ion" />{" "}
                                      Reply
                                    </li>
                                  </ul>

                                  <form
                                    className="replyid"
                                    id={"rid" + object.id}
                                    onSubmit={(e) => handleReplySubmit(e, i)}
                                    data-id={result.id}
                                    commentid={object.id}
                                  >
                                    <input
                                      className="form-control me-2"
                                      type="text"
                                      placeholder="Your Comment..."
                                      aria-label="Search"
                                      autoComplete="off"
                                      id={"reply" + object.id}
                                      name={values[i]}
                                      value={values[i]}
                                      onChange={(e) => handleReply(
                                        e,
                                        i
                                      )}
                                    />
                                    <button className="comment" type="submit">
                                      <span className="send">
                                        <img
                                          src="images/send.png"
                                          alt="ion"
                                        />
                                      </span>
                                      <span>Comment</span>
                                    </button>
                                    <></>{" "}
                                  </form>

                                  <div
                                    className="modal fade"
                                    id={"exampleModalHelp" + object.id}
                                    role="dialog"
                                    aria-labelledby="exampleModalCenterTitle"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className="modal-dialog modal-dialog-centered"
                                      role="document"
                                    >
                                      <div className="modal-content HelpForm">
                                        <div className="modal-header ghg">
                                          <h5
                                            className="modal-title"
                                            id="exampleModalLongTitle"
                                          >
                                            Report
                                          </h5>
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">
                                              &times;
                                            </span>
                                          </button>
                                        </div>
                                        <form
                                          onSubmit={handleReportSubmit}
                                          data-id={result.id}
                                          commentid={object.id}
                                        >
                                          <div className="modal-body">
                                            <div className="row">
                                              <div className="col-sm-12">
                                                <div className="form-group">
                                                  <label>
                                                    Categories
                                                    {errors.category ? (
                                                      <span
                                                        style={{
                                                          color: "red",
                                                          marginLeft: "4px",
                                                        }}
                                                      >
                                                        *
                                                      </span>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </label>
                                                  <select
                                                    value={input.category}
                                                    onChange={
                                                      handleChange
                                                    }
                                                    name="category"
                                                    id="category"
                                                  >
                                                    <option key="" value="">
                                                      --Select Category--
                                                    </option>
                                                    <option
                                                      key="Abusive"
                                                      value="Abusive"
                                                    >
                                                      Abusive
                                                    </option>
                                                    <option
                                                      key="Adult"
                                                      value="Adult"
                                                    >
                                                      Adult
                                                    </option>
                                                    <option
                                                      key="Others"
                                                      value="Others"
                                                    >
                                                      Others
                                                    </option>
                                                  </select>
                                                  <div className="text-danger">
                                                    {errors.category}
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-sm-12">
                                                <div className="form-group">
                                                  <label>Description</label>
                                                  <textarea
                                                    placeholder="Description"
                                                    value={input.description}
                                                    onChange={
                                                      handleChange
                                                    }
                                                    id="description"
                                                    name="description"
                                                  ></textarea>
                                                  <div className="text-danger">
                                                    {errors.description}
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="modal-footer">
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary"
                                                  data-dismiss="modal"
                                                >
                                                  Close
                                                </button>
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary submit"
                                                >
                                                  Submit
                                                </button>
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
                                  {object.hidecomment == 0 ? (
                                    <div className="commentin">
                                      <Link
                                        to={{
                                          pathname:
                                            "/viewprofile/" + object.name,
                                        }}
                                      >
                                        <span className="userimg">
                                          <img
                                            className="w-100"
                                            src={object.image}
                                            align="icon"
                                          />
                                        </span>
                                      </Link>
                                      <h5>
                                        <Link
                                          to={{
                                            pathname:
                                              "/viewprofile/" + object.name,
                                          }}
                                        >
                                          {object.name}
                                        </Link>
                                        <a
                                          className="reportbtn"
                                          data-toggle="modal"
                                          data-target={
                                            "#exampleModalHelp" + object.id
                                          }
                                        >
                                          Report
                                        </a>
                                      </h5>
                                      <p>
                                        {object.comment} (
                                        <span>{object.created} Ago</span>)
                                      </p>
                                      <ul className="likecomment">
                                        <li
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            this.commentLike(
                                              i,
                                              object.id,
                                              result.id
                                            )
                                          }
                                        >
                                          <img
                                            src="images/like1.png"
                                            alt="ion"
                                          />
                                          {object.clike}
                                        </li>
                                        <li
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            this.openReplycomment(
                                              i,
                                              object.id,
                                              result.id
                                            )
                                          }
                                        >
                                          <img
                                            src="images/reply.png"
                                            alt="ion"
                                          />{" "}
                                          Reply
                                        </li>
                                        {object.reply.map((item) => {
                                          return (
                                            <>
                                              {item.commentid == object.id ? (
                                                <div className="replyin">
                                                  <Link
                                                    to={{
                                                      pathname:
                                                        "/viewprofile/" +
                                                        item.username,
                                                    }}
                                                  >
                                                    <span className="userimg">
                                                      <img
                                                        className="w-100"
                                                        src={item.image}
                                                        align="icon"
                                                      />
                                                    </span>
                                                  </Link>
                                                  <h5>
                                                    <Link
                                                      to={{
                                                        pathname:
                                                          "/viewprofile/" +
                                                          item.username,
                                                      }}
                                                    >
                                                      {item.username}
                                                    </Link>
                                                  </h5>
                                                  <div>
                                                    <div className="para">
                                                      <p>{item.comment} </p>
                                                    </div>
                                                    <div className="bottomreport">
                                                      <span className="days">
                                                        {item.created} Ago
                                                      </span>
                                                      <a
                                                        className="reportbtn btn-report"
                                                        data-toggle="modal"
                                                        data-target={
                                                          "#exampleModalHelp" +
                                                          item.id
                                                        }
                                                      >
                                                        Report
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        })}
                                      </ul>

                                      <form
                                        className="replyid"
                                        id={"rid" + object.id}
                                        onSubmit={(e) =>
                                          handleReplySubmit(e, i)
                                        }
                                        data-id={result.id}
                                        commentid={object.id}
                                      >
                                        <input
                                          className="form-control me-2"
                                          type="text"
                                          placeholder="Your Comment..."
                                          aria-label="Search"
                                          autoComplete="off"
                                          id={"reply" + object.id}
                                          name={values[i]}
                                          value={values[i]}
                                          onChange={(e) =>
                                            handleReply(e, i)
                                          }
                                        />
                                        <button
                                          className="comment"
                                          type="submit"
                                        >
                                          <span className="send">
                                            <img
                                              src="images/send.png"
                                              alt="ion"
                                            />
                                          </span>
                                          <span>Comment</span>
                                        </button>
                                      </form>

                                      <div
                                        className="modal fade"
                                        id={"exampleModalHelp" + object.id}
                                        role="dialog"
                                        aria-labelledby="exampleModalCenterTitle"
                                        aria-hidden="true"
                                      >
                                        <div
                                          className="modal-dialog modal-dialog-centered"
                                          role="document"
                                        >
                                          <div className="modal-content HelpForm">
                                            <div className="modal-header">
                                              <h5
                                                className="modal-title"
                                                id="exampleModalLongTitle"
                                              >
                                                Report
                                              </h5>
                                              <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                              >
                                                <span aria-hidden="true">
                                                  &times;
                                                </span>
                                              </button>
                                            </div>
                                            <form
                                              onSubmit={
                                                handleReportSubmit
                                              }
                                              data-id={result.id}
                                              commentid={object.id}
                                            >
                                              <div className="modal-body">
                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    <div className="form-group">
                                                      <h6>
                                                        Categories{" "}
                                                        {errors.category ? (
                                                          <span
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            *
                                                          </span>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </h6>
                                                      <select
                                                        value={input.category}
                                                        onChange={
                                                          handleChange
                                                        }
                                                        name="category"
                                                        id="category"
                                                      >
                                                        <option
                                                          key=""
                                                          value=""
                                                        >
                                                          --Select Category--
                                                        </option>
                                                        <option
                                                          key="Abusive"
                                                          value="Abusive"
                                                        >
                                                          Abusive
                                                        </option>
                                                        <option
                                                          key="Adult"
                                                          value="Adult"
                                                        >
                                                          Adult
                                                        </option>
                                                        <option
                                                          key="Others"
                                                          value="Others"
                                                        >
                                                          Others
                                                        </option>
                                                      </select>
                                                      <div className="text-danger">
                                                        {errors.category}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-12">
                                                    <div className="form-group">
                                                      <h6>
                                                        Description{" "}
                                                        {errors.description ? (
                                                          <span
                                                            style={{
                                                              color: "red",
                                                            }}
                                                          >
                                                            *
                                                          </span>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </h6>
                                                      <textarea
                                                        placeholder="Description"
                                                        value={
                                                          input.description
                                                        }
                                                        onChange={
                                                          handleChange
                                                        }
                                                        id="description"
                                                        name="description"
                                                      ></textarea>
                                                      <div className="text-danger">
                                                        {errors.description}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button
                                                      type="button"
                                                      className="btn btn-secondary"
                                                      data-dismiss="modal"
                                                    >
                                                      Close
                                                    </button>
                                                    <button
                                                      type="submit"
                                                      className="btn btn-primary submit"
                                                    >
                                                      Submit
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                            </>
                          ))
                          : ""}
                      </div>

                      {commentinput && commentdataid == result.id ?
                        <div className="likeshare">
                          <form onSubmit={(event) => commentSubmit(i, event)} data-tag={result.id} id={result.id}>
                            {isViprole ? (
                              <div className="pcheck">
                                <input type="checkbox" value="1" onChange={(event) => handleHideComment(i, event)} /> Hide comment
                              </div>
                            ) : null}
                            <input
                              id={'comments' + result.id}
                              className="form-control me-2"
                              type="text"
                              placeholder="Your Comment..."
                              aria-label="Search"
                              value={comments[i] || ''}
                              onChange={(event) => handleGetreply(i, event)}
                              autoComplete="off"
                            />
                            <button className="comment" type="submit">
                              <span className="send"><img src="images/send.png" alt="ion" /></span>
                              <span>Comment</span>
                            </button>
                          </form>
                        </div>
                        : ""}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <div
          className="loadingicon"
          id="loadingicon"
          style={{ display: "block" }}
        >
          <img src="/images/loading.gif" />
        </div>
      )}
    </div>
  );
};
export default Userdashboard;
