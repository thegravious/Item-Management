import React from 'react'
import { useContext } from 'react'
import ItemsContext from '../context/ItemContext'
import { ToastContainer, toast } from 'react-toastify';


const AddItem = () => {
    const { setItemInLocal, setOpenPop, openPop, toUpdate, setToUpdate } = useContext(ItemsContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (toUpdate.ItemName === "" || toUpdate.ItemCategory === "" || toUpdate.ItemQuantity === "") {
            toast.error("FIELD CAN'T BE EMPTY")
        } else {
            const dataToUpdate = JSON.parse(localStorage.getItem("Items"))
            console.log(dataToUpdate)
            const updatedDate = dataToUpdate.map((data) => {
                if (data._id === toUpdate._id) {
                    return {
                        ...data,
                        ItemName: toUpdate.ItemName,
                        ItemCategory: toUpdate.ItemCategory,
                        ItemQuantity: toUpdate.ItemQuantity,
                    }
                } else {
                    return data
                }
            })
            localStorage.setItem("Items", JSON.stringify(updatedDate))
            setItemInLocal(updatedDate)
            setOpenPop(!openPop)
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
                    <h2 className="text-lg font-semibold text-gray-700 capitalize ">Update Item</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                            <div>
                                <label className="text-gray-700" htmlFor="Name">Item Name</label>
                                <input
                                    onChange={(e) => {
                                        setToUpdate({
                                            ...toUpdate,
                                            ItemName: e.target.value
                                        })
                                    }}
                                    value={toUpdate.ItemName}
                                    id="Name" type="text" className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="Category">Item Category</label>
                                <input
                                    onChange={(e) => {
                                        setToUpdate({
                                            ...toUpdate,
                                            ItemCategory: e.target.value
                                        })
                                    }}
                                    value={toUpdate.ItemCategory}
                                    id="Category" type="text" className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="Quantity">Item Quantity</label>
                                <input
                                    onChange={(e) => {
                                        setToUpdate({
                                            ...toUpdate,
                                            ItemQuantity: e.target.value
                                        })
                                    }}
                                    value={toUpdate.ItemQuantity}
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