import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Nav";
import Products from "./Products";
import data from "../db/data";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../Card";
import CourseItem from "../../Home/CourseItem/CourseItem";
import {getCourses} from "../../../services/course_list.service";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    getCourses()
    .then(courses => {
        console.log(courses)

        setSelectedCategory(courses);
    })
    .catch(err => {
        console.log(err);
    })
  },[])
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
    (course,key) => (
      <CourseItem
        key={key} course={course}
      />
    )
  );

  return (
    <>
      <Sidebar handleChange={handleCategoryChange} />
      
      <Products result={renderedProducts} />
    </>
  );
};

export default ProductList;