const ENDPOINT = "http://localhost:3000";

const loadTable = () => {
    axios.get(`${ENDPOINT}/cities`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.cep + '</td>';
                    trHTML += '<td>' + element.State.name + '</td>';
                    trHTML += '<td class="action-column"><button title="Edit" type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')"><svg style="width: 20px; fill: white;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745 l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979 l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852 L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                    trHTML += '<button title="Delete" type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')"><svg style="width: 20px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg></button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const cityAdd = () => {
    const name = document.getElementById("name").value;
    const cep = document.getElementById("cep").value;
    const state_id = document.getElementById("state_id").value;

    axios.post(`${ENDPOINT}/cities`, {
        name: name,
        cep: cep,
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
    const cep = document.getElementById("cep").value;
    const state_id = document.getElementById("state_id").value;

    axios.put(`${ENDPOINT}/cities/` + id, {
        name: name,
        cep: cep,
        state_id: state_id,

    }).then((response) => {
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
    });
};

const showCityAddBox = async () => {
    const states = await getStates();
    let optionHTML = '<option disabled selected>State</option>'
    for (const state of states) {
        optionHTML += '<option value="' + state.id + '">' + state.name + '</option>'
    }
    Swal.fire({
        title: 'Add city',
        html:
            '<input id="id" type="hidden">' +
            '<input type="text" name="cep" id="cep" class="swal2-input" placeholder="Postal Code" maxlength="8" onFocus="clearCEP()" OnBlur="validateCEP();"/>' +
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
            optionHTML += '<option value="' + state.id + '">' + state.name + '</option>'
        }
    }
    Swal.fire({
        title: 'Edit City',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input type="text" name="cep" id="cep" class="swal2-input" placeholder="Postal Code" maxlength="8" onFocus="clearCEP()" OnBlur="validateCEP()" value="' + data.cep + '"/>' +
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

const validateCEP = async () => {
    let ao_cep = document.getElementById("cep").value;
    let cepValido = /^(([0-9]{5}-[0-9]{3}))$/;
    if (!cepValido.test(ao_cep)) {
        ao_cep = ao_cep.replace(/\D/g, ""); //Remove tudo o que não é dígito
        if (ao_cep.length === 8) {
            const cepsValidos = await axios.get(`https://viacep.com.br/ws/${ao_cep}/json/`);
            document.getElementById("name").value = cepsValidos.data.localidade;
            ao_cep = ao_cep.replace(/(\d{5})(\d)/, "$1-$2");
            document.getElementById("cep").value = ao_cep;
        }
    }
}

const clearCEP = () => {
    let ao_cep = document.getElementById("cep").value;
    let cepValido = /^(([0-9]{5}-[0-9]{3}))$/;
    if (cepValido.test(ao_cep)) {
        ao_cep = ao_cep.replace(/\D/g, "");
        document.getElementById("cep").value = ao_cep;
    } else {
        document.getElementById("cep").value = '';
    }
}