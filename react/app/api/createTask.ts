"use client";

const createTask = async (task: any): Promise<Boolean> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/tasks`);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json')

  const request = new Request(url, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  });

  return fetch(request)
    .then((response) => {
      if (response.ok) {
        console.log(response.json());
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
};

export default createTask;
