import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topbar = () => {

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [categories, setCategories] = useState([]);
    const [professionsubcategory, setProfessionSubcategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [profession, setProfession] = useState([]);
    const [input, setInput] = useState({
        name: '',
        email: '',
        uid: '',
      });
      const [formfilled, setFormfilled] = useState('');
      const [isViprole, setIsViprole] = useState(false);
      const [userImage, setUserImage] = useState('/images/blank.png');
    let curentlogin = JSON.parse(window.localStorage.getItem("user"));
    const handleSubMenuToggle = () => {
      setShowSubMenu(prevState => !prevState); // Toggle submenu visibility
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('id', curentlogin.value);
                formData.append('user', curentlogin.value);
        
                const response = await axios.post('https://domaintobesocial.com/domaintobestart/getuserprofile', formData);
        
                setInput({
                  name: response.data.message.name,
                  email: response.data.message.email,
                  uid: response.data.message.id,
                });
        
                setFormfilled(response.data.message.formfilled);
        
                if (response.data.message.roles === 'vip') {
                  setIsViprole(true);
                } else {
                  setIsViprole(false);
                }
        
                setUserImage(response.data.message.image || '/images/blank.png');
        
              } catch (error) {
                console.error('Error fetching data:', error.message);
              }
          try {
            const response = await axios.get('https://domaintobesocial.com/domaintobestart/category');
            const sortedCategories = [...response.data.message];
    
            // Sort the categories array alphabetically based on the 'catname' property
            sortedCategories.sort((a, b) => {
              const nameA = a.catname.toUpperCase(); // Ignore case for comparison
              const nameB = b.catname.toUpperCase(); // Ignore case for comparison
    
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0; // Names are equal
            });
    
            setCategories(sortedCategories);
          } catch (error) {
            console.error('Error fetching data:', error);
          }

          try {
            const response = await axios.get('https://domaintobesocial.com/domaintobestart/subcategory');
            setProfessionSubcategory(response.data.message2);
            setSubcategory(response.data.message);
          } catch (error) {
            console.error('Error fetching data:', error);
          }

          try {
            const formData = new FormData();
            formData.append('id', '16');
    
            const response = await axios.post('https://domaintobesocial.com/domaintobestart/getprofessions', formData);
            setProfession(response.data.message);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }


          
        };
    
        fetchData();
      }, []);

     let handleChangeLogout=()=>
      {
        window.localStorage.clear();
        window.location.reload()
      }
      let vipimage;
      if(isViprole){
        vipimage = <img className="vip" src="/images/vip.png" align="icon"/>;
    }else{
        vipimage = '';
    }

    let stringValue = window.localStorage.getItem('user');
        if (stringValue !== null) {
            let value = JSON.parse(stringValue)
            let expirationDate = new Date(value.expirationDate)
            if (expirationDate > new Date()) {
                
            }else{
    
                window.localStorage.removeItem('user');
                window.location = "/";
            }
        }else{
            window.localStorage.removeItem('user');
            window.location = "/";
        }
  
  return (
    <div className="main_menu ">
      <ul>
        <li>
          <Link to="/userdashboard" className="active">
            News Feed
          </Link>
        </li>
        <li className="dropdown">
          <span
            className="dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={handleSubMenuToggle}
          >
            Discussion
          </span>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <ul>
              {categories.map((result) => (
                <li key={result.id} value={result.id} data-set="check">
                  <Link to={"/discussion?type=" + result.id} tabIndex="-1">
                    {result.catname}
                  </Link>
                  <ul className="testul">
                    {subcategory &&
                      subcategory.map((result1) =>
                        result1.catid === result.id ? (
                          <li
                            key={result1.id}
                            value={result1.id}
                            data-set="check"
                          >
                            <Link
                              to={
                                "/discussion?type=" +
                                result.id +
                                "&subtype=" +
                                result1.id
                              }
                            >
                              {result1.subcat}
                            </Link>
                          </li>
                        ) : null
                      )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="dropdown">
          <span
            className="dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Help
          </span>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <ul>
              {profession.map((result) => {
                return (
                  <li data-set="check" key={result.id}>
                    <Link to={"/professions/" + result.id}>{result.name}</Link>
                    <ul className="testul">
                      {professionsubcategory &&
                        professionsubcategory.map((result1) =>
                          result1.pid === result.id ? (
                            <li
                              key={result1.id}
                              value={result1.id}
                              data-set="check"
                            >
                              <Link
                                to={
                                  "/professions/" +
                                  result.id +
                                  "&subtype=" +
                                  result1.id
                                }
                              >
                                {result1.name}
                              </Link>
                            </li>
                          ) : null
                        )}
                    </ul>
                  </li>
                );
              })}
              <li data-set="check">
                <Link to={"/help"}>All helps</Link>
              </li>
            </ul>
          </div>
        </li>
        {/* <li><Link to="/blog" >Blog</Link></li> */}
      </ul>
      <div className="side_right">
        <div className="asuser">
          <Link to="/userprofile">
            <span className="userimg">
              <img className="w-100" src={userImage} align="icon" />
            </span>
            {vipimage}
            <h5>{input.name}</h5>
          </Link>
        </div>
        <span
          className="logout"
          onClick={handleChangeLogout}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Topbar;
