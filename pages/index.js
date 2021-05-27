import Link from "next/link";
import dbConnect from "../utils/dbConnect";
import Song from "../models/Song";
import { useState } from "react";
import Tilt from "react-tilt";

const Home = ({ songs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="bg-hero-banner w-screen h-[40vh] bg-no-repeat bg-cover bg-center flex justify-center items-center bg-opacity-60">
        <div className="flex flex-col justify-center items-center space-y-7 ">
          <div>
            <h2 className="text-gray-600 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Learn the songs you love
            </h2>
          </div>
          <div className="w-full">
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="form-input rounded-full w-full"
              placeholder="Search Song.."
            />
          </div>
        </div>
      </div>
      <div className="px-24 py-8 my-0 mx-auto max-w-7xl grid grid-cols-4 justify-between ">
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
            }
          })
          .map((song) => (
            <Tilt options={{ max: 25 }} key={song._id}>
              <div
                key={song._id}
                className="max-w-xs rounded-xl overflow-hidden blur-2xl shadow-xl my-2 p-5 flex flex-col justify-center items-center mix-blend-overlay	 bg-indigo-50"
              >
                <div className="">
                  <h1>{song.category}</h1>
                  <Link href="/[id]" as={`/${song._id}`}>
                    <a>
                      <img
                        src={song.image_url}
                        alt={song.name}
                        className="max-w-[200px] object-cover"
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col md:w-10/12 text-left space-y-2">
                  <h4 className="font-semibold text-[16px] mt-2">
                    {song.name}
                  </h4>
                  <p className="text-grey-darker text-gray-500">
                    {song.artist_name}
                  </p>
                  <p className=" text-sm font-semibold text-red-400 mr-2">
                    {song.difficulty}
                  </p>
                </div>

                <div className="">
                  <Link href="/[id]/edit" as={`/${song._id}/edit`}>
                    <button className="bg-green-200 md:px-16 sm:px-5 xs:px-5 rounded hover:bg-green-600 mt-3">
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
  // JSON.parse(safeJsonStringify(doc.data()))
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
