import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";

const Aboutus = () => {
  const bedgeCount = useSelector((state:any) => state.HomePage.bedgeCount);
  return (
    <>
      <Navigation src="" bedgeCount={bedgeCount}></Navigation>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20rem",
        }}
      >
        This is About us page
      </h1>
    </>
  );
};

export default Aboutus;
