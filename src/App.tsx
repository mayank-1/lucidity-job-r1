import { useState } from 'react';

// COMPONENTS
import NavBar from './components/Navbar/NavBar';
import CardTile from './components/CardTile/CardTile';
import Table from './components/Table';

// STYLES
import './App.scss'




function App() {
  const [count, setCount] = useState(0)

  type User = {
    name: string,
    category: string,
    value: string,
    quantity: number,
    price: string
  };
  
  const header = [
    { header: "Name", key: "name" },
    { header: "Category", key: "category" },
    { header: "Price", key: "price" },
    { header: "Quantity", key: "quantity" },
    { header: "Value", key: "value" },
    { header: "ACTION", key: "action" },
  ];
  
  const data: User[] = [
    {
      name: "Bluetooth",
      category: "Electronic",
      value: "$150",
      quantity: 5,
      price: "$30"
    },
    {
      name: "Edifier M43560",
      category: "Electronic",
      value: "0",
      quantity: 0,
      price: "$0"
    },
    {
      "name": "Sony 4k ultra 55 inch TV",
      "category": "Electronic",
      "value": "$1190",
      "quantity": 17,
      "price": "$70"
    },
    {
      "name": "Samsumg 55 inch TV",
      "category": "Electronic",
      "value": "$600",
      "quantity": 50,
      "price": "$12"
    },
    {
      "name": "samsumg S34 Ultra",
      "category": "phone",
      "value": "$0",
      "quantity": 0,
      "price": "$0"
    }
  ];

  return (
      <div className='main'>
        <NavBar/>
        <div className='body-container'>
          <p className='color-white'>Inventory stats</p>
          <div className='card-wrapper'>
            <CardTile iconName='fa-solid fa-cart-shopping' title='Total product' value='9'/>
            <CardTile iconName='fa-solid fa-store' title='Total store value' value='30,000'/>
            <CardTile iconName='fa-solid fa-store-slash' title='Out of stocks' value='2'/>
            <CardTile iconName='fa-solid fa-shapes' title='No of Category' value='2'/>
          </div>
          <Table data={data} header={header} loading={false}/>
        </div>
      </div>
  )
}

export default App
