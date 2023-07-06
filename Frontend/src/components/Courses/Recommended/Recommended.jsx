import Button from "../Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All courses" />
          <Button onClickHandler={handleClick} value="Nike" title="data sciences" />
          <Button onClickHandler={handleClick} value="Adidas" title="programing" />
          <Button onClickHandler={handleClick} value="Puma" title="softskills" />
          <Button onClickHandler={handleClick} value="Vans" title="bussiness" />
        </div>
      </div>
    </>
  );
};

export default Recommended;
