import React from 'react'
import { useContext } from 'react'
import ItemsContext from '../context/ItemContext'
import { ToastContainer, toast } from 'react-toastify';


const AddItem = () => {
    const { setItemInLocal } = useContext(ItemsContext)
    const getAllItem = JSON.parse(localStorage.getItem("Items")) || []
    const [itemDetails, setItemDetails] = React.useState({
        ItemName: "",
        ItemCategory: "",
        ItemQuantity: "",
        _id: Date.now()
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (itemDetails.ItemName === "" || itemDetails.ItemCategory === "" || itemDetails.ItemQuantity === "") {
            toast.error("FIELD CAN'T BE EMPTY")
        } else {
            getAllItem.push(itemDetails)
            localStorage.setItem("Items", JSON.stringify(getAllItem))
            setItemDetails({
                ItemName: "",
                ItemCategory: "",
                ItemQuantity: "",
                _id: Date.now()
            })
            setItemInLocal(getAllItem)
            toast.success("Data Inserted")
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div>
                <section className="max-w-4xl p-6 mx-auto bg-gray-200 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize ">Add Item</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                            <div>
                                <label className="text-gray-700" htmlFor="Name">Item Name</label>
                                <input
                                    onChange={(e) => {
                                        setItemDetails({
                                            ...itemDetails,
                                            ItemName: e.target.value
                                        })
                                    }}
                                    value={itemDetails.ItemName}
                                    id="Name" type="text" className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="Category">Item Category</label>
                                <input
                                    onChange={(e) => {
                                        setItemDetails({
                                            ...itemDetails,
                                            ItemCategory: e.target.value
                                        })
                                    }}
                                    value={itemDetails.ItemCategory}
                                    id="Category" type="text" className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="Quantity">Item Quantity</label>
                                <input
                                    onChange={(e) => {
                                        setItemDetails({
                                            ...itemDetails,
                                            ItemQuantity: e.target.value
                                        })
                                    }}
                                    value={itemDetails.ItemQuantity}
                                    id="Quantity" type="number" className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                            </div>

                        </div>

                        <div className="flex justify-end mt-6">
                            <button type='Submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default AddItem