import Link from "next/link";
import dbConnect from "../utils/dbConnect";
import Song from "../models/Song";

const Index = ({ songs }) => (
  <div className="px-24 py-8 max-w-5xl flex items-center justify-center space-x-5">
    {songs.map((song) => (
      <div
        key={song._id}
        className="max-w-xs rounded overflow-hidden shadow-lg my-2"
      >
        <h1>{song.category}</h1>
        <Link href="/[id]" as={`/${song._id}`}>
          <a>
            <img src={song.image_url} alt={song.name} className="max-w-18" />
          </a>
        </Link>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{song.name}</div>
          <p className="text-grey-darker text-base">{song.artist_name}</p>
        </div>
        <div className="px-6 py-4">
          <div className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
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
);

/* Retrieves pet(s) data from mongodb database */
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

export default Index;
