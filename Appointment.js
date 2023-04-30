let form = document.querySelector("form").addEventListener("submit", myfun);
async function myfun(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;

  let user = {
    name,
    email,
  };

  try {
    let res = await axios.post(
      "https://crudcrud.com/api/cf0d8469104b4563b17a9de154479a12/appointmentData",
      {
        user,
      }
    );
    alert("Users Added");

    console.log(res);
    addData(res);
  } catch (error) {
    console.log("error:", error);
    alert("Action Failed");
  }
  name = "";
  email = "";
}

window.addEventListener('DOMContentLoaded',() =>{
  axios
  .get('https://crudcrud.com/api/cf0d8469104b4563b17a9de154479a12/appointmentData/')
  .then(res =>{
    console.log(res);
    for(var i=0; i<res.data.length;i++){
      console.log(res.data[i])
      addData(res.data[i]);
    }
  })
  .catch(err => console.log(err));
})

function addData(data) {
  let div = document.createElement("div");
  let del = document.createElement("button");
  let edit = document.createElement("button");
  del.innerText = "Delete";
  edit.innerText = "Edit";
  div.className = "user";
  let h1 = document.createElement("h1");
  let p = document.createElement("p");
  h1.innerText = data.data.user.name;
  p.innerText = data.data.user.email;
  div.append(h1, p, del, edit);
  document.querySelector("body").append(div);
}