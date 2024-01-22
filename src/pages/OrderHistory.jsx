import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import "../styles/main.css";
import Navbar from "../components/Navbar";
import getImageUrl from "../utils/imageGetter";
import DropdownMobile from "../components/DropdownMobile";
import { getOrderHistory } from "../utils/https/orderHistory";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function OrderHistory() {
  const [isDropdownShown, setIsDropdownShow] = useState(false);
  const [copySuccess, setCopySuccess] = useState("Copy");
  const token = useSelector((state) => state.user.userInfo.token);
  const [dataOrder, setDataOrder] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });
  const noVirtualRef = useRef(null);
  const copyToClipboard = (e) => {
    noVirtualRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  };

  useEffect(() => {
    getOrderHistory(searchParams.toString(), token)
      .then((res) => {
        setDataOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    points: 0,
    user_photo: "",
  });

  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    authAxios
      .get("/user/profile")
      .then((res) => {
        setUser({
          firstname: res.data.data[0].firstname,
          lastname: res.data.data[0].lastname,
          points: res.data.data[0].points,
          user_photo: res.data.data[0].user_photo,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // <Navbar isClick={() => setIsDropdownShow(true)} />;
  return (
    <>
      <Navbar isClick={() => setIsDropdownShow(true)} />
      <section className="bg-[#A0A3BD33] py-10 font-mulish">
        <section className="px-5 md:px-11 xl:px-[130px] font-mulish flex flex-col gap-y-4 lg:flex-row lg:gap-x-6">
          <div className="w-full lg:w-2/6 bg-light h-full rounded-3xl flex flex-col gap-y-7 p-[40px]">
            <div className="flex justify-between ">
              <p>INFO</p>
              <img src={getImageUrl("dot", "svg")} alt="icon" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={user.user_photo}
                alt="image"
                className="w-40 h-40 rounded-full"
              />
              <p className="text-[20px] text-dark font-semibold">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-sm text-secondary">Moviegoers</p>
            </div>
            <div className="w-full border"></div>
            <div className="flex flex-col gap-y-[24px] relative overflow-hidden">
              <p className="font-semibold text-secondary">Loyalty Points</p>
              <div className="w-full bg-primary rounded-2xl p-4 flex flex-col gap-y-16">
                <p className="text-[18px] font-bold text-light">Moviegoers</p>
                <div className="text-light flex gap-x-1 items-end">
                  <p className="text-2xl">{user.points}</p>
                  <p className="text-[10px]">points</p>
                </div>
                <div className="p-20 bg-[#FFFFFF4D] self-baseline rounded-full absolute top-2 -right-12"></div>
                <div className="p-20 bg-[#FFFFFF4D] self-baseline rounded-full absolute -top-6 -right-6"></div>
                <div className="absolute top-14 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="63"
                    height="63"
                    viewBox="0 0 63 63"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_47_9753)">
                      <path
                        d="M37.6937 52.7623C37.3651 52.6757 37.0621 52.5115 36.81 52.2836L27.8103 43.9982L15.8736 46.6737C15.4858 46.7613 15.0811 46.7384 14.7057 46.6076C14.3302 46.4767 13.999 46.2431 13.7497 45.9334C13.5004 45.6237 13.343 45.2502 13.2954 44.8555C13.2477 44.4607 13.3118 44.0606 13.4803 43.7004L18.6293 32.6943L12.3726 22.218C12.1793 21.884 12.0806 21.5037 12.0871 21.1178C12.0936 20.732 12.205 20.3552 12.4095 20.0279C12.6262 19.695 12.9319 19.4295 13.2919 19.2615C13.6518 19.0935 14.0517 19.0298 14.4461 19.0776L26.6023 20.5089L34.5758 11.3596C34.8369 11.0576 35.1777 10.8352 35.5593 10.718C35.9409 10.6008 36.3478 10.5934 36.7334 10.6967C37.119 10.8 37.4677 11.0099 37.7395 11.3022C38.0114 11.5945 38.1954 11.9575 38.2705 12.3496L40.6681 24.2558L51.9114 29.0944C52.2768 29.2502 52.5912 29.5053 52.819 29.8308C53.0468 30.1562 53.1788 30.539 53.2 30.9357C53.2134 31.3213 53.1215 31.7034 52.9342 32.0408C52.7469 32.3782 52.4712 32.6582 52.1368 32.8508L41.4802 38.7952L40.4363 50.9013C40.4065 51.3057 40.2616 51.6932 40.0186 52.0179C39.7757 52.3426 39.4449 52.5911 39.0653 52.7339C38.6238 52.8947 38.1415 52.9048 37.6937 52.7623Z"
                        fill="url(#paint0_linear_47_9753)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_47_9753"
                        x1="36.7642"
                        y1="10.7049"
                        x2="26.3094"
                        y2="49.7227"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFF6DC" />
                        <stop offset="1" stopColor="#FFC107" />
                      </linearGradient>
                      <clipPath id="clip0_47_9753">
                        <rect
                          width="51"
                          height="51"
                          fill="white"
                          transform="translate(13.1992) rotate(15)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-[95%] h-20 bg-[#1D4ED880] -mt-[6.2rem] rounded-2xl mx-auto"></div>
            <div>
              <p className="text-center mb-2">180 points become a master</p>
              <div className="relative">
                <div className="w-full h-4 bg-[#F5F6F8] rounded-full drop-shadow-range"></div>
                <div className="w-[50%] h-4 bg-primary rounded-full absolute top-0"></div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/6 h-full flex flex-col gap-y-8">
            <div className="bg-light rounded-3xl h-full px-12 flex gap-x-10">
              <Link to="/profile">
                <p className="text-sm md:text-base min-[1440px]:text-[18px] text-[#AAA] py-5">
                  Account Settings
                </p>
              </Link>
              <Link to="/orderhistory">
                <p className="text-sm md:text-base min-[1440px]:text-[18px] text-dark py-5">
                  Order History
                </p>
                <div className="w-full h-[2px] bg-primary"></div>
              </Link>
            </div>
            <div className="flex flex-col gap-y-8">
              {dataOrder.length > 0 ? (
                dataOrder.map((result, i) =>
                  result.status == "Cancelled" ? (
                    <div
                      className="bg-light rounded-3xl h-full px-12 py-10"
                      key={i}
                    >
                      <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center">
                        <div>
                          <p className="text-sm text-[#AAA] mb-4">
                            {result.date}
                          </p>
                          <p className="text-2xl text-black">{result.movie}</p>
                        </div>
                        <img src={result.cinema_logo} alt="cinema" />
                      </div>
                      <div className="w-full h-[1px] bg-[#DEDEDE] my-8"></div>
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
                          <div className="py-3 px-10 bg-[#00BA8833] text-[#00BA88] text-sm font-bold rounded-lg text-center">
                            Ticket in active
                          </div>
                          <div className="py-3 px-10 bg-[#E82C2C33] text-[#E82C2C] text-sm font-bold rounded-lg text-center">
                            Not Paid
                          </div>
                        </div>
                        <details className="collapse bg-light">
                          <summary className="collapse-title text-xl font-medium px-0 ">
                            <div className="flex gap-x-4 justify-end absolute left-0 z-99">
                              <p className="text-[18px] text-[#AAA]">
                                Show Details
                              </p>
                              <img
                                src={getImageUrl("Forward", "svg")}
                                alt="icon"
                              />
                            </div>
                          </summary>
                          <div className="collapse-content">
                            <div className="flex flex-col gap-y-4 mt-6">
                              <p className="text-[18px] text-dark">
                                Ticket Information
                              </p>
                              <div className="flex flex-col md:flex-row md:justify-between w-full md:items-center">
                                <p className="text-sm text-[#8692A6]">
                                  No. Rekening Virtual:
                                </p>
                                <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-5 md:items-center md:justify-end">
                                  <input
                                    className="text-base md:text-[18px] text-dark font-bold disabled md:w-[40%]"
                                    ref={noVirtualRef}
                                    value={result.va_number}
                                    disabled
                                  />
                                  <button
                                    className="py-3 px-4 text-sm text-primary border-primary border rounded-md cursor-pointer"
                                    onClick={copyToClipboard}
                                  >
                                    {copySuccess}
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between w-full items-center">
                                <p className="text-sm text-[#8692A6]">
                                  Total Payment:
                                </p>
                                <p className="text-[18px] font-bold text-primary">
                                  Rp. {result.total_purchase}
                                </p>
                              </div>
                              <div>
                                <p className="text-[#A0A3BD] leading-8">
                                  Pay this payment bill before it is due, on,{" "}
                                  <span className="text-danger">
                                    on {result.date} {result.time}
                                  </span>
                                  . If the bill has not been paid by the
                                  specified time, it will be forfeited
                                </p>
                              </div>
                              <Link
                                to="/ticketresult"
                                className="text-sm py-4 px-10 font-bold text-light bg-primary rounded-md mt-6 text-center drop-shadow-xl focus:ring-2 md:self-start"
                              >
                                Cek Pembayaran
                              </Link>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-light rounded-3xl h-full px-12 py-10"
                      key={i}
                    >
                      <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center">
                        <div>
                          <p className="text-sm text-[#AAA] mb-4">
                            {result.date}
                          </p>
                          <p className="text-2xl text-black">
                            Avengers: End Game
                          </p>
                        </div>
                        <img src={result.cinema_logo} alt="cinema" />
                      </div>
                      <div className="w-full h-[1px] bg-[#DEDEDE] my-8"></div>
                      <div className="">
                        <div className="flex flex-col gap-y-4 md:flex-row gap-x-4">
                          <div className="py-3 px-10 bg-[#6E719133] text-[#6E7191] text-sm font-bold rounded-lg text-center">
                            Ticket used
                          </div>
                          <div className="py-3 px-10 bg-[#1D4ED833] text-[#1D4ED8] text-sm font-bold rounded-lg text-center">
                            Paid
                          </div>
                        </div>
                        <details className="collapse bg-light">
                          <summary className="collapse-title text-xl font-medium px-0 ">
                            <div className="flex gap-x-4 justify-end absolute left-0 z-99">
                              <p className="text-[18px] text-[#AAA]">
                                Show Details
                              </p>
                              <img
                                src={getImageUrl("Forward", "svg")}
                                alt="icon"
                              />
                            </div>
                          </summary>
                          <div className="collapse-content">
                            <div className="flex-col mt-6">
                              <p className="text-[18px] text-dark">
                                Ticket Information
                              </p>
                              <div className="flex flex-col gap-y-4 sm:flex-row md:gap-x-8 sm:items-center">
                                <img
                                  src={getImageUrl("qrcode", "png")}
                                  alt="qrcode"
                                />
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                  <div className="flex flex-col gap-y-2">
                                    <p className="text-xs text-[#AAA] font-semibold">
                                      Category
                                    </p>
                                    <p className="text-sm text-black font-semibold">
                                      PG-13
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="text-xs text-[#AAA] font-semibold">
                                      Time
                                    </p>
                                    <p className="text-sm text-black font-semibold">
                                      {result.time}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="text-xs text-[#AAA] font-semibold">
                                      Seats
                                    </p>
                                    <p className="text-sm text-black font-semibold">
                                      {result.seats}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="text-xs text-[#AAA] font-semibold">
                                      Movie
                                    </p>
                                    <p className="text-sm text-black font-semibold">
                                      {result.movie}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="text-xs text-[#AAA] font-semibold">
                                      Date
                                    </p>
                                    <p className="text-sm text-black font-semibold">
                                      {result.date}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-y-2">
                                    <p className="text-xs text-[#AAA] font-semibold">
                                      Count
                                    </p>
                                    <p className="text-sm text-black font-semibold">
                                      {result.total_ticket} pcs
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                  <p className="text-[#AAA] font-semibold">
                                    Total
                                  </p>
                                  <p className="text-2xl text-black font-semibold">
                                    Rp. {result.total_purchase}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </section>
      </section>
      <AuthModal />
      {isDropdownShown && (
        <DropdownMobile isClick={() => setIsDropdownShow(false)} />
      )}
    </>
  );
}

export default OrderHistory;
