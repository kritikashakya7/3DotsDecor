import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CModal from "../../components/Modal";
import { Pen, Plus, Trash } from "lucide-react";
import useAdmin from "../../hooks/useAdmin";
import toast from "react-hot-toast";

const Category = () => {
  const { addCategory, getAllCategory, deleteCategory, editCategory } =
    useAdmin();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const resetFields = () => {
    setName("");
    setDescription("");
  };

  const fetchCategory = async () => {
    const response = await getAllCategory();
    if (response.success) {
      setCategory(response.data);
    }
  };

  const onAddCategory = async () => {
    setIsSubmitting(true);

    const response = await addCategory({ name, description });

    if (response.success) {
      toast.success(response.data.message);
      setIsAddModalOpen(false);
      resetFields();
      fetchCategory();
    } else {
      toast.error(response.message);
    }

    setIsSubmitting(false);
  };

  const onOpenEditModal = ({ id, name, description }) => {
    setIsEditModalOpen(true);
    setSelectedId(id);
    setName(name);
    setDescription(description);
  };

  const onEditCategory = async () => {
    setIsSubmitting(true);

    const response = await editCategory({
      id: selectedId,
      name,
      description,
    });

    if (response.success) {
      setIsEditModalOpen(false);
      toast.success(response.data.message);
      fetchCategory();
      resetFields();
    } else {
      toast.error(response.message);
    }

    setIsSubmitting(false);
  };

  const onDeleteCategory = async (id) => {
    const response = await deleteCategory(id);

    if (response.success) {
      toast.success(response.data.message);
      fetchCategory();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="space-y-5">
      <CModal
        title="Add Category"
        isOpen={isAddModalOpen}
        closeModal={() => {
          setIsAddModalOpen(false);
          resetFields();
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              placeholder="Enter product title"
              className="p-3 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              className="p-3 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button onClick={onAddCategory} disabled={isSubmitting}>
            Add
          </Button>
        </div>
      </CModal>

      <CModal
        title="Add Category"
        isOpen={isEditModalOpen}
        closeModal={() => {
          setIsEditModalOpen(false);
          resetFields();
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              placeholder="Enter product title"
              className="p-3 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              className="p-3 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button onClick={onEditCategory} disabled={isSubmitting}>
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
          Add Category
        </Button>
      </div>

      <div className="p-5 rounded-md bg-secondary text-white space-y-5">
        <h1 className="text-xl font-bold">Categories</h1>

        <table className="w-full text-left table-auto">
          <tr className="border-b">
            <th>Name</th>
            <th>Description</th>
            <th className="max-w-20">Actions</th>
          </tr>

          <br />

          <tbody>
            {category.map((category) => (
              <>
                <tr key={category?._id}>
                  <td>{category?.name}</td>
                  <td>{category?.description}</td>
                  <td className="space-x-3 flex">
                    <Button
                      className="flex items-center gap-2"
                      disabled={isSubmitting}
                      onClick={() =>
                        onOpenEditModal({
                          id: category._id,
                          name: category.name,
                          description: category.description,
                        })
                      }
                    >
                      <Pen />
                      Edit
                    </Button>
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => onDeleteCategory(category?._id)}
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

export default Category;
