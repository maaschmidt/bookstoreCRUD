const ENDPOINT = "http://177.44.248.52/livraria";

const loadTable = () => {
    axios.get(`${ENDPOINT}/cities`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.State.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary action-column" onclick="showCityEditBox(' + element.id + ')">Edit</buttonlass=>';
                    trHTML += '<button type="button" class="btn btn-outline-danger action-column" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const cityAdd = () => {
    const name = document.getElementById("name").value;
    const state_id = document.getElementById("state_id").value;

    axios.post(`${ENDPOINT}/cities`, {
        name: name,
        state_id: state_id,
    })
        .then((response) => {            
            Swal.fire(`City ${response.data.name} add`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to add city: ${error.response.data.error} `)
                .then(() => {
                    showCityAddBox();
                })
        });
}

const getCity = (id) => {
    return axios.get(`${ENDPOINT}/cities/` + id);
}

const getStates = async () => {
    const states = await axios.get(`${ENDPOINT}/states`);
    return states.data;
}

const cityEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const state_id = document.getElementById("state_id").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        state_id: state_id,

    })
        .then((response) => {
            Swal.fire(`City ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update city: ${error.response.data.error} `)
                .then(() => {
                    showCityEditBox(id);
                })
        });
}

const cityDelete = async (id) => {
    const city = await getCity(id);
    const data = city.data;
    axios.delete(`${ENDPOINT}/cities/` + id)
        .then((response) => {
            Swal.fire(`City ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete city: ${error.response.data.error} `);
            loadTable();
        });
};

const showCityAddBox = async () => {
    const states = await getStates();
    let optionHTML = ''
    for (const state of states) {
        optionHTML += '<option value="' + state.id + '">' + state.name + '</option>'
    }
    Swal.fire({
        title: 'Add city',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<select id="state_id" class="swal2-input" name="states">' +
            optionHTML +
            '</select>',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityAdd();
        }
    });
}

const showCityEditBox = async (id) => {
    const city = await getCity(id);
    const states = await getStates();
    const data = city.data;
    let optionHTML = ''
    for (const state of states) {
        if (data.state_id === state.id) {
            optionHTML += '<option value="' + state.id + '" selected>' + state.name + '</option>'
        } else {
            optionHTML += '<option value="' + state.id + '">' + state.name + '</optionid=>'
        }
    }
    Swal.fire({
        title: 'Edit City',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<select id="state_id" class="swal2-input" name="states">' +
            optionHTML +
            '</select>',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            cityEdit();
        }
    });
}

const log = (action) => {
    action = `CITY ${action}`

    axios.post(`${ENDPOINT}/log`, {
        action: action,
        date: new Date(),
    })
}
