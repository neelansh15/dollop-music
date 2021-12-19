import { useEffect, useState } from "react";
import { useStore } from "store";

export default function MusicPlayer() {
  const music = useStore((state) => state.music);

  if (!music) {
    return <></>;
  }

  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("");
  const [progress, setProgress] = useState("00:00:00");
  const [percentage, setPercentage] = useState(0);

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
  }

  useEffect(() => {
    // Reset
    if (audio) audio.pause();
    setPlaying(false);
    setDuration("");
    setProgress("00:00:00");
    setPercentage(0);

    const audioPlayer = new Audio(music.url);
    audioPlayer.addEventListener("ended", () => setPlaying(false));
    audioPlayer.addEventListener("durationchange", () => {
      setDuration(convertHMS(audioPlayer.duration));
    });
    audioPlayer.addEventListener("timeupdate", () => {
      const currentTime = audioPlayer.currentTime;
      setPercentage((currentTime * 100) / audioPlayer.duration);
      setProgress(convertHMS(currentTime));
    });
    setAudio(audioPlayer);
  }, [music]);

  function play() {
    audio.play();
    setPlaying(true);
  }

  function pause() {
    audio.pause();
    setPlaying(false);
  }

  function seek(e) {
    // e = Mouse click event.
    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left; //x position within the element.
    const width = rect.width;
    const percentage = left / width;

    const seekTime = audio.duration * percentage;
    pause();
    audio.currentTime = seekTime;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-teal-500 text-black p-5 flex justify-between items-center">
      <div>
        <div className="flex space-x-3 items-center">
          {/* src="data:image/jpeg;base64,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" */}
          <img
            src={music.imageUrl}
            alt=""
            className="rounded-lg w-15 h-15 object-cover"
          />
          <div className="-space-y-1">
            <h1 className="text-sm md:text-base font-bold">{music.title}</h1>
            <p className="text-xs text-gray-800">{music.artists}</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 md:w-3/4 px-5 md:px-10">
        {/* Line */}
        <div className="relative h-2 w-full bg-teal-600 mt-2" onClick={seek}>
          <div
            className="absolute left-0 top-0 bg-black h-2 pointer-events-none"
            style={{
              width: percentage + "%",
            }}
          ></div>
        </div>
        <div className="text-xs md:text-sm float-left mt-0.5">{progress}</div>
        <div className="text-xs md:text-sm float-right mt-0.5">{duration}</div>
      </div>
      <div
        className="cursor-pointer"
        style={{
          fontSize: "1.3rem",
        }}
      >
        {!playing ? (
          <i className="fa fa-play-circle fa-lg" onClick={play}></i>
        ) : (
          <i className="fa fa-pause-circle fa-lg" onClick={pause}></i>
        )}
      </div>
    </div>
  );
}
