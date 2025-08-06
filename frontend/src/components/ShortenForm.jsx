import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const createShortUrl = async (url) => {
  const response = await fetch("http://localhost:3000/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

const ShortenForm = () => {
  const [url, setUrl] = useState("");

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createShortUrl,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(url);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Make every connection count
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Create short links, QR Codes, share them anywhere. Track what’s working, and what’s not.
          All inside the <span className="text-purple-600 font-semibold">Cutly Connections Platform.</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full border">
        <form onSubmit={handleSubmit}>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Paste a long URL
          </label>
          <input
            type="url"
            id="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            placeholder="Example: https://super-long-link.com/shorten-it"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mb-4">
            By clicking Shorten URL, you agree to Cutly’s{" "}
            <a href="#" className="text-purple-600 underline">Terms of Use</a>,{" "}
            <a href="#" className="text-purple-600 underline">Privacy Policy</a> and{" "}
            <a href="#" className="text-purple-600 underline">Cookie Policy</a>.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200"
          >
            {isPending ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {isError && (
          <div className="mt-4 text-red-600 text-sm text-center">{error.message}</div>
        )}

        {data?.short_url && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg text-center">
            <p className="mb-1 font-medium">Here is your short URL:</p>
            <a
              href={data.short_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 underline break-all"
            >
              {data.short_url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenForm;
