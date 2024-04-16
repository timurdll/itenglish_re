import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { PauseCircleOutline, PlayArrowOutlined } from "@mui/icons-material";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audio) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div>
      <audio
        src={src}
        ref={audioRef}
        onCanPlay={() => {
          if (!audio) {
            setAudio(audioRef.current);
          }
        }}
      />
      <Button onClick={handlePlayPause}>
        {playing ? <PauseCircleOutline /> : <PlayArrowOutlined />}
      </Button>
    </div>
  );
};

export default AudioPlayer;
