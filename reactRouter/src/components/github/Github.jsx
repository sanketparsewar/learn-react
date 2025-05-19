import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

function Github() {
//   const [data, setData] = React.useState({});
//   useEffect(() => {
//     fetch("https://api.github.com/users/sanketparsewar")
//       .then((res) => res.json())
//       .then((res) => setData(res));
//   }, []);

const data = useLoaderData();

  return (
    <div className="flex flex-col items-center p-5 font-sans bg-gray-100 rounded-lg shadow-lg">
      <img
        src={data.avatar_url}
        alt="Profile"
        className="rounded-full w-36 h-36 mb-4 border-4 border-blue-500"
      />
      <h2 className="text-gray-800 text-xl font-semibold mb-2">
        Username: {data.name}
      </h2>
      <Link
        target="_blank"
        to={data.html_url}
        className="text-blue-600 hover:underline mb-2"
      >
        Github Link: <strong>{data.html_url}</strong>
      </Link>
      <p className="text-gray-700 mb-1">
        Github Followers: <strong>{data.followers}</strong>
      </p>
      <p className="text-gray-700 mb-1">
        Location: <strong>{data.location || "Not Available"}</strong>
      </p>
      <p className="text-gray-700 mb-1">
        Public Repos: <strong>{data.public_repos}</strong>
      </p>
      <pre className="text-gray-800 mt-5 text-left bg-gray-200 p-3 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/sanketparsewar");
  return response.json();
};
