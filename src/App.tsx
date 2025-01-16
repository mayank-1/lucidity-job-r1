import { useState } from 'react';

// COMPONENTS
import NavBar from './components/Navbar/NavBar';
import CardTile from './components/CardTile/CardTile';

// STYLES
import './App.scss'



function App() {
  const [count, setCount] = useState(0)

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
        </div>
      </div>
  )
}

export default App
