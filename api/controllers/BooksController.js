const { Op } = require('sequelize');
const BookModel = require('../models/Book');
const CategoryModel = require('../models/Category');
const PublisherModel = require('../models/Publisher');
const FormatModel = require('../models/Format');
const LogsController = require('../controllers/LogsController');

class BooksController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 10;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    let sort = params.sort || 'id';
    let order = params.order || 'ASC';
    const where = {};

    if (params.title) {
      where.title = {
        [Op.iLike]: `%${params.title}%`
      }
    }

    if (params.author) {
      where.author = {
        [Op.iLike]: `%${params.author}%`
      }
    }

    if (params.min_price) {
      where.ticket_value = {
        [Op.gte]: params.min_price
      }
    }

    if (params.max_price) {
      if (!where.ticket_value) {
        where.ticket_value = {}
      }
      where.ticket_value[Op.lte] = params.max_price;
    }

    if(sort == 'Category'){
      sort = { model: CategoryModel };
      order =  'description';
    }

    const books = await BookModel.findAll({
      include: [{
        model: CategoryModel,
        required: false,
        attributes: ['description']
      },{
        model: PublisherModel,
        required: false,
        attributes: ['name']
      },{
        model: FormatModel,
        required: false,
        attributes: ['description']
      }],
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(books);
  }
  
  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const book = await BookModel.create(data);
      res.json(book);
      await LogsController.create({action: "BOOK ADD", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  show = async (req, res, next) => {
    const book = await BookModel.findByPk(req.params.booksId);
    res.json(book);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.booksId;
      const data = await this._validateData(req.body, id);
      await BookModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await BookModel.findByPk(id));
      await LogsController.create({action: "BOOK UPDATE", date: new Date()});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await BookModel.destroy({
      where: {
        id: req.params.booksId
      }
    });
    res.json({});
    await LogsController.create({action: "BOOK DELETE", date: new Date()});
  }

  _validateData = async (data, id) => {
    const attributes = ['title', 'author', 'publication_year', 'pages', 'price', 'categories_id', 'publishers_id', 'formats_id'];
    const book = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }else if (data.publication_year > 2999 ||
         data.publication_year < 0 ||
         data.publication_year.length != 4){
        throw new Error(`Publication year unacceptable.`);
      }
      book[attribute] = data[attribute];
      if (book.price < 0){
        throw new Error(`Invalid price`);
      }
    }
    return book;
  }

}

module.exports = new BooksController();
