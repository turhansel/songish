import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditSong = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: song, error } = useSWR(id ? `/api/songs/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!song) return <p>Loading...</p>;

  const songForm = {
    name: song.name,
    artist_name: song.artist_name,
    difficulty: song.difficulty,
    category: song.category,
    description: song.description,
    image_url: song.image_url,
    song_url: song.song_url,
    date: song.date,
  };

  return (
    <Form formId="edit-song-form" songForm={songForm} forNewSong={false} />
  );
};

export default EditSong;
