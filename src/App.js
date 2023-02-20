import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash })
  }

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash })
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <h1>Redux Course</h1>
      <h2>Cash: {cash}</h2>
      <div className='controls'>
        <button onClick={() => addCash(Number(prompt()))}>Add Cash</button>
        <button onClick={() => getCash(Number(prompt()))}>Get Cash</button>
        <button onClick={() => addCustomer(prompt())}>Add Customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>Add Customers from Server </button>
      </div>
      {customers.length > 0 ?
        <div className='customers'>
          {customers.map(customer =>
            <div onClick={() => removeCustomer(customer)}>{customer.name}</div>
          )}
        </div>
        :
        <div>
          <h2>No Customers</h2>
        </div>
      }
    </div>
  );
}

export default App;
