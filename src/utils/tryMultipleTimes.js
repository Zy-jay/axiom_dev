import { sleep } from "./sleep";

export async function tryMultipleTimes(request, times = 3, delay = 1000) {
  const errors = [];

  for (let i = 0; i <= times; i++) {
    try {
      const res = await request();

      return res;
    } catch (error) {
      console.error(error);
      errors.push(error);
    }
    await sleep(!(i % 2) ? delay * 1.5 : delay);
  }
  throw new Error(errors.join("\n | ~~~ | \n"));
}

