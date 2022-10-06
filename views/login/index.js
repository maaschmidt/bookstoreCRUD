const ENDPOINT = "http://localhost:3000";

const getUsers = () => {
    return axios.get(`${ENDPOINT}/users`);
}

const auth = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let authorization = `${email}:${password}`;
    let base64 = btoa(authorization);

    let headers = new Headers({
        authorization: `Basic ${base64}`
    });

    const options = {
        headers: headers,
        method: 'GET',
        cache: 'no-store'
    }
    let url = `${ENDPOINT}/auth`
    const response = await fetch(url, options);
    const user = await response.json();

    if (user != null && user.id) {
        localStorage.setItem('logado', JSON.stringify(user));
        window.location.href='../menu';
    } else {
        alert('Falha ao realizar login')
    }
}

const verify = async () => {

    let logado = JSON.parse(localStorage.getItem('logado'))

    if (logado == null) {
        return;
    }

    let authorization = `${logado.email}:${logado.password}`;
    let base64 = btoa(authorization);

    let headers = new Headers({
        authorization: `Basic ${base64}`
    });

    const options = {
        headers: headers,
        method: 'GET',
        cache: 'no-store'
    }

    let url = `${ENDPOINT}/verify`
    const response = await fetch(url, options);
    const user = await response.json();

    if (!user) {
        window.location.href = '../login'
    }
}
verify();

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
            window.location.href = "../menu"
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
// const form = document.querySelector("form");
// form.addEventListener('submit', function (e) {
//     e.preventDefault();
// });
