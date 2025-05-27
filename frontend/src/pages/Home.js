import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  // search bar states
  const [search, setSearch] = useState('');

  //food items states
  const [foodItem, setFoodItem] = useState([]);
  const [foodItemCategory, setFoodItemCategory] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/foodData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setFoodItem(data[0]);
      setFoodItemCategory(data[1]);
    } catch (error) {
      console.error("Error in fetching data !!", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {/*Carousel*/}
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "1" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success  text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://plus.unsplash.com/premium_photo-1671559021919-19d9610c8cad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2FuZHdpY2h8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww"
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FuZHdpY2h8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Dynamically rerndering cards*/}
      <div className="m-3">
        {foodItem.length === 0 ? (
          <div>No data</div>
        ) : (
          foodItemCategory.map((category) => {
            const filteredItems = foodItem.filter(
              (item) =>
                item.CategoryName === category &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div key={category} className="category-section">
                <div className="fs-3 m-3">{category}</div>
                <hr />
                {filteredItems.length !== 0 ? (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                    {filteredItems.map((item) => (
                      <div key={item._id} className="col">
                        <Card foodItem={item}
                          options={item.options}
              
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No Food Items in this Category!!</div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
