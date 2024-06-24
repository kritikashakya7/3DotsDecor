import logo from "../assets/3Dots.png";

const LoadingScreen = () => {
  return (
    <div className="container min-height m-auto flex gap-3 flex-col items-center justify-center w-full h-[500px] animate-pulse">
      <img src={logo} className="size-32" />
    </div>
  );
};

export default LoadingScreen;
