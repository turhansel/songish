import Lottie from "../components/Lottie";

const Form = (props) => {
  return (
    <div className="flex flex-row justify-evenly max-w-7xl xs:flex-col">
      <div className="text-left px-36">
        <Lottie
          design={{ width: "500px", height: "500px" }}
          animationData="https://assets7.lottiefiles.com/packages/lf20_70lckodc.json"
        />
      </div>

      <div className="flex-1">
        <div class="flex flex-col items-center justify-center">
          <Lottie
            design={{ width: "100px", height: "100px" }}
            animationData="https://assets5.lottiefiles.com/packages/lf20_li0pgakp.json"
          />
          <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
            Create Song
          </h1>
        </div>

        <div className="flex flex-col mt-4 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Song Title
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder="Song Title"
          />
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Artist Name
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder="Artist Name"
          />

          <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Difficulty
          </label>
          <select class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
            <option>Easy</option>
            <option>Medium</option>
            <option>Expert</option>
          </select>

          <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Category
          </label>
          <select class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
            <option>Women That Rock</option>
            <option>Iconic Rock Guitar Riffs</option>
            <option>4 Chords Songs</option>
            <option>Funky Grooves</option>
            <option>Chill Chords</option>
          </select>
        </div>

        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
