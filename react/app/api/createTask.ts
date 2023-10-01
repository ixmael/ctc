"use client";

const createTask = async (task: any): Promise<boolean> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/tasks`);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = new Request(url, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  });

  return fetch(request).then((response) => {
    if (response.ok) {
      return true;
    }

    if (response.status === 400) {
      throw new Error("there is an error in your data");
    } else if (response.status >= 500) {
      throw new Error("there is an error in the server");
    }

    throw new Error("unknown error");
  });
};

export default createTask;
