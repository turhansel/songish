import Link from "next/link";
import dbConnect from "../utils/dbConnect";
import Song from "../models/Song";
import { useState } from "react";
import Tilt from "react-tilt";
import Lottie from "../components/Lottie";
import ProgressBar from "@ramonak/react-progress-bar";
import moment from "moment";

const Home = ({ songs }) => {
  function format(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }
  const responsive = "{window.innerWidth > 1200 ? '500px' : '100px'}";

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("Everything");
  const [totalDuration, setTotalDuration] = useState("");

  const yesterday = moment().subtract(48, "hours").calendar(); // IDK how i fix this bug :D
  const thisWeek = moment().subtract(7, "days").calendar();
  const thisMonth = moment().subtract(1, "months").calendar();

  return (
    <div className="md:mt-28 sm:mt-20">
      <div className="bg-indigo-100 w-screen h-[45vh] bg-no-repeat bg-cover bg-center flex justify-center items-center bg-opacity-60">
        <div className="flex items-center space-y-7 justify-evenly">
          <div className="">
            <Lottie
              design={{
                width: responsive,
                height: responsive,
              }}
              animationData="./lotties/guitar.json"
            />
          </div>
          <div className="flex flex-col space-y-3 sm:block">
            <div>
              <h2 className="text-gray-600 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 font-bold">
                Learn the songs you love
              </h2>
            </div>
            <div className="md:w-full ">
              <input
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="form-input rounded-full md:w-full"
                placeholder="Search Song..."
              />
              <select
                type="text"
                maxLength="30"
                name="category"
                value={searchDate}
                onChange={(e) => {
                  setSearchDate(e.target.value);
                }}
                className="form-input rounded-full md:w-full mt-3 w-[67%]"
              >
                <option>Everything</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* {songs.map((song) => (
        <p>{song.duration}</p>
      ))} */}
      <div
        className="h-full md:px-12 my-8 mx-auto max-w-7xl grid sm:grid-cols-2 
      md:grid-cols-4 grid-cols-1justify-center items-center"
      >
        {songs
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.category.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .filter((value) => {
            if (searchDate == "Everything") {
              return value;
            } else if (searchDate == "Today") {
              {
                return yesterday < moment(value.updatedAt).calendar();
              }
            } else if (searchDate == "This Week") {
              {
                /* console.log(value.duration)), */
              }
              return thisWeek < moment(value.updatedAt).calendar();
            } else if (searchDate == "This Month") {
              return thisMonth < moment(value.updatedAt).calendar();
            }
          })
          .map((song) => (
            <Tilt options={{ max: 25 }} key={song._id}>
              <div
                key={song._id}
                className="rounded-xl overflow-hidden shadow-xl my-2 
                p-4  flex flex-col justify-center items-center bg-indigo-50
                sm:flex-col hover:shadow-md md:mx-4 mx-12 "
              >
                <div className="">
                  <h1 className="mb-1 text-center">{song.category}</h1>
                  <Link href="/[id]" as={`/${song._id}`}>
                    <a>
                      <img
                        height={"200px"}
                        src={song.image_url}
                        alt={song.name}
                        className="w-[200px] h-52"
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col md:w-10/12 md:space-y-2 space-y-2 md:ml-0 ml-2">
                  <h4 className="font-semibold text-[16px] mt-2">
                    {song.name}
                  </h4>
                  <p className=" text-gray-500">{song.artist_name}</p>
                  <p className=" text-sm font-semibold text-gray-500 mr-2">
                    {song.difficulty}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{format(song.duration)}</p>
                {song.progress > 0 && (
                  <div className="w-9/12">
                    <ProgressBar
                      completed={song.progress}
                      borderRadius={"30px"}
                      bgColor={"#34D399"}
                      labelSize={"10px"}
                      labelAlignment={"center"}
                    />
                  </div>
                )}
                <div className="">
                  <Link href="/[id]/edit" as={`/${song._id}/edit`}>
                    <button className="bg-indigo-200 md:px-16 px-12 rounded hover:bg-indigo-400 mt-3">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </Tilt>
          ))}
      </div>
    </div>
  );
};

/* Retrieves song(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();
  /* find all the data in our database */
  const result = await Song.find({});

  const songs = result.map((doc) => {
    const song = doc.toObject();
    song._id = song._id.toLocaleString();
    return song;
  });

  return { props: { songs: songs } };
}

export default Home;
