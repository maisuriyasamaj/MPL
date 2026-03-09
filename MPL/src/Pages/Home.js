import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import s1 from "../Images/mpl2025 (1).jpeg";
import s2 from "../Images/mpl2025 (2).jpeg";
import s3 from "../Images/mpl2025 (7).jpeg";
import s4 from "../Images/mpl2025 (6).jpeg";
import mpl25 from "../Images/mpl2025 (8).jpeg";
import none from "../Images/unknown_cricket_player.jpg";
import imgb from "../Images/imgb.png";
import img2 from "../Images/img (2).png";
import img3 from "../Images/img (3).png";
import img4 from "../Images/img (4).png";
import img5 from "../Images/img (5).png";
import img241 from "../Images/img2024 (1).jpeg";
import img242 from "../Images/img2024 (2).jpeg";
import img243 from "../Images/img2024 (3).jpeg";
import img244 from "../Images/img2024 (4).jpeg";
import img245 from "../Images/img2024 (5).jpeg";
import img246 from "../Images/img2024 (6).jpeg";
import img247 from "../Images/img2024 (7).jpeg";
import img248 from "../Images/img2024 (8).jpeg";
import img249 from "../Images/img2024 (9).jpeg";
import img2410 from "../Images/img2024 (10).jpeg";
import img2411 from "../Images/img2024 (11).jpeg";
import img2412 from "../Images/img2024 (12).jpeg";
import img2413 from "../Images/img2024 (13).jpeg";
import img2025m from "../Images/img2025tour.jpeg";


const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [playerData, setPlayerData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activePanel, setActivePanel] = useState("carousel");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Excel Data on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/mpl25.xlsx");
        if (!response.ok) throw new Error("File not found");

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        setPlayerData(data);
        console.log("Excel Data Loaded:", data);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    };

    fetchData();
  }, []);


  // ✅ Handle Search
  const handleSearch = () => {
    if (searchValue.trim() === "") {
      setActivePanel("carousel");
      setSelectedPlayer(null);
      return;
    }

    const playerNumber = Number(searchValue);

    // ✅ Fix searching by handling the key correctly
    const foundPlayer = playerData.find(
      (player) => Number(player["No"]) === playerNumber
    );

    if (foundPlayer) {
      console.log(foundPlayer)
      setSelectedPlayer(foundPlayer);
      setActivePanel("profile");
    } else {
      setActivePanel("noData");
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="playerbody bg-dark">
      {/* Header & Search */}
      <div className="header d-flex justify-content-between align-items-center w-100 p-2">
        <a href="/" className="text-decoration-none">
          <div className="logo fs-3 fw-bold text-white">🏏 MPL25</div>
        </a>
        <input
          type="number"
          className="form-control-sm"
          style={{ fontSize: "0.87rem", width: '70px', backgroundColor: 'black', color: 'white', border: none }}
          placeholder="No"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        {/* Slider */}
        {activePanel === "carousel" && (
          <div id="carouselExample" className="carousel slide w-100" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17].map((index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            <div className="carousel-inner">
              {[s1, s2, s3, s4,img2025m, img241, img242, img243, img244, img245, img246, img247, img248, img249, img2410, img2411, img2412, img2413].map((imgSrc, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={imgSrc} className="d-block w-100 carousel-image" alt={`Slide ${index + 1}`} />
                  {/* <div className="carousel-caption">
                    <h3>Slide {index + 1} Title</h3>
                    <p>Description for Slide {index + 1}.</p>
                  </div> */}
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}

        {/* Profile Panel */}
        {activePanel === "profile" && selectedPlayer && (
          <div className="active  text-white" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="mt-4" style={{ flex: '0 0 35%', display: 'flex', justifyContent: 'center', padding: '10px' }}>
              {loading && <div className="spinner-border text-light text-center" style={{ width: '3rem', height: '3rem' }}></div>}
              <img
                src={`https://drive.google.com/thumbnail?id=${selectedPlayer["Image Link"].split("id=")[1]}&sz=s1000`}
                alt="Player"
                className="img-fluid rounded mb-3"
                style={{ width: "80%", display: loading ? "none" : "block" }}
                onLoad={() => setLoading(false)}
                onError={(e) => {
                  setLoading(false);
                  e.target.src = none; // Replace with your fallback image URL
                }}
              />
            </div>
            <div style={{ flex: '1', paddingLeft: '20px', padding: '10px' }}>
              <div >
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <div className="text-center">
                      <h1 className="display-4 mb-4"><b>{selectedPlayer["Player Name"]}</b></h1>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="display-6">🏠 {selectedPlayer["Address"]}</p>
                      <p className="display-6">+91 {selectedPlayer["Mobile Number"]}</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark text-white mt-1">
                  <div className="card-body">
                    {/* Content Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      {/* Card 1: Player Specialization */}
                      <div className="col-md-4">
                        <div className="card-body">
                          <p className="lead text-center" > <img
                            src={img4}
                            style={{ width: '25px', height: '30px', marginRight: '5px' }} // Set icon size here
                          /> Player</p>
                          <hr />
                          <h5 className="display-6 text-center">{selectedPlayer["Player Specialization"]}</h5>
                          {/* Player details */}
                          {/* <p className="text-center">{selectedPlayer["Player Details"]}</p> */}
                        </div>
                      </div>

                      {/* Middle Card: Batsman Specialization */}
                      <div className="col-md-4">
                        <div className="card-body">
                          <p className="lead text-center"> <img
                            alt="batsman"
                            src={img5}
                            style={{ width: '25px', height: '30px', marginRight: '5px' }} // Set icon size here
                          /> Batsman</p>
                          <hr />
                          <p className="display-6 text-center" >{selectedPlayer["Batsman Specialization"]}</p>
                          {/* Batsman details */}
                          {/* <p className="text-center">{selectedPlayer["Batsman Details"]}</p> */}
                        </div>
                      </div>

                      {/* Card 3: Bowler Specialization */}
                      <div className="col-md-4">
                        <div className="card-body">
                          <p className="lead text-center" ><img
                            src={imgb}
                            style={{ width: '25px', height: '30px', marginRight: '5px' }} // Set icon size here
                          /> Bowler</p>
                          <hr />
                          <p className="display-6 text-center">{selectedPlayer["Bowler Specialization"]}</p>
                          {/* Bowler details */}
                          {/* <p className="text-center" >{selectedPlayer["Bowler Details"]}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark text-white mt-1">
                  <div className="card-body">
                    <div>
                      {/* style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} */}
                      <p className="lead" > <img
                        src={img2}
                        style={{ width: '25px', height: '30px', marginRight: '5px' }} // Set icon size here
                      />  Last MPL Team : {selectedPlayer["Last Played MPL Team Name"]}</p>
                      <p className="lead" > <img
                        src={img3}
                        alt="batsman"
                        style={{ width: '25px', height: '30px', marginRight: '5px' }} // Set icon size here
                      />  Play For : {selectedPlayer["Which team to play for"]}</p>
                    </div>
                  </div>
                </div>
                {/* <p className="lead" >👕  T-Shirt Size: {selectedPlayer["T-Shirt Size"]}</p> */}
              </div>
            </div>
          </div>
        )}

        {/* 0 no */}
        {activePanel === "noData" && (
          <div
          >
            <img
              src={mpl25}
              className="d-block w-100 nodata-image"
              alt="mpl25"
            />
          </div>

        )}
      </div>
    </div>
  );
};

export default Home;
