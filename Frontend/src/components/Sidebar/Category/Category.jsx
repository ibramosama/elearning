import "./Category.css";
import Input from "../../Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="checkbox" value="" name="test" />
          <span className="checkmark"> </span>
        </label>
        <Input
          handleChange={handleChange}
          value="programing"
          title="programing"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="flats"
          title="business"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="sandals"
          title="Data sciences"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="heels"
          title="Soft Skills"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
