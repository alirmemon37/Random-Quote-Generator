import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {

  const [backgroundColor, setBackgroundColor] = useState("#2c3e50");
  const [data, setData] = useState({content: "Hello World", originator: {name: "A programmer"}});
  const [quote, setQuote] = useState("Hello World");
  const [author, setAuthor] = useState("A programmer");

  const hexNumbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const randomBackgroundColor = () => {
    let hexColorCode = "";
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * hexNumbers.length);
      hexColorCode += hexNumbers[randomIndex];
    }

    // setting the color to random color
    setBackgroundColor("#" + hexColorCode);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    // fetching random quote
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", options)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));

    setQuote(data?.content);
    setAuthor(data?.originator.name);
  }, [backgroundColor]);

  return (
    <div style={{ backgroundColor: backgroundColor }} className="container">
      <div className="quote-box">
        <p className="quote" id="quote" style={{ color: backgroundColor }}>
          <i className="ph-quotes-fill"></i>
          {quote}
        </p>
        <div style={{ color: backgroundColor }} className="author" id="author">
          <p>- {author}</p>
        </div>
        <div className="btns">
          <a href={`http://twitter.com/intent/tweet?text=${quote} - ${author}`}>
            <button
              style={{ backgroundColor: backgroundColor }}
              className="btn tweet-quote-btn"
            >
              <i className="ph-twitter-logo-fill logo"></i>
            </button>
          </a>
          <button
            style={{ backgroundColor: backgroundColor }}
            id="new-quote"
            className="btn new-quote-btn"
            onClick={randomBackgroundColor}
          >
            New Quote
          </button>
        </div>
      </div>
      <div className="developer-div">
        <p>by ali</p>
      </div>
    </div>
  );
};

export default App;
