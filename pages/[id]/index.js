import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../utils/dbConnect";
import Song from "../../models/Song";
import ReactPlayer from "react-player";
import moment from "moment";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const SongPage = ({ song }) => {
  const contentType = "application/json";
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const songID = router.query.id;
    try {
      await fetch(`/api/songs/${songID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the song.");
    }
  };

  const putProgress = async () => {
    const songID = router.query.id;

    const res = await fetch(`/api/songs/${songID}`, {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify({
        progress: progress,
      }),
    });
  };

  const putDuration = async (duration) => {
    const songID = router.query.id;

    const res = await fetch(`/api/songs/${songID}`, {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify({
        duration: duration,
      }),
    });
  };

  const [duration, setDuration] = useState([]);
  const [progress, setProgress] = useState([]);

  const handleDuration = (duration) => {
    setDuration(duration);
    putDuration(duration);
  };

  const handleProgress = (progress) => {
    setProgress(parseInt(progress.played * 100));
    putProgress(progress);
  };

  const [data, setData] = useState("");

  useEffect(() => {
    fetch(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(
        song.artist_name
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div
      key={song._id}
      className="contain md:mt-32 md:px-0 px-12 mt-28 md:mb-0 mb-16"
    >
      <div className="h-screen">
        <div className="flex flex-col py-2 mb-5">
          <h1 className="text-xl">
            <span className="text-gray-600">Fretello </span>
            <span> &gt; </span>
            <span className="text-gray-600">Songs </span>
            <span>&gt; </span>
            <span className="text-gray-700">{song.category} </span>
          </h1>
          <h2 className="text-xl pt-3 text-gray-700">{song.name}</h2>
          <h3 className="text-md pt-1">by {song.artist_name}</h3>
          <p className="text-gray-500 text-sm md:mt-2">
            PUBLISHED DATE {moment(song.date).calendar()}
          </p>
        </div>
        <div>
          <div className="flex md:flex-row flex-col justify-between items-center mb-3">
            <div className="">
              <img
                src={song.image_url}
                className="max-w-[250px] float-left md:mr-4 mr-7"
              />
              <p className="md:mx-4 md:ml-6 text-left">{song.description}</p>
              <div className="mt-7 space-x-10 md:mb-6 mb-4 ">
                <div className="px-4 max-w-md text-left"></div>
                <Link href="/[id]/edit" as={`/${song._id}/edit`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
            <div>
              <ReactPlayer
                width="420px"
                muted={true}
                controls
                url={song.song_url}
                onDuration={handleDuration}
                onProgress={handleProgress}
              />
            </div>
          </div>
        </div>
        <div className="md:mt-8 mb-3">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left
                   bg-indigo-50 rounded-lg hover:bg-indigo-200 
                 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                >
                  <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-400">
                    Do you want more information about the artist?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm  text-gray-600 border rounded-lg shadow-xl hover:shadow-md bg-indigo-50 hover:bg-indigo-100 ">
                  {data.artists && data.artists !== null > 0 ? (
                    data.artists.map((artist) => (
                      <p className="mb-8 text-[16px]" key={artist.idArtist}>
                        {artist.strBiographyEN}
                      </p>
                    ))
                  ) : (
                    <p>No information was found about the artist.</p>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const song = await Song.findById(params.id).lean();
  song._id = song._id.toString();

  return { props: { song } };
}

export default SongPage;
