import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [userdata, setuserdata] = useState({});
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const logoutfun = () => {
    axios
      .get("http://localhost:3565/logout")
      .then(() => {
        location.reload(true);
      })
      .catch((err) => {
        console.log("error");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3565/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          // console.log(res.data);
          setuserdata(res.data.userdata);
        } else {
          setAuth(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
        setAuth(false);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-white relative top-[20em]">
      <div>
        {auth ? (
          <>
            <div className="flex ">
              <h3 className="text-2xl font-semibold">Login Successful</h3>
              <button
                onClick={() => {
                  console.log("logout clicked !!!");
                  logoutfun();
                }}
                className="text-white  px-3 mx-3 rounded-lg shadow-md shadow-slate-400  border border-purple-500 font-semibold"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <> Login failed </>
        )}
      </div>
      <p className="flex gap-7 p-3">
        <span className="p-2 rounded-lg m-1 border border-purple-500">
          {userdata.name}
        </span>
        <span className="p-2 rounded-lg m-1 border border-purple-500">
          {userdata.email}
        </span>
      </p>
    </div>
  );
};

export default Dashboard;
