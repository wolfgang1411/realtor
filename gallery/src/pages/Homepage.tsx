import React from "react";

import Navbar from "../component/navbar/Index";

import HomePageStyle from "./Homepage.module.scss";

const HomePage = () => {
  return (
    <div className={HomePageStyle.container}>
      <Navbar />
    </div>
  );
};

export default HomePage;
