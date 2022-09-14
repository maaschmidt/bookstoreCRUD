const ENDPOINT = "http://177.44.248.52/bookstore";

const loadTable = (params) => {
    if (params) {
        tableData(params);
    } else {
        tableData('');
    }
};

const tableData = (params) => {
    axios.get(`${ENDPOINT}/users${params}`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td class="age-column">' + element.age + '</td>';
                    trHTML += '<td>' + element.sex + '</td>';
                    trHTML += '<td>' + element.email + '</td>';
                    trHTML += '<td class="action-column"><button title="Edit" type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + element.id + ')"><svg style="width: 20px; fill: white;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745 l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979 l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852 L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                    trHTML += '<button title="Delete" type="button" class="btn btn-outline-danger" onclick="userDelete(' + element.id + ')"><svg style="width: 20px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg></button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const userCreate = () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${ENDPOINT}/users`, {
        name: name,
        age: age,
        sex: sex,
        email: email,
        password: password,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create user: ${error.response.data.error} `)
                .then(() => {
                    showUserCreateBox();
                })
        });
}

const getUser = (id) => {
    return axios.get(`${ENDPOINT}/users/` + id);
}

const userEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.put(`${ENDPOINT}/users/` + id, {
        name: name,
        age: age,
        sex: sex,
        email: email,
        password: password,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update user: ${error.response.data.error} `)
                .then(() => {
                    showUserEditBox(id);
                })
        });
}

const userDelete = async (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const user = await getUser(id);
            const data = user.data;
            axios.delete(`${ENDPOINT}/users/` + id)
                .then((response) => {
                    Swal.fire(`User ${data.name} deleted`);
                    loadTable();
                }, (error) => {
                    Swal.fire(`Error to delete user: ${error.response.data.error} `);
                    loadTable();
                });
        };
    });
};


const showUserCreateBox = () => {
    Swal.fire({
        title: 'Create user',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="age" class="swal2-input" placeholder="Age">' +
            '<input id="sex" class="swal2-input" placeholder="Sex">' +
            '<input id="email" class="swal2-input" placeholder="Email">' +
            '<input type="password" id="password" class="swal2-input" placeholder="Password">' +
            '<input type="password" id="password-confirm" class="swal2-input" placeholder="Confirm Password">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            if (validatePassword()) {
                userCreate();
            } else {
                Swal.fire(`Error: the password isn't correspondent`)
                    .then(() => {
                        showUserCreateBox();
                    })
            }
        }
    });
}

const showUserEditBox = async (id) => {
    const user = await getUser(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit User',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="age" class="swal2-input" placeholder="Age" value="' + data.age + '">' +
            '<input id="sex" class="swal2-input" placeholder="Sex" value="' + data.sex + '">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="' + data.email + '">' +
            '<input type="password" id="password" class="swal2-input" placeholder="Password">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            userEdit();
        }
    });
}

const validatePassword = () => {
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
}

function filterFunction() {
    const search = document.getElementById("myInput").value
    loadTable(`?name=${search}&sort=name&order=ASC`);
}