// import React, { useState } from "react";
// import "../App.css";

// function Practicemap1() {
//   const [activeElement, setActiveElement] = useState(""); // State to track active element

//   // Function to handle element click
//   const handleElementClick = (element) => {
//     setActiveElement(element);
//   };

//   // Define content for each element
//   const elementContent = {
//     element1: {
//       title: "Element 1",
//       description: "Description for Element 1",
//       buttonText: "Button 1",
//       imageSrc: "dark.png",
//     },

//     element2: {
//       title: "Element 2",
//       description: "Description for Element 2",
//       buttonText: "Button 2",
//       imageSrc: "dark.png",
//     },
//     element3: {
//       title: "Element 3",
//       description: "Description for Element 3",
//       buttonText: "Button 3",
//       imageSrc: "dark.png",
//     },
//     element4: {
//       title: "Element 4",
//       description: "Description for Element 4",
//       buttonText: "Button 4",
//       imageSrc: "dark.png",
//     },
//   };

//   return (
//     <div className="Practicemap1" style={{ height: "70vh" }}>
//       <div className="Navbar">
//         {Object.keys(elementContent).map((element) => (
//           <button key={element} onClick={() => handleElementClick(element)}>
//             {elementContent[element].title}

//           </button>
//         ))}
//       </div>

//       <div className="Content">
//         {activeElement && (
//           <div style={{ display: "flex", flexDirection: "row" }}  className="ElementContainer">
//             <div className="ElementDetails">
//               <h1>{elementContent[activeElement].title}</h1>
//               <p>{elementContent[activeElement].description}</p>
//               <button>{elementContent[activeElement].buttonText}</button>
//             </div>
//             <div className="ElementImage">
//               <img style={{ width: 150, height: 150 }}  src={elementContent[activeElement].imageSrc} alt="Element" />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Practicemap1;

import React, { useState } from "react";
import "../App.css";

function Practicemap1() {
  const [element, setElement] = useState("");

  const handleClick = (element) => {
    setElement(element);
  };

  const data = {
    element1: {
      title: "malik1",
      description: "nak kar desc1",
      img: "dark.png",
    },
    element2: {
      title: "malik2",
      description: "nak kar desc2",
      img: "dark.png",
    },
    element3: {
      title: "malik3",
      description: "nak kar desc3",
      img: "dark.png",
    },
    element4: {
      title: "malik4",
      description: "nak kar desc4",
      img: "dark.png",
    },
  };

  return (
    <div className="Practicemap1" style={{ height: "70vh" }}>
      <div>
        {Object.keys(data).map((element) => (
          <button key={element} onClick={() => handleClick(element)}>
            {data[element].title}
          </button>
        ))}
      </div>
      <div>
        {element && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <h1>{data[element].title}</h1>
              <h1>{data[element].description}</h1>
              <button key={element} onClick={() => handleClick(element)}>
                Learn more&gt;{" "}
              </button>
            </div>
            <div>
              <img
                style={{ width: 140, height: 100 }}
                src={data[element].img}
                alt=""
              />{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Practicemap1;
