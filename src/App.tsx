import { useEffect, useState, lazy, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';

// COMPONENTS
import NavBar from './components/Navbar/NavBar';
import CardTile from './components/CardTile/CardTile';
import Table from './components/Table';
import Icon from './components/Icon/Icon';
const EditItemModal = lazy(() => import('./components/EditItemModal/EditItemModal'))

// STORE
import { AppDispatch, RootState } from './store/store';
import { fetchInventory } from './store/actions/inventoryActions';
import { removeItem, updateItem } from './store/features/inventorySlice';

// UTILS
import { getTotalValue, getTotalOutOfStock, getTotalCategory } from './utils/utils';

// TYPES 
import { Item } from './utils/utils';

// CSS
import './App.scss'


// Define the type for the props passed to getTableHeader
interface TableHeaderProps {
  isUser: boolean;
  disableRecord: (payload: Item) => void,
  deleteItem: (name: string) => void,
  editItem: (item: Item) => void
}

// Define the type for the column header configuration
interface TableColumn {
  header: string;
  key: string;
  render?: (text: string, row: Item) => JSX.Element;
}

const getTableHeader = ({ isUser, disableRecord, deleteItem, editItem }: TableHeaderProps): TableColumn[] => [
  { header: "Name", key: "name" },
  { header: "Category", key: "category" },
  { header: "Price", key: "price" },
  { header: "Quantity", key: "quantity" },
  { header: "Value", key: "value" },
  { header: "ACTION", key: "action", render: (_: string , row: Item) => {
    return <div className='flex'>
      <Icon name='fa-solid fa-pencil' disabled={isUser || row.disabled} onClick={()=>editItem(row)}/>
      <Icon name='fa-solid fa-eye' className={classNames('ml-10',{['color-pink']:!isUser})} disabled={isUser} onClick={() =>disableRecord({...row, disabled: !row.disabled})}/>
      <Icon name='fa-solid fa-trash' className={classNames('ml-10', {['delete-red']:!isUser})} disabled={isUser} onClick={() => deleteItem(row.name)}/>
    </div>
  } },
];

function App() {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [selected, setSelected] = useState({});;

  const dispatch = useDispatch<AppDispatch>()
  const {loading, items} = useSelector((state: RootState) => state.inventory);

  const totalValue = getTotalValue(items)
  const outOfStockItems = getTotalOutOfStock(items)
  const totalCategoryCount = getTotalCategory(items);

  const disableRecord = useCallback((payload: Item) => {
    dispatch(updateItem(payload))
  },[dispatch])

  const deleteItem = useCallback((name: string) => {
    dispatch(removeItem(name))
    toast.success('Product deleted successfully')
  },[dispatch])

  const editItem = useCallback((item: Item) => {
    if (isUser || item.disabled) return;
    setSelected(item);
  },[dispatch])

  const tableHeader = useMemo(() => getTableHeader({isUser, disableRecord, deleteItem, editItem}),[isUser, disableRecord, deleteItem, editItem])

  useEffect(()=>{
    dispatch(fetchInventory())
  },[dispatch])

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
          <Table data={items} header={tableHeader} loading={loading}/>
        </div>
        {selected ? <EditItemModal selected={selected} setSelected={setSelected}/> : null}
      </div>
  )
}

export default App
