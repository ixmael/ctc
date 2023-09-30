"use client";

const deleteTask = async (id: string): Promise<Boolean> => {
  const request = new Request(`http://localhost:8000/api/v1/tasks/${id}`, {
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
