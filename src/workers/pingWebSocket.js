export const pingWebSocket = () => {
  /**
   * AWS API gateway has "Idle Connection Timeout" of 10 minutes
   * so ping every 7 minutes to keep websocket connection alive
   */
  setInterval(() => {
    postMessage({ ping: true });
  }, 420 * 1000); // 7 mins
};
