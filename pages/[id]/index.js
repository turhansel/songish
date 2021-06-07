import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../utils/dbConnect";
import Song from "../../models/Song";
import ReactPlayer from "react-player";

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

    const { data } = await res.json();
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

    const { data } = await res.json();
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

  return (
    <div key={song._id} className="contain">
      <div className="h-screen">
        <div className="flex flex-col py-2 mb-5">
          <h1 className="text-xl">
            <span className="">Fretello </span>
            <span> &gt; </span>
            <span>Songs </span>
            <span>&gt; </span>
            <span>{song.name} </span>
          </h1>
          <h2 className="text-xl pt-3">{song.name}</h2>
          <h3 className="text-md pt-1">by {song.artist_name}</h3>
        </div>
        <div>
          <div className="flex flex-row justify-between ">
            <div className="flex-grow">
              <img src={song.image_url} className="max-w-[185px] float-left" />
              <p>{song.description}</p>
              <div className="mt-7 space-x-10">
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
            <div>
              <ReactPlayer
                muted={true}
                controls
                url={song.song_url}
                onDuration={handleDuration}
                onProgress={handleProgress}
              />
            </div>
          </div>
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
