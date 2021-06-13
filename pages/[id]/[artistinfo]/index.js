import React, { useState, useEffect } from "react";
import dbConnect from "../../../utils/dbConnect";
import Song from "../../../models/Song";
import useSWR from "swr";
import axios from "axios";

const ArtistDetail = ({ song }) => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await axios(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${song.artist_name}`
    );
    // const myJSON = JSON.stringify(result);
    // const mydata = JSON.stringify(result);
    setData(result.data);
  });

  // TODO 1: cekilen datayi ui goster
  console.log(data);
  return (
    <div className="md:mt-28 mt-44 ">
      <div className="text-gray-100">
        {/* <h1>{data.strMood}</h1>
        <p>{data.strMood}</p>
        <strong>{data.strMood}</strong>
        <strong> {data.strMood}</strong>
        <p>{data.strMood}aa</p> */}
        <p>bla</p>
      </div>
    </div>
  );
};
export async function getServerSideProps({ params }) {
  await dbConnect();

  const song = await Song.findById(params.id).lean();
  song._id = song._id.toString();

  return { props: { song } };
}

export default ArtistDetail;
