import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../utils/dbConnect";
import Song from "../../models/Song";

const SongPage = ({ song }) => {
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

  return (
    <div key={song._id}>
      <div className="card">
        <img src={song.image_url} />
        <h5 className="pet-name">{song.name}</h5>
        <div className="main-content">
          <p className="pet-name">{song.name}</p>
          <p className="owner">Owner: {song.owner_name}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${song._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
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
