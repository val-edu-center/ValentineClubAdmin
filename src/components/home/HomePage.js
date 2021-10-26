import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className="jumbotron">
        <h1>Valentine Boys and Girls Club</h1>
        <div>
            <img className="home-page-img" src="https://bgcc.org/wp-content/uploads/2021/08/DSC_0564-445x340.jpg"/>
            <img className="home-page-img" src="https://bgcc.org/wp-content/uploads/2021/08/Group-with-Ron-Kittle-453x340.jpg"/>
        </div>
        <Link to="about" className="btn btn-primary btn-lg">
            Learn More
        </Link>

    </div>
);

export default HomePage;