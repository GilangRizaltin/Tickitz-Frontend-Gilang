import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "../styles/main.css";
import Navbar from "../components/Navbar";
import getImageUrl from "../utils/imageGetter";
import DropdownMobile from "../components/DropdownMobile";

function Profile() {
  useEffect(() => {
    document.title = "Profile";
  });
  const [isDropdownShown, setIsDropdownShow] = useState(false);
  const [isPassShown, setIsPassShown] = useState(false);
  const [isPassShown2, setIsPassShown2] = useState(false);

  const showPassHandler = () => {
    setIsPassShown((state) => !state);
  };

  const showPassHandler2 = () => {
    setIsPassShown2((state) => !state);
  };

  const userInfo = useSelector((state) => state.user);
  const token = userInfo.userInfo.token;
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    points: 0,
    user_photo: "",
  });

  useEffect(() => {
    authAxios
      .get("/user/profile")
      .then((res) => {
        setUser({
          firstname: res.data.data[0].firstname,
          lastname: res.data.data[0].lastname,
          email: res.data.data[0].email,
          phone: res.data.data[0].phone,
          points: res.data.data[0].points,
          user_photo: res.data.data[0].user_photo,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const dataClone = { ...user };
    dataClone[e.target.name] = e.target.value;
    setUser(dataClone);
  };

  const [image, setImage] = useState("");
  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //validasi

    const formData = new FormData();
    formData.append("user_photo", image);
    formData.append("firstname", e.target.firstname.value);
    formData.append("lastname", e.target.lastname.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("last_password", e.target.lastPassword.value);
    formData.append("new_password", e.target.newPassword.value);

    authAxios
      .patch("/user", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isDotHandler, setIsDotHandler] = useState(false);

  return (
    <>
      <Navbar isClick={() => setIsDropdownShow(true)} />
      <section className="bg-[#A0A3BD33] py-10 font-mulish">
        <form
          className="px-5 md:px-11 xl:px-[130px] font-mulish flex flex-col gap-y-4 lg:flex-row lg:gap-x-6"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div className="lg:w-2/6 bg-light h-full rounded-3xl flex flex-col gap-y-7 p-[40px]">
            <div className="flex justify-between">
              <p className="w-1/2 lg:w-1/3">INFO</p>
              <div className="flex flex-col items-end relative w-1/2 lg:w-2/3">
                <img
                  src={getImageUrl("dot", "svg")}
                  alt="icon"
                  onClick={() => setIsDotHandler((state) => !state)}
                  className="cursor-pointer"
                />
                <input
                  type="file"
                  className="hidden"
                  id="image"
                  name="image"
                  onChange={changeImageHandler}
                />
                <label
                  htmlFor="image"
                  className={`bg-light shadow-md py-3 px-4 rounded-md cursor-pointer absolute top-6 ${
                    isDotHandler ? "" : "hidden"
                  }`}
                >
                  Change Image
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-40 h-40 rounded-full"
                ></img>
              ) : (
                <img
                  src={user.user_photo}
                  alt="image"
                  className="w-40 h-40 rounded-full"
                />
              )}
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
          <div className="lg:w-4/6 h-full flex flex-col gap-y-8">
            <div className="bg-light rounded-3xl h-full px-12 flex gap-x-10">
              <Link to="/profile">
                <p className="text-sm md:text-base min-[1440px]:text-[18px] text-dark py-5">
                  Account Settings
                </p>
                <div className="w-full h-[2px] bg-primary"></div>
              </Link>
              <Link to="/orderhistory">
                <p className="text-sm md:text-base min-[1440px]:text-[18px] text-[#AAA] py-5">
                  Order History
                </p>
              </Link>
            </div>
            <div className="flex flex-col gap-y-7">
              <div className="bg-light rounded-3xl h-full px-6 md:px-12 py-10">
                <p className="text-dark mb-4">Details Information</p>
                <div className="w-full h-[1px] bg-[#DEDEDE] mb-8"></div>
                <div className="grid md:grid-cols-2 gap-x-7 gap-y-5">
                  <div className="flex flex-col items-start gap-y-3">
                    <label
                      htmlFor="firstname"
                      className="text-sm md:text-base text-secondary"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="py-4 px-6 rounded-2xl outline-none border text-secondary w-full text-sm md:text-base"
                      value={user.firstname ? user.firstname : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <label
                      htmlFor="lastname"
                      className="text-secondary text-sm md:text-base"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="py-4 px-6 rounded-2xl outline-none border text-secondary w-full text-sm md:text-base"
                      value={user.lastname ? user.lastname : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <label
                      htmlFor="email"
                      className="text-secondary text-sm md:text-base"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="py-4 px-6 rounded-2xl outline-none border text-secondary w-full text-sm md:text-base"
                      value={user.email ? user.email : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <label
                      htmlFor="phone"
                      className="text-secondary text-sm md:text-base"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className="py-4 px-6 rounded-2xl outline-none border text-secondary w-full text-sm md:text-base"
                      value={user.phone ? user.phone : ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-light rounded-3xl h-full px-6 md:px-12 py-10">
                <p className="text-dark mb-4">Account and Privacy</p>
                <div className="w-full h-[1px] bg-[#DEDEDE] mb-8"></div>
                <div className="grid md:grid-cols-2 gap-x-7 gap-y-5">
                  <div className="flex flex-col items-start gap-y-3 relative">
                    <label
                      htmlFor="password"
                      className="text-secondary text-sm md:text-base"
                    >
                      Last Password
                    </label>
                    <input
                      type={isPassShown ? "text" : "password"}
                      className="py-4 px-6 rounded-2xl outline-none border text-secondary w-full text-sm md:text-base"
                      placeholder="Write your last password"
                      id="lastPassword"
                    />
                    <img
                      src={getImageUrl("eye", "svg")}
                      alt="icon"
                      className="absolute top-12 md:top-14 right-4 cursor-pointer"
                      onClick={showPassHandler}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-y-3 relative">
                    <label
                      htmlFor="confirmPass"
                      className="text-secondary text-sm md:text-base"
                    >
                      New Password
                    </label>
                    <input
                      type={isPassShown2 ? "text" : "password"}
                      className="py-4 px-6 rounded-2xl outline-none border text-secondary w-full text-sm md:text-base"
                      placeholder="Create new password"
                      id="newPassword"
                    />
                    <img
                      src={getImageUrl("eye", "svg")}
                      alt="icon"
                      className="absolute top-12 md:top-14 right-4 cursor-pointer"
                      onClick={showPassHandler2}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="py-3 px-4 bg-primary font-bold text-light md:w-2/6 rounded-2xl focus:ring-2"
                >
                  Update Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      {isDropdownShown && (
        <DropdownMobile isClick={() => setIsDropdownShow(false)} />
      )}
    </>
  );
}

export default Profile;
