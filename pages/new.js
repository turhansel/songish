import Form from "../components/Form";

const NewSong = () => {
  const songForm = {
    name: "",
    owner_name: "",
    species: "",
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: "",
    likes: [],
    dislikes: [],
  };

  return <Form formId="add-song-form" songForm={songForm} />;
};

export default NewSong;
