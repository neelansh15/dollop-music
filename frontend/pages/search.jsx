import axios from "axios";
import ArtistItem from "components/ArtistItem";
import { Card } from "components/Card";
import MusicItem from "components/MusicItem";
import { useState } from "react";
import Head from "next/head";

export default function Search() {
  let [searchedMusic, setSearchedMusic] = useState([]);
  let [searchedUser, setSearchedUser] = useState([]);
  let [searchString, setSearchString] = useState("");

  const getResults = async e => {
    e.preventDefault();
    setSearchedMusic([]);
    setSearchedUser([]);
    let searchResults = await axios({
      url: "http://localhost:8000/api/search",
      params: { name: searchString },
    });

    // console.log(status);
    // console.log(searchResults);

    // temp variables to store search results before changing state variables
    let tempMusic = [];
    let tempUsers = [];

    searchResults.data.forEach(element => {
      if (element.type == "user") {
        tempUsers.push(element);
      } else if (element.type == "music") {
        tempMusic.push(element);
      }
    });

    setSearchedMusic(tempMusic);
    setSearchedUser(tempUsers);

    // console.log(tempMusic);
    // console.log(tempUsers);
  };

  const handleSearchChange = event => {
    setSearchString(event.target.value);
  };

  return (
    <div className='px-15 pt-10 w-full'>
      <Head>
        {searchString.length > 0 ? (
          <title>{searchString} - Dollop Music</title>
        ) : (
          <title>Search - Dollop Music</title>
        )}
      </Head>
      {/* Header */}
      <h1 className='pb-3 text-3xl font-bold'>Search</h1>

      {/* Search Bar */}
      <form onSubmit={getResults}>
        <div className='bg-dark-300  mb-3 w-full rounded-lg flex justify-between '>
          <input
            value={searchString}
            onChange={handleSearchChange}
            className='bg-dark-300 w-full rounded-lg  p-3 focus:(outline-solid-dark-100 bg-dark-400 transition)'
          ></input>

          <button
            className='px-5 bg-dark-300 max-w-xs text-white font-semibold text-md rounded-lg flex justify-center items-center p-1 focus:outline-solid-dark-100'
            onClick={getResults}
            type='submit'
          >
            <i
              className='fa fa-search mb-0.5 ml-3 mr-3 '
              aria-hidden='true'
            ></i>
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {searchedUser.length == 0 ? null : (
        <Card>
          <h1 className='text-xl font-semibold mb-5'>User Results</h1>

          {searchedUser.map(user => (
            <ArtistItem artist={user} key={user._id} />
          ))}
        </Card>
      )}

      <div className='my-5'>
        <p />
      </div>

      {searchedMusic.length == 0 ? null : (
        <Card>
          <h1 className='text-xl font-semibold mb-5'>Song Results</h1>

          {searchedMusic.map(music => (
            <MusicItem music={music} key={music.name} />
          ))}
        </Card>
      )}
    </div>
  );
}
