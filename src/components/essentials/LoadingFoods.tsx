import { DotPulse } from "@uiball/loaders";


const LoadingFoods = () => {
  return (
    <div className="w-full my-4 flex justify-center">
      <DotPulse size={40} speed={1} color="#44B621" />
    </div>
  );
}

export default LoadingFoods