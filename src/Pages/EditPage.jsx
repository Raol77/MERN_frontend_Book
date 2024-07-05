import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchBook = async () => {
    const res = await axios.get(`http://localhost:3000/books/${id}`);
    setForm(res.data);
    setImgPreview(`http://localhost:3000/image/${res.data.image}`);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleChange = ev => {
    const { name, value } = ev.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === "image") {
      const file = ev.target.files[0];
      setImage(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);
    const result = await axios.patch(
      `http://localhost:3000/books/${id}`,
      formData
    );
    if (result.status == 200) {
      navigate(-1);
    } else {
      alert(`There was some error while entering data`);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-[50px]">
        <div className="bg-white p-8 mt-[35px] rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.bookName}
                name="bookName"
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="bookPrice"
                className="block text-gray-600 font-medium">
                Price
              </label>
              <input
                type="number"
                id="bookPrice"
                name="bookPrice"
                value={form.bookPrice}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="isbnNumber"
                className="block text-gray-600 font-medium">
                ISBN Number
              </label>
              <input
                type="number"
                id="isbnNumber"
                name="isbnNumber"
                value={form.isbnNumber}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="authorName"
                className="block text-gray-600 font-medium">
                Author Name
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                value={form.authorName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="publishedAt"
                className="block text-gray-600 font-medium">
                Published At
              </label>
              <input
                type="date"
                id="publishedAt"
                onChange={handleChange}
                value={form.publishedAt}
                name="publishedAt"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-600 font-medium">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={ev => setImage(ev.target.files[0])}
                className="w-full mt-1 p-2 border border-gray-300   rounded focus:ring focus:ring-indigo-500"
              />
            </div>
            {imgPreview && <img src={imgPreview} />}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPage;
