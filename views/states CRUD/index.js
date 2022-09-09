const ENDPOINT = "http://177.44.248.52/livraria";

const loadTable = () => {
    axios.get(`${ENDPOINT}/states`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.province + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showStateEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="stateDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const stateAdd = () => {
    const name = document.getElementById("name").value;
    const province = document.getElementById("province").value.toUpperCase();

    axios.post(`${ENDPOINT}/states`, {
        name: name,
        province: province,
    })
        .then((response) => {
            Swal.fire(`State ${response.data.name} add`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create state: ${error.response.data.error} `)
                .then(() => {
                    showStateAddBox();
                })
        });
}

const getState = (id) => {
    return axios.get(`${ENDPOINT}/states/` + id);
}

const stateEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const province = document.getElementById("province").value.toUpperCase();

    axios.put(`${ENDPOINT}/states/` + id, {
        name: name,
        province: province,
    })
        .then((response) => {
            Swal.fire(`State ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update state: ${error.response.data.error} `)
                .then(() => {
                    showStateEditBox(id);
                })
        });
}

const stateDelete = async (id) => {
    const state = await getState(id);
    const data = state.data;
    axios.delete(`${ENDPOINT}/states/` + id)
        .then((response) => {
            Swal.fire(`State ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete state: ${error.response.data.error} `);
            loadTable();
        });
};

const showStateAddBox = () => {
    Swal.fire({
        title: 'Add state',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="province" class="swal2-input" maxlength="2" placeholder="UF">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            stateAdd();
        }
    });
}

const showStateEditBox = async (id) => {
    const state = await getState(id);
    const data = state.data;
    Swal.fire({
        title: 'Edit State',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="province" class="swal2-input" maxlength="2" placeholder="UF" value="' + data.province + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            stateEdit();
        }
    });
}