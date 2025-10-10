import React, { useState } from "react";
import axios from "axios";
import EnquiryList from "./enquiry/EnquiryList";
import { ToastContainer, toast } from "react-toastify";

function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [enquiries, setEnquiries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes
  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  // Submit form
  const saveEnquiry = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Edit mode
      const updated = [...enquiries];
      updated[editIndex] = formData;
      setEnquiries(updated);
      setEditIndex(null);
      toast.success("Enquiry updated successfully");
    } else {
      // Add mode
      axios
        .post("http://localhost:8080/api/website/enquiry/insert", formData)
        .then((res) => {
          toast.success("Enquiry saved successfully");
          setEnquiries([...enquiries, formData]);
        })
        .catch(() => toast.error("Failed to save enquiry"));
    }

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  // Edit handler
  const handleEdit = (index) => {
    setFormData(enquiries[index]);
    setEditIndex(index);
  };

  // Delete handler
  const handleDelete = (index) => {
    const updated = enquiries.filter((_, i) => i !== index);
    setEnquiries(updated);
    toast.info("Enquiry deleted");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <h1 className="text-4xl text-center py-6 font-bold text-gray-800">
        USER ENQUIRY
      </h1>

      <div className="grid grid-cols-[30%_auto] gap-6">
        {/* Left: Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Enquiry Form</h2>

          <form className="space-y-4" onSubmit={saveEnquiry}>
            {["name", "phone", "email", "message"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 font-medium capitalize">
                  {field}
                </label>
                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={getValue}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                ) : (
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={getValue}
                    required
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white font-semibold py-3 rounded-md hover:bg-gray-800 transition"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Right: Enquiry Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <EnquiryList
            enquiries={enquiries}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
