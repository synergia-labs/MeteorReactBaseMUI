import { ISxStyleObject } from "/imports/types/ISxStyleObject";
import { keyframes } from "@mui/system";

const primary = "#2196F3";
const secondary = "#0069A6";
const destaque = "#02c3c3";
const pillHeight = "10px";

const movePillOne = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(48px);
    }
    75% {
        transform: translateX(48px);
    }
    100% {
        transform: translateX(0);
    }`;

const movePillTwo = keyframes`
    0% {
        transform: translateX(0);
    }
    16% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(48px);
    }
    66% {
        transform: translateX(48px);
    }
    100% {
        transform: translateX(0);
    }`;

const movePillThree = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(48px);
    }
    100% {
        transform: translateX(0);
    }`;

export const carregandoStyle: ISxStyleObject = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    minHeight: "100%",
    margin: "2rem",
  },

  loadingWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "96px",
    height: "min-content",
  },

  loadingArea: {
    position: "relative",
    width: "96px",
    height: pillHeight,
    gap: "1rem",
  },

  pillOne: {
    position: "absolute",
    left: 0,
    width: "48px",
    height: pillHeight,
    borderRadius: "8px",
    backgroundColor: primary,
    zIndex: 100,
    animation: `${movePillOne} 2s forwards infinite`,
  },

  pillTwo: {
    position: "absolute",
    left: 0,
    width: "48px",
    height: pillHeight,
    borderRadius: "8px",
    backgroundColor: destaque,
    zIndex: 90,
    animation: `${movePillTwo} 2s forwards infinite`,
  },

  pillThree: {
    position: "absolute",
    left: 0,
    width: "48px",
    height: pillHeight,
    borderRadius: "8px",
    backgroundColor: secondary,
    zIndex: 80,
    animation: `${movePillThree} 2s forwards infinite`,
  },
};
