// The fetchData function in the provided code snippet gives several indications that it expects to receive an object as an argument and will return an object as a result. Here's how we can deduce this:

// Function Signature and Destructuring:

// javascript
// Copy code
// const fetchData = async ({ query = "", page = 0, tag = "" }) => { ... }
// In the function signature, fetchData uses destructuring with default values directly in its parameter list. This syntax { query = "", page = 0, tag = "" } indicates that the function expects an object with properties query, page, and tag. The default values ("" for query and tag, 0 for page) suggest that if these properties are not provided in the object, they will default to these values. This is a clear indication that you need to pass an object to fetchData.

// Return Structure:

// javascript
// Copy code
// .then((json) => ({
//     results: json.hits || [],
//     pages: json.nbPages || 0,
//     resultsPerPage: json.hitsPerPage || 20
// }));
// After fetching data and converting the response to JSON, fetchData constructs and returns an object with the properties `

import * as React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useState, useEffect } from "react";

const fetchData = async ({ query = "", page = 0, tag = "" }) => {
  return fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}&tags=${encodeURIComponent(
      tag
    )}&page=${page}`
  )
    .then((response) => response.json())
    .then((json) => ({
      results: json.hits || [],
      pages: json.nbPages || 0,
      resultsPerPage: json.hitsPerPage || 20,
    }));
};

export default function HackerNewsSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [tag, setTag] = React.useState("story");
  const [page, setPage] = React.useState(0);
  const [resultsPerPage, setResultsPerPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(50);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    let ignore = false;
    //the user may change the query before the data from our previous request completes. We want to ignore the response from a stale request. WE don't want to set the result of a stale request in our state.

    const handleData = async () => {
      setLoading(true);
      setResults([]);
      //we do this to get a clean start before we fet new data

      const { results, pages, resultsPerPage } = await fetchData({
        query,
        page,
        tag,
      });

      if (ignore === true) return;
      //ignore don't update state if it's a response from a stale query.

      setResults(results);
      setTotalPages(pages);
      setResultsPerPage(resultsPerPage);
      setLoading(false);
    };

    console.log(ignore);

    handleData();

    return () => {
      ignore = true;
    };
  }, [query, page, tag]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
    setPage(0);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <main>
      <h1>Hacker News Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="query">Search</label>
          <input
            type="text"
            id="query"
            name="query"
            value={query}
            onChange={handleSearch}
            placeholder="Search Hacker News..."
          />
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" onChange={handleTag} value={tag}>
            <option value="story">Story</option>
            <option value="ask_hn">Ask HN</option>
            <option value="show_hn">Show HN</option>
            <option value="poll">Poll</option>
          </select>
        </div>
      </form>
      <section>
        <header>
          <h2>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={loading}
            />
          </h2>
          <div>
            <button
              className="link"
              onClick={handlePrevPage}
              disabled={page <= 0}
            >
              Previous
            </button>
            <button
              className="link"
              onClick={handleNextPage}
              disabled={page + 1 >= totalPages}
            >
              {/* //+ 1 because is a zero index array */}
              Next
            </button>
          </div>
        </header>
        <ul>
          {results.map(({ url, objectID, title }, index) => {
            const href =
              { url } || `https://news.ycombinator.com/item?id=${objectID}`;
            const position = resultsPerPage * page + index + 1;
            //   results in 20 (which is default) * 0  = 0 and then 0 + 1 = 1

            return (
              <li key={objectID}>
                <span>{position}.</span>
                <a href={href} target="_blank" rel="noreferrer">
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
