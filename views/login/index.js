const ENDPOINT = "http://177.44.248.52/livraria";

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

const kidding = () => {
    Swal.fire(`Sorry: Sit down and cry`)
}

const log = (action) => {
    action = `${action} LOGGED`

    axios.post(`${ENDPOINT}/log`, {
        action: action,
        date: new Date(),
    })
}