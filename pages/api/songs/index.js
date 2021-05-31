import dbConnect from "../../../utils/dbConnect";
import Song from "../../../models/Song";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const songs = await Song.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: songs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const song = await Song.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: song });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT" /* Edit a model by its ID */:
      try {
        const song = await Song.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!song) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: song });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
