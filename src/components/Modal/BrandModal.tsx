"use client";
import { useState, useEffect } from "react";
import { BRAND } from "@/types/brand";

interface BrandModalProps {
  brand?: BRAND | null;
  onClose: () => void;
}

const BrandModal: React.FC<BrandModalProps> = ({ brand, onClose }) => {
  const [formData, setFormData] = useState<Partial<BRAND>>({
    name: "",
    visitors: 0,
    revenues: "",
    sales: 0,
    conversion: 0,
    logo: "",
  });

  useEffect(() => {
    if (brand) {
      setFormData(brand);
    }
  }, [brand]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "visitors" || name === "sales" || name === "conversion" 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none dark:bg-boxdark">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200 dark:border-strokedark">
            <h3 className="text-3xl font-semibold">
              {brand ? "Edit Brand" : "Add Brand"}
            </h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="relative flex-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Visitors (K)
                </label>
                <input
                  type="number"
                  name="visitors"
                  value={formData.visitors}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Revenues
                </label>
                <input
                  type="text"
                  name="revenues"
                  value={formData.revenues}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Sales
                </label>
                <input
                  type="number"
                  name="sales"
                  value={formData.sales}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                  Conversion (%)
                </label>
                <input
                  type="number"
                  name="conversion"
                  value={formData.conversion}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200 dark:border-strokedark">
              <button
                type="button"
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
              >
                {brand ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;