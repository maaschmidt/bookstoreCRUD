const ENDPOINT = "http://177.44.248.52/livraria";

const loadTable = () => {
    axios.get(`${ENDPOINT}/books`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.title + '</td>';
                    trHTML += '<td>' + element.author + '</td>';
                    trHTML += '<td>' + element.publication_year + '</td>';
                    trHTML += '<td>' + element.pages + '</td>';
                    trHTML += '<td>' + element.Category.description + '</td>';
                    trHTML += '<td>' + element.Publisher.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showBookEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="bookDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const addBook = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;

    axios.post(`${ENDPOINT}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        categories_id: category,
        publishers_id: publisher,
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

const bookEdit = () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;

    axios.put(`${ENDPOINT}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        categories_id: category,
        publishers_id: publisher,
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
};

const showBookAddBox = async () => {
    const categories = await getCategories();
    const publishers = await getPublishers();
    let categoryHTML = '';
    let publisherHTML = '';
    for (const category of categories) {
        categoryHTML += '<option value="' + category.id + '">' + category.description + '</option>'
    }
    for (const publisher of publishers) {

        publisherHTML += '<option value="' + publisher.id + '">' + publisher.name + '</option>'
    }

    Swal.fire({
        title: 'Add Book',
        html:
            '<input id="id" type="hidden">' +
            '<input id="title" class="swal2-input" placeholder="Title">' +
            '<input id="author" class="swal2-input" placeholder="Author">' +
            '<select id="category" class="swal2-input" name="category">' +
            '<option disabled selected>Category</option>' +
            categoryHTML +
            '</select>' +
            '<select id="publisher" class="swal2-input" style="max-width: none" name="publisher">' +
            '<option disabled selected>Publisher</option>' +
            publisherHTML +
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
    let categoryHTML = '';
    let publisherHTML = '';
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

    Swal.fire({
        title: 'Edit Book',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="title" class="swal2-input" placeholder="Title" value="' + data.title + '">' +
            '<input id="author" class="swal2-input" placeholder="Author" value="' + data.author + '">' +
            '<select id="category" class="swal2-input" name="category">' +
            '<option disabled>Category</option>' +
            categoryHTML +
            '</select>' +
            '<select id="publisher" class="swal2-input" name="publisher">' +
            '<option disabled>Publisher</option>' +
            publisherHTML +
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

const log = (action) => {
    action = `BOOK ${action}`

    axios.post(`${ENDPOINT}/log`, {
        action: action,
        date: new Date(),
    })
}