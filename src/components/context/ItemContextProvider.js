import React from 'react'
import ItemsContext from './ItemContext'

const ItemContextProvider = ({children}) => {
    const [openPop , setOpenPop ] = React.useState(false)
    const [itemInLocal , setItemInLocal] = React.useState([])
    const [toUpdate , setToUpdate] = React.useState(null)
    
    const getItem = () => {
        const data = JSON.parse(localStorage.getItem("Items"))
        setItemInLocal(data)
    }

 React.useEffect(()=>{
    getItem()
 },[])
  return (
    <ItemsContext.Provider value={ {result : itemInLocal , setItemInLocal , openPop , setOpenPop , toUpdate , setToUpdate}}>
        {children}
    </ItemsContext.Provider>
  )
}

export default ItemContextProvider