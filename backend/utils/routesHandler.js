class Routes {
  constructor(req, Books) {
    this.req = req;
    this.books = Books;

  }
  search() {
    const keyword = this.req.query.search || "";

    const result = this.books
      .find({
        title: { $regex: keyword, $options: "i" },
      })
      .sort({ createdAt: "desc" });
    this.books = result;
    
    return this;
  }
  filter() {
    const query = this.req.query;
    const genres = query.genres;
    const arr = genres ? genres.split(",") : undefined;

    this.books = arr
      ? this.books.find({ genres: { $in: arr } })
      : this.books.find();

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
