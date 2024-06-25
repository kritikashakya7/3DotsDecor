import { useState } from "react";
import curtain from "../assets/curtains.svg";
import Button from "../components/Button";

const Customize = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [wallColor, setwallColor] = useState("");
  return (
    <div className="container px-5 py-14 min-height space-y-3">
      <div className="space-y-3">
        <h1 className="text-xl font-bold">Customize Your Own</h1>
        <p className="text-sm text-gray-500">
          Welcome to Customize Your Own! Transform your space with curtains that
          perfectly complement your wall color. Here&apos;s how it works: Select
          Your Wall Color: Choose the color of your wall to get started. Pick
          Your Curtain Color: Explore a variety of curtain colors and see which
          one matches best with your wall. Preview the Perfect Match: Instantly
          see how your chosen curtain color looks against your wall. Order Your
          Custom Curtain: Love the look? Place your order for your custom
          curtain right now! Don&apos;t wait! Discover the perfect color
          combination for your home today. Try it out and create a space you
          love!
        </p>
      </div>

      <div className="flex gap-2">
        <div className="shadow flex items-center gap-2 max-w-[300px] justify-center p-2 rounded">
          <p className="text-sm">Select Wall Color:</p>
          <input
            type="color"
            className="bg-transparent"
            value={wallColor}
            onChange={(e) => setwallColor(e.target.value)}
          />
          {wallColor}
        </div>

        {/* <div className="shadow flex items-center gap-2 max-w-[350px] justify-center p-2 rounded">
          <p className="text-sm">Select Curtain Color:</p>
          <input
            type="color"
            className="bg-transparent"
            value={curtainColor}
            onChange={(e) => setCurtainColor(e.target.value)}
          />
          {curtainColor}
        </div> */}
      </div>
      <div className="flex">
        <div className="flex-1 space-y-3">
          <h1 className="font-bold">Choose Your Option</h1>
          {/* Images */}
          <ul className=" flex  gap-2  flex-wrap ">
            <li
              className={`flex   p-0.5 rounded ${
                selectedImage ===
                "https://m.media-amazon.com/images/I/61nBFYivYNL._SX300_SY300_QL70_FMwebp_.jpg"
                  ? "p-0.5 border-2 rounded border-primary"
                  : "border-2 border-transparent"
              }`}
            >
              <button
                className="size-28 rounded"
                onClick={() => setSelectedImage("/c1.png")}
              >
                <img
                  className="rounded size-full max-w-full max-h-full object-cover"
                  src="/c1.png"
                />
              </button>
            </li>
            <li
              className={`flex   p-0.5 rounded ${
                selectedImage ===
                "https://m.media-amazon.com/images/I/61CPkHQtr5L._SY879_.jpg"
                  ? "p-0.5 border-2 rounded border-primary"
                  : "border-2 border-transparent"
              }`}
            >
              <button
                className="size-28 rounded"
                onClick={() => setSelectedImage("/c2.png")}
              >
                <img
                  className="rounded size-full max-w-full max-h-full object-cover"
                  src="/c2.png"
                />
              </button>
            </li>
            <li
              className={`flex   p-0.5 rounded ${
                selectedImage ===
                "https://m.media-amazon.com/images/I/91ysdt4QetL._SY879_.jpg"
                  ? "p-0.5 border-2 rounded border-primary"
                  : "border-2 border-transparent"
              }`}
            >
              <button
                className="size-28 rounded"
                onClick={() =>
                  setSelectedImage(
                    "https://m.media-amazon.com/images/I/91ysdt4QetL._SY879_.jpg"
                  )
                }
              >
                <img
                  className="rounded size-full max-w-full max-h-full object-cover"
                  src="https://m.media-amazon.com/images/I/91ysdt4QetL._SY879_.jpg"
                />
              </button>
            </li>
          </ul>
        </div>
        <div
          className=" h-[600px] flex justify-center w-[70%] border rounded border-black"
          style={{
            backgroundColor: wallColor,
          }}
        >
          {/* <svg
          fill={curtainColor}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 297 297"
          stroke={curtainColor}
          className="w-[580px]"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M98.351,202.043H5.337l-3.725,71.021c-0.141,2.685,0.828,5.31,2.678,7.261c1.851,1.95,4.421,3.055,7.11,3.055 c4.922,0,6.922,1.204,10.234,3.198c4.211,2.536,9.978,6.008,20.346,6.008s16.134-3.472,20.345-6.008 c3.312-1.994,5.312-3.198,10.234-3.198c4.92,0,6.92,1.204,10.232,3.198c4.21,2.536,9.976,6.008,20.344,6.008 s16.134-3.472,20.344-6.008c3.312-1.994,5.312-3.198,10.232-3.198c3.605,0,6.919-1.979,8.628-5.152 c1.711-3.173,1.541-7.029-0.441-10.04L98.351,202.043z"></path>{" "}
              <path d="M291.663,202.043h-93.014l-43.547,66.144c-1.982,3.011-2.152,6.867-0.441,10.04c1.71,3.173,5.024,5.152,8.628,5.152 c4.921,0,6.921,1.204,10.233,3.198c4.21,2.536,9.977,6.008,20.344,6.008c10.368,0,16.134-3.473,20.345-6.008 c3.311-1.995,5.31-3.198,10.23-3.198c4.922,0,6.922,1.204,10.234,3.198c4.211,2.536,9.978,6.008,20.346,6.008 s16.135-3.472,20.346-6.008c3.312-1.994,5.312-3.198,10.234-3.198c2.689,0,5.26-1.105,7.11-3.055 c1.85-1.951,2.819-4.576,2.678-7.261L291.663,202.043z"></path>{" "}
              <path d="M232.697,58.62c-23.309,9.516-52.569,15.401-79.191,16.018c-0.004,0.112-0.018,0.221-0.018,0.334 c0,1.141,0.091,28.271,7.972,55.854c10.444,36.552,28.114,51.906,44.961,57.494h84.524l-8.617-164.302h4.871 c5.413,0,9.802-4.389,9.802-9.802s-4.389-9.802-9.802-9.802H9.802C4.389,4.415,0,8.804,0,14.217s4.389,9.802,9.802,9.802h4.872 L6.057,188.321h84.524c16.846-5.588,34.516-20.942,44.96-57.494c7.881-27.583,7.972-54.713,7.972-55.854 c0-0.118-0.015-0.232-0.019-0.349c-26.406-0.716-55.316-6.583-78.39-16.003c-23.279-9.506-38.085-21.549-42.876-34.602h15.39 c5.316,7.636,16.717,15.382,32.673,21.897c23.099,9.432,52.486,15.062,78.609,15.062s55.51-5.63,78.609-15.062 c15.956-6.515,27.357-14.26,32.673-21.897h15.39C270.782,37.072,255.976,49.115,232.697,58.62z"></path>{" "}
            </g>{" "}
          </g>
        </svg> */}
          <img src={selectedImage} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Add To Cart</Button>
      </div>
    </div>
  );
};

export default Customize;
