import './App.css';
import AddItem from './components/AddItem/AddItem';
import Table from './components/table/Table';
import ItemContextProvider from './components/context/ItemContextProvider';

function App() {
  return (
    <div className='py-10 px-10  min-h-screen'>
      <ItemContextProvider>
        <AddItem />
        <Table />
      </ItemContextProvider>
    </div>
  );
}

export default App;
