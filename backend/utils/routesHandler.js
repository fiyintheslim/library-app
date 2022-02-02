class Routes {
  constructor(req, Books) {
    this.req = req;
    this.books = Books;
  }
  search() {
    const keyword = this.req.query.keyword || "";

    const result = this.books.find({
      title: { $regex: keyword, $options: "i" },
    });
    this.books = result;
    return this;
  }
  filter() {
    const query = this.req.query;
    const genres = query.genres || "";
    const arr = genres.split(",");
    console.log("category", arr);
    this.books = this.books.find({ genres: { $in: arr } });
    return this;
  }
  paginate(no) {
    const page = this.req.query.page || 1;
    const skip = no * (page - 1);

    this.books = this.books.limit(no).skip(skip);

    return this;
  }
}

module.exports = Routes;
