import Link from "next/link";
import dbConnect from "../utils/dbConnect";
import Song from "../models/Song";

const Index = ({ songs }) => (
  <>
    {/* Create a card for each pet */}
    {songs.map((song) => (
      <div key={song._id}>
        <div className="card">
          <img src={song.image_url} />
          <h5 className="pet-name">{song.name}</h5>
          <div className="main-content">
            <p className="pet-name">{song.name}</p>
            <p className="owner">Owner: {song.owner_name}</p>

            {/* Extra Pet Info: Likes and Dislikes */}
            <div className="likes info">
              <p className="label">Likes</p>
              <ul>
                {song.likes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>
            <div className="dislikes info">
              <p className="label">Dislikes</p>
              <ul>
                {song.dislikes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${song._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${song._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Song.find({});
  const songs = result.map((doc) => {
    const song = doc.toObject();
    song._id = song._id.toString();
    return song;
  });

  return { props: { songs: songs } };
}

export default Index;
