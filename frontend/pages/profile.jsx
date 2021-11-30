import SecondaryButton from "components/Buttons/Secondary";
import { Card } from "components/Card";
import MusicItem from "components/MusicItem";
import PrimaryButton from "../components/Buttons/Primary";

function profile() {
  const usersMusic = [
    {
      name: "Music Name 1",
      artists: ["Neelansh", "Vedant"],
      clapCount: 1000,
      image: "",
    },
    {
      name: "Music Name 2",
      artists: ["KSHMR"],
      clapCount: 2400,
      image: "",
    },
    {
      name: "Music Name 3",
      artists: ["Lil Nas X", "Drake"],
      clapCount: 579,
      image: "",
    },
  ];
  return (
    <div className="max-w-2xl md:max-w-7xl mx-5 md:mx-auto mt-10">
      {/* Header Card */}
      <div className="p-8 bg-dark-400 flex items-center justify-between rounded-lg">
        <div className="flex items-center space-x-5">
          <img
            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80"
            alt=""
            className="w-25 h-25 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold">Marshall Mathers</h1>
            <h3 className="text-gray-400">Eminem</h3>
          </div>
        </div>
        <div>
          <div className="space-x-2">
            <PrimaryButton>Follow</PrimaryButton>
            <SecondaryButton>Message</SecondaryButton>
          </div>
        </div>
      </div>
      {/* End of Header Card */}
      {/* User posts section */}
      <div className="mt-8">
        <Card>
          <h1 className="text-xl font-semibold mb-5">Your Music</h1>

          {usersMusic.map((music) => (
            <MusicItem music={music} isOwner={true} />
          ))}
        </Card>
      </div>
      {/* End of user posts section */}
    </div>
  );
}

export default profile;
