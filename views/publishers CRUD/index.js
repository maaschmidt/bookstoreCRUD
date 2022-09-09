const ENDPOINT = "http://177.44.248.52/livraria";

const loadTable = () => {
    ('here')
    axios.get(`${ENDPOINT}/publishers`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.City.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showPublisherEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="publisherDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const publisherCreate = () => {
    const name = document.getElementById("name").value;
    const city_id = document.getElementById("city_id").value;

    axios.post(`${ENDPOINT}/publishers`, {
        name: name,
        cities_id: city_id,
    })
        .then((response) => {
            Swal.fire(`Publisher ${response.data.name} add`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to add publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherAddBox();
                })
        });
}

const getPublisher = (id) => {
    return axios.get(`${ENDPOINT}/publishers/` + id);
}

const getCities = async () => {
    const cities = await axios.get(`${ENDPOINT}/cities`);
    return cities.data;
}

const publisherEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const city_id = document.getElementById("city_id").value;

    axios.put(`${ENDPOINT}/publishers/` + id, {
        name: name,
        cities_id: city_id,
    })
        .then((response) => {
            Swal.fire(`Publisher ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherEditBox(id);
                })
        });
}

const publisherDelete = async (id) => {
    const publisher = await getPublisher(id);
    const data = publisher.data;
    axios.delete(`${ENDPOINT}/publishers/` + id)
        .then((response) => {
            Swal.fire(`Publisher ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete publisher: ${error.response.data.error} `);
            loadTable();
        });
};

const showPublisherAddBox = async () => {
    const cities = await getCities();
    let optionHTML = ''
    for (const city of cities) {
        optionHTML += '<option value="' + city.id + '">' + city.name + '</option>'
    }

    Swal.fire({
        title: 'Add publisher',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input input-size" placeholder="Name">' +
            '<select id="city_id" class="swal2-input input-size" name="cities">' +
            optionHTML +
            '</select>',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherCreate();
        }
    });
}

const showPublisherEditBox = async (id) => {
    const publisher = await getPublisher(id);
    const data = publisher.data;
    const cities = await getCities();
    let optionHTML = ''
    for (const city of cities) {
        if (data.cities_id === city.id) {
            optionHTML += '<option value="' + city.id + '" selected>' + city.name + '</option>'
        } else {
            optionHTML += '<option value="' + city.id + '">' + city.name + '</option>'
        }
    }
    Swal.fire({
        title: 'Edit Publisher',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input input-size" placeholder="Name" value="' + data.name + '">' +
            '<select id="city_id" class="swal2-input input-size" name="cities">' +
            optionHTML +
            '</select>',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherEdit();
        }
    });
}

const log = (action) => {
    action = `PUBLISHER ${action}`

    axios.post(`${ENDPOINT}/log`, {
        action: action,
        date: new Date(),
    })
}