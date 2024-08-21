import { useState } from "react";
import axios from "axios";

function App() {
  const [catFact, setCatFact] = useState("");
  const [catImage, setCatImage] = useState("");
  const [isFactVisible, setIsFactVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);

  const fetchCatFact = async () => {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      setCatFact(response.data.fact);
      setIsFactVisible(true);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    }
  };

  const fetchCatImage = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1"
      );
      setCatImage(response.data[0].url);
      setIsImageVisible(true);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    }
  };

  const handleClick = () => {
    fetchCatFact();
    fetchCatImage();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Random Cat Facts</h1>
      <div className="flex flex-row space-x-8">
        <div
          className={`bg-white rounded-lg shadow-lg p-6 flex-1 transition-all duration-500 h-[50vh] aspect-square ${
            isFactVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-4"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Cat Fact</h2>
          <p className="text-gray-700">{catFact}</p>
        </div>
        <div
          className={`bg-white rounded-lg shadow-lg p-6 flex-1 transition-all duration-500 h-[50vh] aspect-square   ${
            isImageVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-4"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Cat Image</h2>
          {catImage && (
            <img
              src={catImage}
              alt="Cat"
              className="rounded-lg h-[40vh] aspect-square"
            />
          )}
        </div>
      </div>
      <button
        className="bg-white text-indigo-500 rounded-full px-6 py-3 mt-8 hover:bg-indigo-500 hover:text-white transition-colors duration-300 cursor-pointer"
        onClick={handleClick}
      >
        Get New Fact and Image
      </button>
    </div>
  );
}

export default App;
