import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// COMPONENTS
import NavBar from './components/Navbar/NavBar';
import CardTile from './components/CardTile/CardTile';
import Table from './components/Table';
import Icon from './components/Icon/Icon';

// STORE
import { AppDispatch, RootState } from './store/store';
import { fetchInventory } from './store/actions/inventoryActions';
import { updateItem } from './store/features/inventorySlice';

// UTILS
import { getTotalValue, getTotalOutOfStock, getTotalCategory } from './utils/utils';

// TYPES 
import { Item } from './utils/utils';

// CSS
import './App.scss'


// Define the type for the props passed to getTableHeader
interface TableHeaderProps {
  isUser: boolean;
  disableRecord: (payload: Item) => void
}

// Define the type for the column header configuration
interface TableColumn {
  header: string;
  key: string;
  render?: (text: string, row: Item) => JSX.Element;
}

const getTableHeader = ({ isUser, disableRecord }: TableHeaderProps): TableColumn[] => [
  { header: "Name", key: "name" },
  { header: "Category", key: "category" },
  { header: "Price", key: "price" },
  { header: "Quantity", key: "quantity" },
  { header: "Value", key: "value" },
  { header: "ACTION", key: "action", render: (_: string , row: Item) => {
    return <div className='flex'>
      <Icon name='fa-solid fa-pencil' disabled={isUser || row.disabled}/>
      <Icon name='fa-solid fa-eye' className={classNames('ml-10',{['color-pink']:!isUser})} disabled={isUser} onClick={() =>disableRecord({...row, disabled: !row.disabled})}/>
      <Icon name='fa-solid fa-trash' className={classNames('ml-10', {['delete-red']:!isUser})} disabled={isUser}/>
    </div>
  } },
];

function App() {
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch<AppDispatch>()
  const {loading, items} = useSelector((state: RootState) => state.inventory);

  const totalValue = getTotalValue(items)
  const outOfStockItems = getTotalOutOfStock(items)
  const totalCategoryCount = getTotalCategory(items);

  const disableRecord = (payload: Item) => {
    dispatch(updateItem(payload))
  }

  useEffect(()=>{
    dispatch(fetchInventory())
  },[])

  return (
      <div className='main'>
        <NavBar setUser={(value: boolean) => setIsUser(value)} isUser={isUser}/>
        <div className='body-container'>
          <p className='color-white'>Inventory stats</p>
          <div className='card-wrapper'>
            <CardTile iconName='fa-solid fa-cart-shopping' title='Total product' value={items.length}/>
            <CardTile iconName='fa-solid fa-store' title='Total store value' value={totalValue}/>
            <CardTile iconName='fa-solid fa-store-slash' title='Out of stocks' value={outOfStockItems}/>
            <CardTile iconName='fa-solid fa-shapes' title='No of Category' value={totalCategoryCount}/>
          </div>
          <Table data={items} header={getTableHeader({isUser, disableRecord})} loading={loading}/>
        </div>
      </div>
  )
}

export default App
