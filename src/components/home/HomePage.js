import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className="jumbotron">
        <h1>Valentine Boys and Girls Club</h1>
        <div>
            <img style={{height: "400px"}} className="home-page-img" src="https://pbs.twimg.com/media/FKhqe2GXMAMpUKT?format=png"/>
            <img className="home-page-img" src="https://bgcc.org/wp-content/uploads/2021/08/DSC_0564-445x340.jpg"/>
            <img className="home-page-img" src="https://bgcc.org/wp-content/uploads/2021/08/Group-with-Ron-Kittle-453x340.jpg"/>
            <img className="home-page-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST2oOD4CUHhEpTXnW6pmwoelA23MkqDvdcww&usqp=CAU"/>
        </div>
        <Link to="about" className="btn btn-primary btn-lg">
            Learn More
        </Link>

    </div>
);

export default HomePage;