export default function updateSpeed(speedList, speedVal) {
  const copySpeedList = [...speedList];
  const updateSpeed = copySpeedList.map((speed) => {
    speed.active = speed.speedValue === speedVal;
    return speed;
  });

  return updateSpeed;
}
