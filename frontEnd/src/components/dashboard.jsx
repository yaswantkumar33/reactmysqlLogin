import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3565/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUsername(res.data.name);
        } else {
          setAuth(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
        setAuth(false);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="flex justify-center items-center w-full h-full text-white relative top-[20em]">
      <p>{auth ? <>Login Successful </> : <>Login failed </>}</p>
      <p> {"  " + username}</p>
    </div>
  );
};

export default Dashboard;
