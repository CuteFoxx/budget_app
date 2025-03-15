import { LoaderCircle } from "lucide-react";

function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={`transition-all duration-500 absolute inset-0 top-0 left-0 w-full h-full dark:bg-neutral-700/10 bg-neutral-200/10 backdrop-blur-[0.200rem] z-50 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <LoaderCircle className="animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
    </div>
  );
}

export default Loader;
