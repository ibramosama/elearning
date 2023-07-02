import Category from "./Category/Category";
import Price from "./Price/Price";
import Instructor from "./instructor/instructor";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>courses</h1>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Instructor handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
