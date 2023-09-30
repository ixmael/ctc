"use client";

const deleteTask = async (id: string): Promise<Boolean> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/tasks/${id}`);
  const request = new Request(url, {
    method: 'DELETE',
  });

  return fetch(request)
    .then((response) => {
      if (response.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
};

export default deleteTask;
