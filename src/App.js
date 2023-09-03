import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Login } from "./Components/Authentication/Login";
import { Signup } from "./Components/Authentication/Signup";
import { HomeWrapper } from "./Components/Main/Home";
import AppSettings from "./app.settings.json";
import axios from "axios";

import { Toaster } from "react-hot-toast";
export const GlobalContext = React.createContext();

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const [prices, setPrices] = useState({
    btc: 30000,
    eth: 0,
    bnb: 0,
    xrp: 0,
  });
  const [pendingTransfer, setPendingTransfer] = useState(false);
  const [pendingTransferInfo, setPendingTransferInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0.0);
  const [open, setOpen] = React.useState(false);

  let userinfo = JSON.parse(localStorage.getItem("usr_info"));

  useEffect(() => {
    const pendingTransfer = async () => {
      if (localStorage.getItem("usr_info")) {
        const userInfo = JSON.parse(localStorage.getItem("usr_info"));
        await axios(
          `${AppSettings.APIserver}/latest_pending_transfer/${userInfo.username}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        )
          .then((res) => {
            if (
              res.data.status === "pending" &&
              userInfo.username !== "admin"
            ) {
              setPendingTransfer(true);
              setPendingTransferInfo(res.data);
            } else {
              setPendingTransfer(false);
            }
          })
          .catch((e) => console.log(e));
      }
    };
    pendingTransfer();
  }, [location.pathname]);

  const getCoinsPrice = () => {
    const interval = setInterval(() => {
      try {
        fetch("https://api.livecoinwatch.com/coins/list", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": "3dea6ef1-1c17-4c46-9595-4cd01ccb597c",
          },
          body: JSON.stringify({
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 6,
            meta: false,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setPrices({
              btc: res[0].rate.toFixed(2),
              eth: res[1].rate.toFixed(2),
              bnb: res[4].rate.toFixed(2),
              xrp: res[5].rate.toFixed(2),
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.error("Error occurred during API request:", error);
      }
    }, 5000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    // Coins prices
    getCoinsPrice();
  }, []);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("usr_info")) {
      token = JSON.parse(localStorage.getItem("usr_info")).token;
    }

    axios(`${AppSettings.APIserver}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((e) => {
        console.log(e);
        navigate("/home/");
      })
      .catch((e) => {
        console.log(e);
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
        containerStyle={{
          top: 100,
        }}
      />
      <GlobalContext.Provider
        value={{
          toast,
          setToast,
          prices,
          pendingTransfer,
          pendingTransferInfo,
          setPendingTransferInfo,
          setPendingTransfer,
          balance,
          setBalance,
          userinfo,
          setOpen,
          open,
        }}
      >
        <Routes>
          <Route path="/home/*" element={<HomeWrapper />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;