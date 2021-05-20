import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const Form = ({ formId, songForm, forNewSong = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: songForm.name,
    artist_name: songForm.artist_name,
    difficulty: songForm.difficulty,
    category: songForm.category,
    description: songForm.description,
    image_url: songForm.image_url,
    song_url: songForm.song_url,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/songs/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update song");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add song");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewSong ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.artist_name) err.artist_name = "artist_name is required";
    if (!form.difficulty) err.difficulty = "difficulty is required";
    if (!form.category) err.category = "category is required";
    if (!form.description) err.description = "Owner is required";
    if (!form.image_url) err.image_url = "image_url is required";
    if (!form.song_url) err.song_url = "song_url is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          maxLength="50"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="owner_name">artist_name</label>
        <input
          type="text"
          maxLength="20"
          name="artist_name"
          value={form.artist_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="species">difficulty</label>
        <input
          type="text"
          maxLength="30"
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <label htmlFor="age">description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />
        <label htmlFor="image_url">song_url </label>
        <input
          type="url"
          name="song_url"
          value={form.song_url}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
