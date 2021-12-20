import axios from "axios";
import ArtistItem from "components/ArtistItem";
import { Card } from "components/Card";
import MusicItem from "components/MusicItem";
import { useEffect, useState } from "react";

export default function Search(){
    let [searchedMusic, setSearchedMusic] = useState([])
    let [searchedUser, setSearchedUser] = useState([])
    let [searchString, setSearchString] = useState("")

    const getResults = async () => {
        let searchResults = await axios({
            url: "http://localhost:8000/api/search", 
            params: { name: searchString }
        });

        // console.log(status);
        // console.log(searchResults);

        // temp variables to store search results before changing state variables
        let tempMusic = []
        let tempUsers = []
        
        searchResults.data.forEach(element => {
            if (element.type == "user") {
                tempUsers.push(element)
            } else if (element.type == "music") {
                tempMusic.push(element)
            }
        });

        setSearchedMusic(tempMusic);
        setSearchedUser(tempUsers);

        // console.log(tempMusic);
        // console.log(tempUsers);
    }

    const handleSearchChange = (event) => {
        setSearchString(event.target.value)
    }

    return (
        <div className="px-15 pt-10 w-full">
            {/* Header */}
            <h1 className="pb-3 text-3xl font-bold">Search</h1>

            {/* Search Bar */}
            <div className="bg-dark-300 p-2 mb-3 w-full rounded-lg flex justify-between">
                <i className="fa fa-search ml-3" aria-hidden="true"></i>

                <input value={searchString} onChange={handleSearchChange} className="bg-dark-300 w-17/20 rounded-lg"></input>
                
                <button className="px-5 bg-dark-300 text-white font-semibold text-md rounded-lg" onClick={getResults}>
                  Search
                </button>
            </div>

            {/* Results */}
            {searchedUser.length == 0 ? null : <Card>
                <h1 className="text-xl font-semibold mb-5">User Results</h1>

                {searchedUser.map((user) => (
                <ArtistItem artist={user} key={user.name} />
                ))}
            </Card>}

            <div className="my-5">
                <p/>
            </div>

            { searchedMusic.length == 0 ? null : <Card>
                <h1 className="text-xl font-semibold mb-5">Song Results</h1>

                {searchedMusic.map((music) => (
                <MusicItem music={music} key={music.name} />
                ))}
            </Card>}
        </div>
    )
}