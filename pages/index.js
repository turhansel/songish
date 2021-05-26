import Link from "next/link";
import dbConnect from "../utils/dbConnect";
import Song from "../models/Song";
import { useState } from "react";

const Home = ({ songs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="bg-hero-banner w-screen h-[40vh] bg-no-repeat bg-cover flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-7 ">
          <div>
            <h2 className="text-gray-600 text-4xl">Learn the songs you love</h2>
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

      <div className="px-24 py-8 my-0 mx-auto max-w-7xl grid grid-cols-4 items-center justify-center space-x-5 flex-wrap ">
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
            <div
              key={song._id}
              className="max-w-xs rounded overflow-hidden shadow-lg my-2"
            >
              <h1>{song.category}</h1>
              <Link href="/[id]" as={`/${song._id}`}>
                <a>
                  <img
                    src={song.image_url}
                    alt={song.name}
                    className="max-w-[220px] object-cover"
                  />
                </a>
              </Link>
              <div className=" ">
                <div className="font-black text-[16px] mb-2 ">{song.name}</div>
                <p className="text-grey-darker text-base">{song.artist_name}</p>
              </div>
              <div className="">
                <div className=" text-sm font-semibold text-grey-darker mr-2">
                  {song.difficulty}
                </div>
                <div className="">
                  <Link href="/[id]/edit" as={`/${song._id}/edit`}>
                    <button className="btn edit">Edit</button>
                  </Link>
                </div>
              </div>
            </div>
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
