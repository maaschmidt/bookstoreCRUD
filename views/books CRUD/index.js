const ENDPOINT = "http://localhost:3000";

const loadTable = (params) => {
    if (params) {
        tableData(params);
    } else {
        tableData('');
    }
};

const tableData = async (params) =>{
    `${ENDPOINT}/books${params}`
    axios.get(`${ENDPOINT}/books${params}`)
    .then((response) => {
        if (response.status === 200) {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.title + '</td>';
                trHTML += '<td>' + element.Category.description + '</td>';
                trHTML += '<td>$ ' + element.price + '</td>';
                trHTML += '<td class="action-column"><button title="Details" type="button" class="btn btn-outline-primary" onclick="showBookDetailBox(' + element.id + ')"><svg style="width: 20px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"/></svg></button>';
                trHTML += '<button title="Edit" type="button" class="btn btn-outline-secondary" onclick="showBookEditBox(' + element.id + ')"><svg style="width: 20px; fill: white;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M403.914,0L54.044,349.871L0,512l162.128-54.044L512,108.086L403.914,0z M295.829,151.319l21.617,21.617L110.638,379.745 l-21.617-21.617L295.829,151.319z M71.532,455.932l-15.463-15.463l18.015-54.043l51.491,51.491L71.532,455.932z M153.871,422.979 l-21.617-21.617l206.809-206.809l21.617,21.617L153.871,422.979z M382.297,194.555l-64.852-64.852l21.617-21.617l64.852,64.852 L382.297,194.555z M360.679,86.468l43.234-43.235l64.853,64.853l-43.235,43.234L360.679,86.468z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                trHTML += '<button title="Delete" type="button" class="btn btn-outline-danger" onclick="bookDelete(' + element.id + ')"><svg style="width: 20px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg></button></td>';
                trHTML += '</tr>';
            });
            document.getElementById("mytable").innerHTML = trHTML;
        }
    })
}

loadTable();

const addBook = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;
    const format = document.getElementById("format").value;

    axios.post(`${ENDPOINT}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        price: price,
        categories_id: category,
        publishers_id: publisher,
        formats_id: format,
    })
        .then((response) => {
            Swal.fire(`Book ${response.data.title} add`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to book add: ${error.response.data.error} `)
                .then(() => {
                    showBookAddBox();
                })
        });
}

const getBook = (id) => {
    return axios.get(`${ENDPOINT}/books/` + id);
}

const getCategories = async () => {
    const categories = await axios.get(`${ENDPOINT}/categories`);
    return categories.data;
}

const getPublishers = async () => {
    const publishers = await axios.get(`${ENDPOINT}/publishers`);
    return publishers.data;
}

const getFormats = async () => {
    const formats = await axios.get(`${ENDPOINT}/formats`);
    return formats.data;
}

const bookEdit = () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;
    const format = document.getElementById("format").value;

    axios.put(`${ENDPOINT}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        price: price,
        categories_id: category,
        publishers_id: publisher,
        formats_id: format,
    })
        .then((response) => {
            Swal.fire(`Book ${response.data.title} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update book: ${error.response.data.error} `)
                .then(() => {
                    showUserEditBox(id);
                })
        });
}

const bookDelete = async (id) => {
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
            const book = await getBook(id);
            const data = book.data;
            axios.delete(`${ENDPOINT}/books/` + id)
                .then((response) => {
                    Swal.fire(`Book ${data.title} deleted`);
                    loadTable();
                }, (error) => {
                    Swal.fire(`Error to delete book: ${error.response.data.error} `);
                    loadTable();
                });
        }
    })
};

const showBookAddBox = async () => {
    const categories = await getCategories();
    const publishers = await getPublishers();
    const formats = await getFormats();
    let categoryHTML = '<option disabled selected>Category</option>';
    let publisherHTML = '<option disabled selected>Publisher</option>';
    let formatHTML = '<option disabled selected>Format</option>';
    for (const category of categories) {
        categoryHTML += '<option value="' + category.id + '">' + category.description + '</option>'
    }
    for (const publisher of publishers) {
        publisherHTML += '<option value="' + publisher.id + '">' + publisher.name + '</option>'
    }
    for (const format of formats) {
        formatHTML += '<option value="' + format.id + '">' + format.description + '</option>'
    }

    Swal.fire({
        title: 'Add Book',
        html:
            '<input id="id" type="hidden">' +
            '<input id="title" class="swal2-input" placeholder="Title">' +
            '<input id="author" class="swal2-input" placeholder="Author">' +
            '<input id="price" type="number" min="0.00" max="10000.00" step="0.01" class="swal2-input" placeholder="Price">' +
            '<select id="category" class="swal2-input" name="category">' +
            categoryHTML +
            '</select>' +
            '<select id="publisher" class="swal2-input" style="max-width: none" name="publisher">' +
            publisherHTML +
            '</select>' +
            '<select id="format" class="swal2-input" style="max-width: none" name="format">' +
            formatHTML +
            '</select>' +
            '<input id="pages" type="number" class="swal2-input" placeholder="Pages">' +
            '<input id="publication_year" type="number" min="1200" max="2999" class="swal2-input" style="width: 350px" placeholder="Publication Year (0000-2999)">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            addBook();
        }
    });
}

const showBookEditBox = async (id) => {
    const book = await getBook(id);
    const data = book.data;
    const categories = await getCategories();
    const publishers = await getPublishers();
    const formats = await getFormats();
    let categoryHTML = '';
    let publisherHTML = '';
    let formatHTML = '';
    for (const category of categories) {
        if (data.categories_id === category.id) {
            categoryHTML += '<option value="' + category.id + '" selected>' + category.description + '</option>'
        } else {
            categoryHTML += '<option value="' + category.id + '">' + category.description + '</option>'
        }
    }
    for (const publisher of publishers) {
        if (data.publishers_id === publisher.id) {
            publisherHTML += '<option value="' + publisher.id + '" selected>' + publisher.name + '</option>'
        } else {
            publisherHTML += '<option value="' + publisher.id + '">' + publisher.name + '</option>'
        }
    }
    for (const format of formats) {
        if (data.formats_id === format.id) {
            formatHTML += '<option value="' + format.id + '" selected>' + format.description + '</option>'
        } else {
            formatHTML += '<option value="' + format.id + '">' + format.description + '</option>'
        }
    }

    Swal.fire({
        title: 'Edit Book',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="title" class="swal2-input" placeholder="Title" value="' + data.title + '">' +
            '<input id="author" class="swal2-input" placeholder="Author" value="' + data.author + '">' +
            '<input id="price" type="number" min="0.00" max="10000.00" step="0.01" class="swal2-input" placeholder="Price" value="' + data.price + '">' +
            '<select id="category" class="swal2-input" name="category">' +
            '<option disabled>Category</option>' +
            categoryHTML +
            '</select>' +
            '<select id="publisher" class="swal2-input" name="publisher">' +
            '<option disabled>Publisher</option>' +
            publisherHTML +
            '</select>' +
            '<select id="format" class="swal2-input" name="format">' +
            '<option disabled>Format</option>' +
            formatHTML +
            '</select>' +
            '<input id="pages" type="number" class="swal2-input" placeholder="Pages" value=' + data.pages + '>' +
            '<input id="publication_year" type="number" class="swal2-input" placeholder="Publication Year" value=' + data.publication_year + '>',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            bookEdit();
        }
    });
}

const showBookDetailBox = async (id) => {
    const book = await getBook(id);
    const data = book.data;
    const categories = await getCategories();
    const publishers = await getPublishers();
    const formats = await getFormats();
    let categoryHTML = '';
    let publisherHTML = '';
    let formatHTML = '';
    for (const category of categories) {
        if (data.categories_id === category.id) {
            categoryHTML += '<input disabled class="swal2-input show-input" value="' + category.description + '">'

        }
    }
    for (const publisher of publishers) {
        if (data.publishers_id === publisher.id) {
            publisherHTML += '<input disabled class="swal2-input show-input" value="' + publisher.name + '">'
        }
    }
    for (const format of formats) {
        if (data.formats_id === format.id) {
            formatHTML = '<input disabled class="swal2-input show-input" value="' + format.description + '">'
            break;
        } else {
            formatHTML = '<input disabled class="swal2-input show-input" value="undefined">'
        }
    }

    const swalCustomPopup = Swal.mixin({
        customClass: {
            popup: 'popup-show',
        },
        buttonsStyling: true
    })

    swalCustomPopup.fire({
        title: 'Book Details',
        html:
            '<label class="show-lbl">Title<input disabled id="title" class="swal2-input show-input" placeholder="Title" value="' + data.title + '"></label>' +
            '<label class="show-lbl">Author<input disabled id="author" class="swal2-input show-input" placeholder="Author" value="' + data.author + '"></label>' +
            '<label class="show-lbl">Price<input disabled id="price" class="swal2-input show-input" placeholder="Price" value=" $ ' + data.price + '"></label>' +
            '<label class="show-lbl">Category' + categoryHTML + '</label>' +
            '<label class="show-lbl">Publisher' + publisherHTML + '</label>' +
            '<label class="show-lbl">Pages<input disabled id="pages" class="swal2-input show-input" placeholder="Pages" value=' + data.pages + '></label>' +
            '<label class="show-lbl">Publication year<input disabled id="publication_year" class="swal2-input show-input" placeholder="Publication Year" value=' + data.publication_year + '></label>' +
            '<label class="show-lbl">Format' + formatHTML + '</label>' +
            '<label class="show-lbl">Price<input disabled id="price" class="swal2-input show-input" placeholder="Pages" value="R$ 98.99"></label>',
        focusConfirm: false,
        showCancelButton: false,
        preConfirm: false
    });
}
function filterFunction() {
    const search = document.getElementById("myInput").value
    loadTable(`?title=${search}&sort=title&order=ASC`);
}