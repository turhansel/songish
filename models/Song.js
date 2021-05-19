import mongoose from "mongoose";

/* SongSchema will correspond to a collection in your MongoDB database. */
const SongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this song."],
      maxlength: [20, "Name cannot be more than 60 characters"],
    },
    artist_name: {
      type: String,
      required: [true, "Please provide the artist_name name"],
      maxlength: [20, "artist_name cannot be more than 60 characters"],
    },
    difficulty: {
      type: String,
      required: [true, "Please enter difficulty."],
    },
    category: {
      type: String,
      required: [true, "Please enter category."],
    },
    description: {
      type: String,
    },
    image_url: {
      required: [true, "Please provide an image url for this song."],
      type: String,
    },
    song_url: {
      required: [true, "Please add an image url for this song."],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Song || mongoose.model("Song", SongSchema);
