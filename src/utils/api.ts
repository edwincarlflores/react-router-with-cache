const fetchAPI = async (url = "", config?: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...(config || {}),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default fetchAPI;
