
import { GiCook } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Link to={"/"}>
        <h1>
          Home
          <GiCook />
        </h1>
      </Link>
    </div>
  );
};

export default Header;
