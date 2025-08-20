import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../API/api";
import { FiFileText } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

const queryClient = useQueryClient()


  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: ()=>fetchPosts(pageNumber),
    staleTime: 10000,
    placeholderData:keepPreviousData,
    // refetch data time esp for stock market updates(polling)
    // refetchIntervalInBackground:1000
  });

   const deleteMutation = useMutation({
   mutationFn:(id)=>deletePost(id),
   onSuccess:(data,id)=>{
    queryClient.setQueryData(["posts", pageNumber],(curElem)=>{
      return curElem?.filter((post)=>post.id!==id)
    })
   }
  })

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong...."}</p>;

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
                <NavLink to={`/rq/${id}`}>
                  <span className="text-[#6B9080] font-semibold ml-1 cursor-pointer hover:underline">
                    …read more
                  </span>
                </NavLink>
              </p>
              <button onClick={()=>deleteMutation.mutate(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center items-center mt-12 space-x-4">
        <button disabled={pageNumber===0?true:false} onClick={()=>setPageNumber((prev)=>prev-1)}>Previous</button>
        <h2 className="text-2xl font-bold text-[#EAF4F4] font-mono">{pageNumber}</h2>
        <button onClick={()=>setPageNumber((prev)=>prev+1)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;