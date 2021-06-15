import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../utils/dbConnect";
import Song from "../../models/Song";
import ReactPlayer from "react-player";
import moment from "moment";

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

  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await axios(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${song.artist_name}`
    );
    // const myJSON = JSON.stringify(result);
    // const mydata = JSON.stringify(result);
    setData(result.data);
  });

  console.log(data);

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
          <div className="flex md:flex-row flex-col justify-between items-center">
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

              {message && <p>{message}</p>}
            </div>
            <div className="md:mb-0 mb-32">
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
          <Link href="/[id]/[id]" as={`/${song._id}/${song.artist_name}`}>
            <a>tikla bakam</a>
          </Link>
        </div>
      </div>
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
