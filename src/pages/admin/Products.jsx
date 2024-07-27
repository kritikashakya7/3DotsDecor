import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Button from "../../components/Button";
import { Pen, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import CModal from "../../components/Modal";

const Products = () => {
  const {
    getAllProducts,
    getAllCategory,
    addProduct,
    deleteProduct,
    editProduct,
  } = useAdmin();

  const [products, setProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form related states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState("");

  // Modal related states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchAllProducts = async () => {
    const response = await getAllProducts();

    if (response.success) {
      setProducts(response.data);
    }
  };

  const fetchCategory = async () => {
    const response = await getAllCategory();

    if (response.success) {
      setCategoryOptions(response.data);
    }
  };

  const readFileAsDataURL = (file) => {
    if (!file) return null;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onAddProduct = async () => {
    setIsSubmitting(true);
    let thumnailUrl;

    try {
      thumnailUrl = await readFileAsDataURL(thumbnail);

      const response = await addProduct({
        title,
        description,
        price,
        category,
        stock,
        thumbnail: thumnailUrl,
      });

      if (response.success) {
        setIsAddModalOpen(false);
        toast.success(response.data.message);
        fetchAllProducts();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }

    setIsSubmitting(false);
  };

  const onEditProduct = async () => {
    setIsSubmitting(true);
    let thumnailUrl;
    try {
      if (!thumbnail.toString().startsWith("http")) {
        thumnailUrl = await readFileAsDataURL(thumbnail);
      }

      const response = await editProduct({
        id: selectedId,
        title,
        description,
        price,
        category,
        stock,
        thumbnail: thumnailUrl || thumbnail,
      });

      if (response.success) {
        setIsEditModalOpen(false);
        toast.success(response.data.message);
        fetchAllProducts();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);

      toast.error("Oops! Something went wrong.");
    }

    setIsSubmitting(false);
  };

  const onDeleteProduct = async (id) => {
    setIsSubmitting(true);
    const response = await deleteProduct(id);

    if (response.success) {
      toast.success(response.data.message);
      fetchAllProducts();
    } else {
      toast.error(response.message);
    }
    setIsSubmitting(false);
  };

  const onOpenEditModal = ({
    id,
    title,
    description,
    price,
    category,
    stock,
    thumbnail,
  }) => {
    console.log("🚀 ~ category:", category);

    setIsEditModalOpen(true);
    setSelectedId(id);
    setTitle(title);
    setDescription(description);
    setPrice(price);
    setCategory(category);
    setStock(stock);
    setThumbnail(thumbnail);
    setCurrentThumbnailUrl(thumbnail);
  };

  const resetFields = () => {
    setSelectedId(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setStock("");
    setThumbnail(null);
    setCurrentThumbnailUrl("");
  };

  const getCategoryById = (id) => {
    const category = categoryOptions.find((category) => category._id === id);
    return category ? category.name : "";
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategory();
  }, []);

  return (
    <div className="space-y-5">
      <CModal
        isOpen={isAddModalOpen}
        closeModal={() => {
          setIsAddModalOpen(false);
          resetFields();
        }}
        title="Add Product"
        maxWidth="550"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label>Title</label>
            <input
              placeholder="Enter product title"
              className="p-3 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              className="p-3 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex md:w-full gap-3 max-md:flex-col">
            <div className="flex flex-col gap-1 md:flex-1">
              <label>Price</label>
              <input
                placeholder="Enter product price"
                type="number"
                className="p-3 border rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1 md:flex-1">
              <label>Stock</label>
              <input
                placeholder="Enter product stock"
                type="number"
                className="p-3 border rounded-md"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label>Category</label>
            <select
              className="p-3 border rounded-md placeholder-gray-50"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option defaultChecked>Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Thumbnail</label>
            <input
              type="file"
              placeholder="Pick product thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required
            />
          </div>
          <Button onClick={onAddProduct} disabled={isSubmitting}>
            Add
          </Button>
        </div>
      </CModal>

      <CModal
        isOpen={isEditModalOpen}
        closeModal={() => {
          setIsEditModalOpen(false);
          resetFields();
        }}
        title="Edit Product"
        maxWidth="580"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label>Title</label>
            <input
              placeholder="Enter product title"
              className="p-3 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              className="p-3 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex md:w-full gap-3 max-md:flex-col">
            <div className="flex flex-col gap-1 md:flex-1">
              <label>Price</label>
              <input
                placeholder="Enter product price"
                type="number"
                className="p-3 border rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1 md:flex-1">
              <label>Stock</label>
              <input
                placeholder="Enter product stock"
                type="number"
                className="p-3 border rounded-md"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label>Category</label>
            <select
              className="p-3 border rounded-md placeholder-gray-50"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option defaultChecked>Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Current Thumbnail</label>
            <img
              src={currentThumbnailUrl}
              className="size-48 object-cover aspect-square rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Thumbnail</label>
            <input
              type="file"
              placeholder="Pick product thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required
            />
          </div>
          <Button onClick={onEditProduct} disabled={isSubmitting}>
            Edit
          </Button>
        </div>
      </CModal>
      <div className="w-full flex justify-end">
        <Button
          className="flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus />
          Add Product
        </Button>
      </div>

      <div className="p-5 rounded-md bg-secondary text-white space-y-5">
        <h1 className="text-xl font-bold">Products</h1>

        <table className="w-full text-left table-fixed">
          <tr className="border-b">
            <th className="max-w-20"></th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th className="max-w-20">Actions</th>
          </tr>

          <br />

          <tbody>
            {products.map((product) => (
              <>
                <tr key={product?._id}>
                  <td>
                    <img
                      className="size-16 rounded-md object-cover"
                      src={product?.thumbnail}
                    />
                  </td>
                  <td>{product?.title}</td>
                  <td>Rs. {product?.price}</td>
                  <td>{getCategoryById(product?.categoryId)}</td>
                  <td>{product?.stock}</td>
                  <td className="space-x-3 flex">
                    <Button
                      className="flex items-center gap-2"
                      disabled={isSubmitting}
                      onClick={() =>
                        onOpenEditModal({
                          id: product._id,
                          title: product.title,
                          description: product.description,
                          price: product.price,
                          category: product?.categoryId,
                          stock: product.stock,
                          thumbnail: product.thumbnail,
                        })
                      }
                    >
                      <Pen />
                      Edit
                    </Button>
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => onDeleteProduct(product?._id)}
                      disabled={isSubmitting}
                    >
                      <Trash />
                      Delete
                    </Button>
                  </td>
                </tr>
                <br />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
