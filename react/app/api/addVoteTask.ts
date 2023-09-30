"use client";

const addVoteTask = async (id: string): Promise<Boolean> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/tasks/${id}/vote`);

  const request = new Request(url, {
    method: 'POST',
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

export default addVoteTask;
