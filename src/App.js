import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component.js"
import CreateUser from "./components/create-user.component.js";
import CreateGallery from "./components/create-imagegallery.component.js";
import UserList from "./components/user-list.component.js";
import CreateVideos from "./components/create-videogallery.component.js"

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={UserList} />
      <Route path="/images" component={CreateGallery} />
      <Route path="/videos" component={CreateVideos} />
      <Route path="/user" component={CreateUser} />  
    </div>
    </Router>
  );
}

export default App;
