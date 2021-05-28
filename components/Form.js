import Head from "next/head";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import Lottie from "../components/Lottie";

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

  const [categories, setCategories] = useState([
    "",
    "Women That Rock",
    "Iconic Rock Guitar Riffs",
    "4 Chords Songs",
    "Funky Grooves",
    "Chill Chords",
  ]);

  const [difficulties, setDifficulties] = useState([
    "",
    "Easy",
    "Medium",
    "Expert",
  ]);

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

  const responsive = "{window.innerWidth > 768 ? '500px' : '300px'}";

  return (
    <Fragment>
      <Head>
        <title>Create Song</title>
      </Head>

      <div className="bg-form-bg bg-cover md:h-screen">
        <div className="flex md:flex-row justify-between sm:flex-col sm:flex-wrap contain">
          <div className="">
            <Lottie
              design={{ width: responsive, height: responsive }}
              animationData="/lotties/form-guitar.json"
            />
          </div>
          <div className="">
            <form id={formId} onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col items-center justify-center">
                <Lottie
                  design={{ width: "100px", height: "100px" }}
                  animationData="/lotties/music.json"
                />
                <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                  Create Song
                </h1>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                  <label htmlFor="name" className="form-label">
                    Song Title
                  </label>
                  <input
                    size="23"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="artist_name" className="form-label">
                    Artist Name
                  </label>
                  <input
                    size="23"
                    type="text"
                    maxLength="20"
                    name="artist_name"
                    value={form.artist_name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label htmlFor="difficulty" className="form-label">
                    Difficulty
                  </label>
                  <select
                    type="text"
                    maxLength="30"
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    {difficulties.map((difficult, index) => (
                      <option key={index}>{difficult}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    type="text"
                    maxLength="30"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    {categories.map((category, index) => (
                      <option key={index}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor="image_url" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                required
                className="form-input"
              />
              <label htmlFor="image_url" className="form-label">
                Song URL
              </label>
              <input
                className="form-input"
                type="url"
                name="song_url"
                value={form.song_url}
                onChange={handleChange}
                required
              />

              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-input"
                rows="4"
                cols="50"
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-auto bg-purple-400 hover:bg-purple-600 rounded-lg shadow-xl font-medium text-white px-6 py-2 mt-3"
              >
                Create
              </button>
            </form>
            <p>{message}</p>
            <div>
              {Object.keys(errors).map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Form;
