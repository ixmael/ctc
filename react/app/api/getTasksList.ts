"use client";

type FiltersTasks = {
  state?: string;
  created_by?: string;
};

const getTasksList = async (filters: FiltersTasks): Promise<Array<any>> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/tasks`);
  if (filters.state) {
    url.searchParams.append('state', filters.state);
  }
  if (filters.created_by) {
    url.searchParams.append('created_by', filters.created_by);
  }

  const request = new Request(url)
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
