import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const fetcher = async () => {
    const result = await axios.get("http://localhost:3000/books");
    // console.log(result.data);
    setBooks(result.data);
  };
  useEffect(() => {
    fetcher();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-evenly pt-16 gap-4 my-5">
        {books.map(book => (
          <Card key={book.isbnNumber} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
