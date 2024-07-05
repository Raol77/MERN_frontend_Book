import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function SinglePage() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const fetchBook = async () => {
    const result = await axios.get(`http://localhost:3000/books/${id}`);
    setBook(result.data);
  };
  useEffect(() => {
    fetchBook();
  }, [book]);
  const handleDelete = async () => {
    const result = await axios.delete(`http://localhost:3000/books/${id}`);
    if (result) {
      navigate("/");
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-3xl mx-auto my-[80px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pb-14">
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          </a>
          <img
            className="rounded-t-lg w-128"
            src={`http://localhost:3000/image/${book.image}`}
            alt={book.bookName}
          />

          <p className="my-3 font-normal text-gray-700 dark:text-gray-400">
            Rs. {book.bookPrice}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            By {book.bookName}
          </p>
          <button
            className="bg-red-500 rounded-lg shadow-md mx-1 p-3 float-end my-2 text-white"
            onClick={handleDelete}>
            Delete
          </button>
          <Link
            className="bg-yellow-500 rounded-lg shadow-md p-3 float-end my-2 text-white"
            to={`/edit/${id}`}>
            Edit
          </Link>
        </div>
      </div>
    </>
  );
}

export default SinglePage;
