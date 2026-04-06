import { CircleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center my-5">
      <CircleLoader className="text-3xl" />
    </div>
  );
}
