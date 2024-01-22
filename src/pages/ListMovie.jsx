import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../components/Navbar";
import DropdownMobile from "../components/DropdownMobile";
import getImageUrl from "../utils/imageGetter";
import { getAllMovie } from "../utils/https/home";
import AuthModal from "../components/AuthModal";

function ListMovie() {
  const [isDropdownShown, setIsDropdownShow] = useState(false);
  const [IsDate, setIsDate] = useState(false);
  const [date, setDate] = useState("Select month");
  const [dataDate] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const [searchParams] = useSearchParams({
    page: 1,
  });
  const getMovieUrl =
    import.meta.env.VITE_BACKEND_HOST + "/movie?" + searchParams.toString();
  const [dataMovie, setDataMovie] = useState([]);
  const [metaMovie, setMetaMovie] = useState([]);
  const token = useSelector((state) => state.user.userInfo.token);
  useEffect(() => {
    getAllMovie(token, getMovieUrl)
      .then((res) => {
        setDataMovie(res.data.data);
        setMetaMovie(res.data.meta);
      })
      .catch(() => {
        setDataMovie([]);
      });
  }, [searchParams]);

  const navigate = useNavigate();
  const pagination = (page) => {
    if (page !== metaMovie.page) {
      // const params = searchParams.toString().slice(0, 1) + page;
      navigate("/admin/movie?page=" + page);
    }
  };

  const renderButtons = () => {
    return Array.from({ length: metaMovie.total_page }, (_, index) => (
      <button
        onClick={() => {
          pagination(index + 1);
        }}
        key={index}
        className={` text-light border border-primary rounded-lg w-[40px] h-[40px] flex justify-center items-center drop-shadow-xl ${
          index + 1 === metaMovie.page
            ? "bg-primary text-white"
            : "bg-light text-primary"
        }`}
      >
        {index + 1}
      </button>
    ));
  };

  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const DeleteHandler = (id) => {
    authAxios.delete(`/movie/${id}`).then(() => {
      getAllMovie(token, getMovieUrl)
        .then((res) => {
          setDataMovie(res.data.data);
          setMetaMovie(res.data.meta);
        })
        .catch(() => {
          setDataMovie([]);
        });
    });
  };

  return (
    <>
      <Navbar isClick={() => setIsDropdownShow(true)} />
      <main className="py-10 px-11 xl:px-[130px] bg-[#F5F6F8] h-full font-mulish">
        <section className="w-full bg-light rounded-xl p-10 flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center">
            <p className="text-2xl text-dark font-bold">List Movie</p>
            <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:items-center">
              <div className="flex flex-col gap-y-2 relative">
                <div
                  className="py-3 px-4 bg-[#EFF0F6] flex justify-beetwen gap-x-10 rounded-lg items-center cursor-pointer"
                  onClick={() => setIsDate((state) => !state)}
                >
                  <img src={getImageUrl("calendar", "svg")} alt="icon" />
                  <p className="text-secondary font-semibold">{date}</p>
                  <img src={getImageUrl("Forward", "svg")} alt="icon" />
                </div>
                {IsDate && (
                  <div className="p-4 px-6 bg-[#EFF0F6] rounded-md cursor-pointer w-full absolute top-16 drop-shadow-xl">
                    <div className="flex flex-col gap-y-3">
                      {dataDate.map((result, i) => (
                        <p
                          className="text-secondary font-semibold"
                          key={i}
                          onClick={() => {
                            setDate(result);
                            setIsDate(false);
                          }}
                        >
                          {result}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/admin/addmovie"
                className="py-3 px-6 bg-primary rounded-lg text-light font-bold focus:ring-2 text-center"
              >
                Add Movies
              </Link>
            </div>
          </div>
          <div className="overflow-x-scroll">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-xs font-bold text-[#1F4173] text-center">
                  <td className="py-4">No</td>
                  <td className="p-4">Thumbnail</td>
                  <td className="p-4">Movie Name</td>
                  <td className="p-4">Category</td>
                  <td className="p-4">Released Date</td>
                  <td className="p-4">Duration</td>
                  <td className="p-4">Action</td>
                </tr>
              </thead>
              <tbody>
                {dataMovie.map((result, i) => (
                  <tr className="text-center text-sm" key={i}>
                    <td className="py-4 text-[#1F4173]">{i + 1}</td>
                    <td className="p-4">
                      <div className="w-10 h-10 flex justify-center">
                        {result.movie_photo == "" ? (
                          <img
                            src={getImageUrl("movie1", "png")}
                            alt="img"
                            className="bg-contain"
                          />
                        ) : (
                          <img
                            src={result.movie_photo}
                            alt="img"
                            className="bg-contain"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-primary">{result.movie_name}</td>
                    <td className="p-4 text-[#1F4173]">{result.genre}</td>
                    <td className="p-4 text-[#1F4173]">
                      {result.release_date}
                    </td>
                    <td className="p-4 text-[#1F4173]">{result.duration}</td>
                    <td className="p-4 flex gap-x-3 justify-center items-center">
                      <Link
                        className="p-2 bg-[#5D5FEF] rounded-md"
                        to={`/admin/editmovie/${result.Id}`}
                      >
                        <img src={getImageUrl("Edit", "svg")} alt="icon" />
                      </Link>
                      <div
                        className="p-2 bg-danger rounded-md cursor-pointer"
                        onClick={() => DeleteHandler(result.Id)}
                      >
                        <img src={getImageUrl("Delete", "svg")} alt="icon" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-x-2 justify-center font-nunito font-medium">
            {renderButtons()}
          </div>
        </section>
      </main>
      <AuthModal role={"Admin"} />
      {isDropdownShown && (
        <DropdownMobile isClick={() => setIsDropdownShow(false)} />
      )}
    </>
  );
}

export default ListMovie;
