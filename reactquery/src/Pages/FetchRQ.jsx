import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";
import { FiFileText } from "react-icons/fi";

const FetchRQ = () => {
  const { data = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="max-w-7xl mx-auto p-8 sm:p-12 min-h-screen font-sans">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-[#F6FFF8] bg-clip-text text-transparent leading-tight tracking-tighter font-serif">
          Recent Articles
        </h1>
        <p className="mt-4 text-xl text-[#EAF4F4] max-w-2xl mx-auto">
          A selection of our most recent and insightful posts.
        </p>
      </header>

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((post) => {
          const { id, title, body } = post;
          return (
            <li
              key={id}
              className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative border border-gray-100 transform hover:-translate-y-2"
            >
              <div className="flex items-center text-green-400 mb-4 animate-bounce">
                <FiFileText className="text-4xl mr-3" />
                <span className="text-sm font-bold tracking-wider text-gray-800">
                  POST #{id}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug font-serif">
                {title}
              </h3>

              <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">
                {body}
                <span className="text-[#6B9080] font-semibold ml-1 cursor-pointer hover:underline">
                  …read more
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchRQ;
