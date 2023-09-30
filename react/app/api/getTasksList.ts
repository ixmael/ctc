"use client";

type FiltersTasks = {
  state?: string;
  created_by?: string;
};

const getTasksList = async (filters: FiltersTasks): Promise<Array<any>> => {
  const request = new Request("http://localhost:8000/api/v1/tasks");

  return fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      return data.payload as Array<any>;
    })
    .catch((err) => {
      return [];
    });
};

export default getTasksList;
