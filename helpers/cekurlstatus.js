"use server";
export async function checkURLStatus(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status === 200) {
      return "OK";
    } else if (response.status === 400) {
      return "BAD";
    } else {
      return "ERROR";
    }
  } catch (error) {
    console.log(error.message);
  }
}
