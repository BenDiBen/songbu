export const keyframes = {
  showBorder: {
    "0%": { background: "transparent" },
    "100%": { background: "#ffffff10" },
  },
  hideBorder: {
    "100%": { background: "transparent" },
    "0%": { background: "#ffffff10" },
  },
};

export const animations = {
  showBorder: { value: "showBorder 0.1s ease-in-out forwards" },
  hideBorder: { value: "hideBorder 0.1s ease-in-out forwards" },
};
