async function fetchData() {
  let response = await fetch(
    "https://api.jsonbin.io/v3/b/6016bcc70ba5ca5799d19fc2/latest"
  );
  let jsonResponse = await response.json();
  let recordResponse = jsonResponse["record"];
  tasks = recordResponse;
  console.log(tasks);
}

async function putData() {
  await fetch("https://api.jsonbin.io/v3/b/6016bcc70ba5ca5799d19fc2", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "my-todo": [] }),
  });
}

putData();
