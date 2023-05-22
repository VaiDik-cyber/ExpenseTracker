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
      "https://crudcrud.com/api/7cbbcfb648dd407b9e3b325275e6b35b/Data",
      {
        user,
      }
    
    );
    alert("Users Added");
    // window.location.reload();
    getUser();
  } catch (error) {
    console.log("error:", error);
    alert("Action Failed");
  }
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  
}

async function getUser() {
  try {
    let res = await axios.get(
      "https://crudcrud.com/api/7cbbcfb648dd407b9e3b325275e6b35b/Data"
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
    div.innerHTML = "";
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
      `https://crudcrud.com/api/7cbbcfb648dd407b9e3b325275e6b35b/Data/${obj}`
    );

    getUser();
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
      `https://crudcrud.com/api/7cbbcfb648dd407b9e3b325275e6b35b/Data/${obj}`
    );
  } catch (error) {
    console.log("error:", error);
  }
}
