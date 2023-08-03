import { supabase } from "../supabaseConfig/supabaseClient";
import { useEffect, useState } from "react";
import "../css/index.css";

//components
import EmployeeCard from "../components/EmployeeCard";


const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [orderBy, setOrderBy] = useState('name')

  const handleDelete = (id) => {
    setEmployee(prevEmployee => {
      return prevEmployee.filter(employeeFilter => employeeFilter.id !== id)
    })
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase
        .from('employeeSystem')
        .select()
        .order(orderBy, { ascending: true })

      if (data) {
        setEmployee(data)
        setFetchError(null)
      }

      if (error) {
        setFetchError('Could not fetch')
        setEmployee(null)
      }
    }

    fetchEmployee()
  }, [orderBy])

  return (
    <div className="home">
      {fetchError && (<p>{fetchError}</p>)}
      {employee && (
        <div className="employees">
          <div className="order-by">
            <p>Order by: {orderBy} </p>
            <button onClick={() => setOrderBy('name')}>Name</button>
            <button onClick={() => setOrderBy('age')}>Age</button>
            <button onClick={() => setOrderBy('position')}>Position</button>
            <button onClick={() => setOrderBy('country')}>Country</button>
            <button onClick={() => setOrderBy('salary')}>Salary</button>
          </div>
          <div className="employee-flex">
            {employee.map(data => (
              <EmployeeCard key={data.id} data={data} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )
      }
    </div >
  )
}

export default Home