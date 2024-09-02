export const sleep = async (ms, msg) => {
  if (msg) {
    console.debug(msg !== true ? msg : `Timout ${ms / 1000} sec...`);
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
};

