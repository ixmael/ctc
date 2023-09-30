"use client";

const addVoteTask = async (id: string): Promise<Boolean> => {
  const request = new Request(`http://localhost:8000/api/v1/tasks/${id}/vote`, {
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
