import React, { useContext, useState, useEffect } from "react";
import ItemsContext from "../context/ItemContext";
import Popup from "../PopUp/Popup";
import { FaFilter } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const {
    result: dataInLocal = [],
    setItemInLocal,
    openPop,
    setOpenPop,
    setToUpdate,
  } = useContext(ItemsContext);

  const [toFilter, setToFilter] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [sortedItems, setSortedItems] = useState(dataInLocal);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setSortedItems(dataInLocal);
  }, [dataInLocal]);

  const handleSort = () => {
    const sorted = [...sortedItems].sort((a, b) =>
      isAscending
        ? a.ItemQuantity - b.ItemQuantity
        : b.ItemQuantity - a.ItemQuantity
    );
    setIsAscending(!isAscending);
    setSortedItems(sorted);
  };

  const removeItem = (index) => {
    const updatedData = dataInLocal.filter(
      (item) => item._id !== dataInLocal[index]._id
    );
    localStorage.setItem("Items", JSON.stringify(updatedData));
    setItemInLocal(updatedData);
  };

  return (
    <>
      <div className="font-sans overflow-x-auto mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Item Name
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                <button
                  onClick={() => setOpenFilter(!openFilter)}
                  className="flex justify-center items-center w-full"
                >
                  {toFilter ? `Category: ${toFilter}` : "Category"}
                  <FaFilter className="ml-2" />
                </button>
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                <button
                  onClick={handleSort}
                  className="flex justify-center items-center w-full"
                >
                  Item Quantity
                  <FaFilter className="ml-2" />
                </button>
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-center divide-y divide-gray-200 whitespace-nowrap">
            {sortedItems
              .filter((item) => item.ItemCategory === toFilter || !toFilter)
              .map((item, index) => (
                <tr key={item._id}>
                  <td   className={`px-4 py-4 text-sm ${
                      item.ItemQuantity <= 10 ? "text-red-500" : "text-black"
                    }`}>
                    {item.ItemName}
                  </td>
                  <td   className={`px-4 py-4 text-sm ${
                      item.ItemQuantity <= 10 ? "text-red-500" : "text-black"
                    }`}>
                    {item.ItemCategory}
                  </td>
                  <td
                    className={`px-4 py-4 text-sm ${
                      item.ItemQuantity <= 10 ? "text-red-500" : "text-black"
                    }`}
                  >
                    {item.ItemQuantity}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    <button
                      onClick={() => {
                        setToUpdate(item);
                        setOpenPop(!openPop);
                      }}
                      className="text-blue-600 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                          removeItem(index)}
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {openPop && (
        <div className="bg-black inset-0 bg-opacity-70 flex justify-center items-center z-10 fixed">
          <Popup />
        </div>
      )}

      {openFilter && (
        <div className="bg-gray-200 w-[10vw] fixed top-[40vh] left-[20vw] rounded-md p-2">
          {Array.from(new Set(dataInLocal.map((item) => item.ItemCategory))).map(
            (category, idx) => (
              <div key={idx}>
                <button
                  onClick={() => {
                    setToFilter(category);
                    setOpenFilter(false);
                  }}
                  className="p-2 bg-gray-100 rounded-md w-full text-left"
                >
                  {category}
                </button>
                <hr className="my-1" />
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Table;
