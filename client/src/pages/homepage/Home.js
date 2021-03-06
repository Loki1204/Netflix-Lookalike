import React, { useEffect, useState } from "react";
import axios from "axios";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import List from "../../components/list/List";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://netflix-lookalike.herokuapp.com/api/lists${
            type ? "?type=" + type : ""
          }${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, index) => (
        <List list={list} key={index} />
      ))}
    </div>
  );
};

export default Home;
