import React, { useState } from "react";
import Navigation from "../Navigation/Nav";
import Products from "./Products";
import data from "../db/data";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../Card";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleButtonClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems = data.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const filteredProducts = filteredItems.filter(
    ({ category, color, company, newPrice, title }) =>
      !selectedCategory ||
      category === selectedCategory ||
      color === selectedCategory ||
      company === selectedCategory ||
      newPrice === selectedCategory ||
      title === selectedCategory
  );

  const renderedProducts = filteredProducts.map(
    ({ img, title, star, reviews, prevPrice, newPrice }) => (
      <Card
        key={Math.random()}
        img={img}
        title={title}
        star={star}
        reviews={reviews}
        prevPrice={prevPrice}
        newPrice={newPrice}
      />
    )
  );

  return (
    <>
      <Sidebar handleChange={handleCategoryChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleButtonClick} />
      <Products result={renderedProducts} />
    </>
  );
};

export default ProductList;