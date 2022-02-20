import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { addBook } from "../actions/booksActions";

const AddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, books, loading, added } = useSelector((state) => state.books);

  const [imgDisp, setImgDisp] = useState("/img/book.svg");
  const [img, setImg] = useState("");
  const [book, setBook] = useState({});

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (added) {
      alert.success("Books added");
      navigate("/books");
    }
  }, [books, loading, error, alert, navigate]);

  const handleInput = (e) => {
    if (e.target.name === "cover") {
      console.log("coverr", e.target);
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImgDisp(fileReader.result);
        setImg(fileReader.result);
      };
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const genres = [];
    const genre = document.getElementsByName("genre");
    Array.from(genre).forEach((g) => {
      if (g.checked) {
        genres.push(g.value);
      }
    });
    console.log(genres);
    const { title, description, link, author } = book;
    if (!img) {
      return alert.error("Please add book cover image.");
    } else if (!title) {
      return alert.error("Please enter book title");
    } else if (!author) {
      return alert.error("Please enter the author.");
    } else if (!link) {
      return alert.error("Please enter google drive link to the book.");
    } else if (!description) {
      return alert.error("Please enter book description");
    } else if (genres.length <= 0) {
      return alert.error("Select at least one genre");
    }
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("genres", genres);
    formData.set("cover", img);
    formData.set("link", link);
    formData.set("author", author);

    console.log(formData.get("genres"));
    addBook(dispatch, formData);
  };
  const genres = [
    "action",
    "romance",
    "mystery",
    "fiction",
    "horror",
    "sci-fi",
    "thriller",
    "shorts",
    "biography",
    "history",
    "cookbook",
    "poetry",
    "self-help",
    "educational",
    "finance",
  ];
  return (
    <>
      <Container
        fluid="md"
        className="d-flex justify-content-center my-5 h-100"
      >
        <form
          onSubmit={(e) => submit(e)}
          className="mx-0 mx-sm-2 mx-md-5 d-flex flex-column align-items-center rounded py-4 px-2 px-md-5 border border-2"
          style={{ maxWidth: "700px" }}
          autocomplete="off"
        >
          <h5 className="fs-2">Add Book</h5>

          <img
            src={imgDisp}
            style={{ width: "170px", height: "170px" }}
            alt="avatar"
            title="avatar"
            className="rounded"
          />
          <div className="mb-3 w-100">
            <label htmlFor="formFile" className="form-label">
              Add book cover
            </label>
            <input
              className="form-control"
              type="file"
              name="cover"
              id="formFile"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3 w-100">
            <label htmlFor="bookTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="bookTitle"
              aria-describedby="nameHelp"
              name="title"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="bookTitle" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="bookAuthor"
              aria-describedby="nameHelp"
              name="author"
              onChange={handleInput}
            />
          </div>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip style={{ zIndex: "200" }}>
                <ol>
                  <li>Upload book to google drive.</li>
                  <li>Select file on google drive.</li>
                  <li>
                    Click on share or
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-plus"
                      viewBox="0 0 16 16"
                      style={{
                        marginLeft: "5px",
                        position: "relative",
                        bottom: "3px",
                      }}
                    >
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      <path
                        fill-rule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                  </li>
                  <li>Change link access to everyone</li>
                  <li>Copy link</li>
                </ol>
              </Tooltip>
            }
          >
            <div className="mb-3 w-100">
              <label htmlFor="bookTitle" className="form-label">
                Book Link
              </label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                aria-describedby="nameHelp"
                name="link"
                onChange={handleInput}
              />
            </div>
          </OverlayTrigger>
          <div className="mb-3 w-100">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              aria-describedby="emailHelp"
              name="description"
              onChange={handleInput}
              style={{ height: "200px" }}
            ></textarea>
          </div>
          <Container className="mb-2">
            <h6 className="fs-5">Genres</h6>
            <Row>
              {genres.map((genre) => (
                <div class="form-check form-switch col-sm-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={genre}
                    name="genre"
                    value={genre}
                    onChange={handleInput}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={genre}
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </Row>
          </Container>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            Add Book
          </button>
        </form>
      </Container>
    </>
  );
};

export default AddBook;
