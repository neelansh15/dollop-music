import { Card } from "components/Card";
import MusicItem from "components/MusicItem";

export default function Search(){
    const searchedMusic = [
        {
          name: "Music Name 1",
          artists: ["Billie Eilish"],
          claps: 12000,
          image: "",
        },
        {
          name: "Music Name 2",
          artists: ["Jeremy Zucker"],
          claps: 3400,
          image: "",
        },
        {
          name: "Music Name 3",
          artists: ["Miley Cyrus", "Eminem"],
          claps: 5720,
          image: "",
        },
    ];

    const searchedUser = [
        {
          name: "User Name 1",
        //   artists: ["Billie Eilish"],
          claps: 12000,
          image: "",
        },
        {
          name: "User Name 2",
        //   artists: ["Jeremy Zucker"],
          claps: 3400,
          image: "",
        },
        {
          name: "User Name 3",
        //   artists: ["Miley Cyrus", "Eminem"],
          claps: 5720,
          image: "",
        },
    ];

    return (
        <div className="px-15 pt-10 w-full">
            {/* Header */}
            <h1 className="pb-3 text-3xl font-bold">Search</h1>

            {/* Search Bar */}
            <div className="bg-dark-300 p-2 mb-3 w-full rounded-lg">
                <i className="fa fa-search ml-3" aria-hidden="true"></i>
                <input className="bg-dark-300 ml-5 w-19/20 rounded-lg"></input>
            </div>

            {/* Results */}
            <Card>
                <h1 className="text-xl font-semibold mb-5">User Results</h1>
                {searchedUser.map((music) => (
                <MusicItem music={music} key={music.name} />
                ))}
            </Card>

            <div className="my-5">
                <p/>
            </div>

            <Card>
                <h1 className="text-xl font-semibold mb-5">Song Results</h1>
                {searchedMusic.map((music) => (
                <MusicItem music={music} key={music.name} />
                ))}
            </Card>

            {/* Space so that last stuff is seen */}
            <div className="pb-25" >
                <p/>
            </div>
        </div>
    )
}