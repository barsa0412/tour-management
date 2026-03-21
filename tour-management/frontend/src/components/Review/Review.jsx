const submitHandler = async (e) => {
  e.preventDefault();

  if (!user) {
    return alert("Please login first");
  }

  try {
    const res = await fetch(`${BASE_URL}/review/${tourId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: user.username,
        reviewText,
        rating,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      return alert(result.message);
    }

    alert("Review submitted");
    window.location.reload();
  } catch (err) {
    alert(err.message);
  }
};