import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

const GoBackButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <TbArrowBackUp size="36" />
      {children}
    </Link>
  );
};

export default GoBackButton;
