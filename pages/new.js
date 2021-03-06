import Form from "../components/Form";

const NewSong = () => {
  const songForm = {
    name: "",
    artist_name: "",
    difficulty: "",
    category: "",
    image_url: "",
    song_url: "",
    description: "",
    duration: "",
    progress: "",
    date: new Date(),
  };

  return <Form formId="add-song-form" songForm={songForm} />;
};

export default NewSong;
