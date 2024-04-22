import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import Chooseus from "./Chooseus";
import Regularmenu from "./Regularmenu";
import Testimonal from "./Testimonal";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Categories />
      <Regularmenu />
      <Chooseus />
      <Testimonal />
    </div>
  );
};

export default Home;
