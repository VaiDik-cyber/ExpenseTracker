let form = document.querySelector("form").addEventListener("submit", myfun);
async function myfun(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;

  let user = {
    name,
    email,
  };
    console.log(user)
  try {
    if (name === "" || email === "") {
      alert("Please fill all inputs");
    } else {
      let res = await axios.post(
        "https://crudcrud.com/api/42d30e59511d4c0a858fa9103bc79cdf/appointmentData/",
        {
          user,
        }
      );
      alert("Users Added");
      window.location.reload();
    }
  } catch (error) {
    console.log("error:", error);
    alert("Action Failed");
  }
  name = "";
  email = "";
}

async function getUser() {
  try {
    let res = await axios.get(
      "https://crudcrud.com/api/42d30e59511d4c0a858fa9103bc79cdf/appointmentData/"
    );
    console.log(res.data);
    displayData(res.data);
  } catch (error) {
    console.log("error:", error);
  }
}

getUser();

function displayData(data) {
  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "user";
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    h1.innerText = `Name :- ${el.user.name}`;
    p.innerText = `Email :- ${el.user.email}`;
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.onclick = () => {
      deleteUser(el._id);
    };
    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.onclick = () => {
      editUser(el._id, el.user.name, el.user.email);
    };
    div.append(h1, p, deleteBtn, edit);
    document.querySelector("body").append(div);
  });
}

async function deleteUser(obj) {
  console.log(obj);
  try {
    let res = await axios.delete(
      `https://crudcrud.com/api/42d30e59511d4c0a858fa9103bc79cdf/appointmentData/${obj}`
    );

    window.location.reload();
  } catch (error) {
    console.log("error:", error);
  }
}

async function editUser(obj, Username, Useremail) {
  console.log(obj, Username, Useremail);
  let name = (document.getElementById("name").value = Username);
  let email = (document.getElementById("email").value = Useremail);

  try {
    let res = await axios.delete(
      `https://crudcrud.com/api/42d30e59511d4c0a858fa9103bc79cdf/appointmentData/${obj}`
    );
  } catch (error) {
    console.log("error:", error);
  }
}