import lodash from "lodash";

export default function updateBars(state, { index, volume }) {
  const barsCopy = [...state.bars];
  const setActive = barsCopy.map((bar, i) => {
    if (index >= i) {
      bar.active = true;
    } else {
      bar.active = false;
    }

    return bar;
  });

  return {
    ...state,
    bars: setActive,
    currentVolume: volume,
  };
}

export function volumeUIUpdate(bars, volume) {
  const barsCopy = [...bars];
  const volumeIndex = lodash.findIndex(barsCopy, ["soundValue", volume]);
  const setActive = barsCopy.map((bar, i) => {
    if (volumeIndex >= i) {
      bar.active = true;
    } else {
      bar.active = false;
    }

    return bar;
  });

  return setActive;
}
