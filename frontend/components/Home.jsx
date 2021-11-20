import { Card } from "./Card";
import MusicItem from "./MusicItem";

export default function Home() {
  return (
    <div className="px-15 pt-10 w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* 2/3 column grid */}
      <div className="grid grid-cols-5 gap-x-5 mt-10">
        <div className="col-span-5 md:col-span-3">
          <Card>
            <h1 className="text-xl font-semibold mb-5">Popular Songs</h1>
            
            <MusicItem />
          </Card>
        </div>
        <div className="col-span-5 md:col-span-2">
          <Card>
            <h1 className="text-xl font-semibold">Popular Artists</h1>
          </Card>
        </div>
      </div>
    </div>
  );
}
