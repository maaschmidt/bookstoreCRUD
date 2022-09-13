const ENDPOINT = "http://localhost:3000";

const getUsers = () => {
    return axios.get(`${ENDPOINT}/users`);
}

const userValidate = async () => {
    const data = await getUsers();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${ENDPOINT}/`, {
        email: email,
        password: password,
        data: data.data,
    })
        .then((response) => {
            window.location.href = "../menu/index.html"
        }, () => {
            Swal.fire(` Login error: Email or password are incorrect`)
        });
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});

// prevent form submit
const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
});
