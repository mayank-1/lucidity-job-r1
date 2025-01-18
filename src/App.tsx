import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import NavBar from './components/Navbar/NavBar';
import CardTile from './components/CardTile/CardTile';
import Table from './components/Table';

// STORE
import { AppDispatch, RootState } from './store/store';
import { fetchInventory } from './store/actions/inventoryActions';

// UTILS
import { getTotalValue, getTotalOutOfStock, getTotalCategory } from './utils/utils';

// STYLES
import './App.scss'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const {loading, items} = useSelector((state: RootState) => state.inventory);
  
  const header = [
    { header: "Name", key: "name" },
    { header: "Category", key: "category" },
    { header: "Price", key: "price" },
    { header: "Quantity", key: "quantity" },
    { header: "Value", key: "value" },
    { header: "ACTION", key: "action", render: () => {

    } },
  ];

  const totalValue = getTotalValue(items)
  const outOfStockItems = getTotalOutOfStock(items)
  const totalCategoryCount = getTotalCategory(items);

  useEffect(()=>{
    dispatch(fetchInventory())
  },[])

  return (
      <div className='main'>
        <NavBar/>
        <div className='body-container'>
          <p className='color-white'>Inventory stats</p>
          <div className='card-wrapper'>
            <CardTile iconName='fa-solid fa-cart-shopping' title='Total product' value={items.length}/>
            <CardTile iconName='fa-solid fa-store' title='Total store value' value={totalValue}/>
            <CardTile iconName='fa-solid fa-store-slash' title='Out of stocks' value={outOfStockItems}/>
            <CardTile iconName='fa-solid fa-shapes' title='No of Category' value={totalCategoryCount}/>
          </div>
          <Table data={items} header={header} loading={loading}/>
        </div>
      </div>
  )
}

export default App
