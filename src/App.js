import React, { useState } from "react";

function App() {
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  // Define a state variable to store the imported images object
  const [images, setImages] = useState(
    importAll(require.context("./images", false, /\.(png|jpe?g|svg)$/))
  );

  // Define a state variable to store the currently selected image URL
  const [selectedImage, setSelectedImage] = useState("");

  // Define a function to select a random image from the images object
  const selectRandomImage = () => {
    // Convert the object keys to an array using Object.keys()
    const keys = Object.keys(images);
    // Generate a random index within the range of the keys array using Math.random()
    const randomIndex = Math.floor(Math.random() * keys.length);
    // Set the selectedImage state variable to the URL at the random key
    setSelectedImage(images[keys[randomIndex]]);
  };

  // Define a function to handle deleting the currently selected image from the object
  const handleDeleteImage = () => {
    // Find the key of the selected image in the images object using the Object.entries() method
    const key = Object.entries(images).find(
      ([key, value]) => value === selectedImage
    )?.[0];
    if (key) {
      // If the selected image is found in the object, create a new object without it using the Object.fromEntries() method
      const newImages = Object.fromEntries(
        Object.entries(images).filter(([k, v]) => k !== key)
      );
      // Update the images state variable and reset the selectedImage state variable
      setImages(newImages);
      setSelectedImage("");
    }
  };

  return (
    <div>
      {/* Render a button that calls the selectRandomImage function when clicked */}
      <button onClick={selectRandomImage}>Get Random Image</button>
      {/* If a selected image exists, render it and a delete button */}
      {selectedImage && (
        <div>
          <img style={{width: "400px"}} src={selectedImage} alt="Random Image" />
          <button onClick={handleDeleteImage}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default App;
