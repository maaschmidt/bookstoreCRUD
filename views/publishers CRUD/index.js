const ENDPOINT = "http://localhost:3000";

const loadTable = () => {
    ('here')
    axios.get(`${ENDPOINT}/publishers`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.City.name + '</td>';
                    trHTML += '<td class="action-column"><button title="Edit" type="button" class="btn btn-outline-secondary" onclick="showPublisherEditBox(' + element.id + ')"><svg style="width: 20px; fill: white;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745 l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979 l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852 L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                    trHTML += '<button title="Delete" type="button" class="btn btn-outline-danger" onclick="publisherDelete(' + element.id + ')"><svg style="width: 20px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg></button></td>';
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