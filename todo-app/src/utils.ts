export const fetchData = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  requestBody?: Record<string, any>
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (requestBody) {
    options.body = JSON.stringify(requestBody);
  }

  const response = await fetch("http://localhost:3001" + url, options);

  if (response.ok) {
    const jsonData = await response.json();
    return jsonData;
  } else {
    throw new Error("Error fetching data");
  }
};
