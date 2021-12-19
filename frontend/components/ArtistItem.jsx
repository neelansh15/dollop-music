import Link from "next/link";

export default function ArtistItem({ artist }) {
  return (
    <Link href={"/profile/" + artist.username}>
      <div className="flex justify-between items-center mt-1 rounded-lg p-2 hover:(bg-dark-100 cursor-pointer)">
        <div className="flex space-x-3 items-center">
          <img
            src={artist.image}
            alt=""
            className="rounded-lg w-15 h-15 object-cover"
          />
          <div>
            <h1 className="font-bold">{artist.name}</h1>
            <p className="text-sm text-gray-300">{artist.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
