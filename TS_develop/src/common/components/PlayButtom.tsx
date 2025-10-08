// PlayButton.tsx
import { styled } from "@mui/material/styles";

type PlayButtonProps = {
  isPlaying?: boolean;
  onClick?: () => void;
  size?: number;                 // 지름(px)
  ariaLabel?: string;            // 스크린리더 라벨
};

const Btn = styled("button")<{ $size: number }>(({ $size }) => ({
  width: $size,
  height: $size,
  border: "none",
  borderRadius: "50%",
  backgroundColor: "rgba(30, 215, 96, 0.8)",         
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(0,0,0,.2)",
  transition: "transform .15s ease, box-shadow .15s ease, background-color .15s ease",
  "&:hover": { transform: "scale(1.06)" },
  "&:active": { transform: "scale(0.98)" },
  "&:focus-visible": { outline: "3px solid rgba(30,215,96,.5)", outlineOffset: 2 },
}));

const Icon = styled("svg")({
  width: 24,
  height: 24,
  fill: "black",
});

const PlayButton = ({
  isPlaying = false,
  onClick,
  size = 48,
  ariaLabel,
}: PlayButtonProps) => {
  return (
    <Btn
      type="button"
      onClick={onClick}
      aria-pressed={isPlaying}
      aria-label={ariaLabel ?? (isPlaying ? "Pause" : "Play")}
      $size={size}
    >
      {isPlaying ? (

        <Icon viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        </Icon>
      ) : (

        <Icon viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </Icon>
      )}
    </Btn>
  );
};

export default PlayButton;
