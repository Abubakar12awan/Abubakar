import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

import Practicemap1 from "./Practicemap1";
function Practicemap(props) {
  const navigate = useNavigate(); // Declare the useNavigate hook

  // Array of data for each component
  const componentData = [
    {
      id: 1,
      imgSrc: "dark.png",
      title: "Component 1",
      description: "Description 1",
    },
    {
      id: 2,
      imgSrc: "dark.png",
      title: "Component 2",
      description: "Description 2",
    },

    {
      id: 3,
      imgSrc: "dark.png",
      title: "Component 3",
      description: "Description 3",
    },
    {
      id: 4,
      imgSrc: "dark.png",
      title: "Component 4",
      description: "Description 4",
    },
    {
      id: 5,
      imgSrc: "dark.png",
      title: "Component 5",
      description: "Description 5",
    },
    {
      id: 6,
      imgSrc: "dark.png",
      title: "Component 6",
      description: "Description 6",
    },
  ];

  // Grouping the component data into rows
  const rows = [];
  for (let i = 0; i < componentData.length; i += 2) {
    rows.push(componentData.slice(i, i + 2));
  }

  // Function to handle button click
  const handleButtonClick = (id) => {
    navigate(`/otherpage/${id}`); // Add the unique identifier to the URL
  };

  return (
    <div className="ShowBookDetails">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", flexDirection: "row" }}>
          {row.map((data, dataIndex) => (
            <div key={dataIndex} style={{ flex: 1, margin: "10px" ,display: "flex", flexDirection: "row" }}>
            
            <div>

              <img style={{ width: 150, height: 150 }} src={data.imgSrc} alt="no" />
            </div>

              <div>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <button onClick={() => handleButtonClick(data.id)}>Learn more</button> {/* Add onClick event handler with the unique identifier */}
              </div>
            </div>
          ))}
        </div>
      ))}
<Practicemap1/>
    </div>
  );
}



export default Practicemap;
