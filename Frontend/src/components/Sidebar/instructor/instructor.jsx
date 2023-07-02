import "./instructor.css";
import Input from "../../Input";

const Instructor = ({ handleChange }) => {
  return (
   
      <div>
        <h2 className="sidebar-title color-title">instructor</h2>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="checkbox" value="" name="test1" />
          <span className="checkmark all"></span>
          All
        </label>

        <Input
          handleChange={handleChange}
          value="black"
          title="Dr_Abdelrhman "
          name="test1"
        
        />

        <Input
          handleChange={handleChange}
          value="blue"
          title="shimaa"
          name="test1"
       
        />

        <Input
          handleChange={handleChange}
          value="red"
          title="ibram"
          name="test1"
        
        />

        <Input
          handleChange={handleChange}
          value="green"
          title="ramdan"
          name="test1"
      
        />

        <label className="sidebar-label-container">
          <input
            onChange={handleChange}
            type="radio"
            value="white"
            name="test1"
          />
      
        </label>
      </div>
 

  );
};

export default Instructor;
