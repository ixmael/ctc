"use client";

const deleteTask = async (id: string): Promise<boolean> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URI}/tasks/${id}`);
  const request = new Request(url, {
    method: "DELETE",
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

export default deleteTask;
