async function get() {
  try {
    const response = await fetch("http://localhost:8080/", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    if (response.status === 200) {
      const data = await response.text();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

get();
