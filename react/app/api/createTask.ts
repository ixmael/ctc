"use client";

const createTask = async (task: any): Promise<Boolean> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')

  const request = new Request(`http://localhost:8000/api/v1/tasks`, {
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
