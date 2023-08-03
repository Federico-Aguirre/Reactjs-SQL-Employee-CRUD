import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../supabaseConfig/supabaseClient"

const Update = () => {
  const { id } = useParams()//importing the "id" from App
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  const [salary, setSalary] = useState('')

  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !age || !position || !country || !salary) {
      setFormError('Please fill in all the fields correctly')
      return
    }

    const { data, error } = await supabase
      .from('employeeSystem')
      .update({ name, age, position, country, salary })
      .eq('id', id)
      .select()

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly')
      return
    }

    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase
        .from('employeeSystem')
        .select()
        .eq('id', id) //this is supabase command that let you grab a value called like to the first parameter with a value equal to the second parameter
        .single() //supabase commmand that let you grab a single value
      if (error) {
        navigate('/', { replace: true }) //with replace true you replace the url value with the one written on this line: '/'
      }
      if (data) {
        setName(data.name)
        setAge(data.age)
        setPosition(data.position)
        setCountry(data.country)
        setSalary(data.salary)
      }
    }

    fetchEmployee()
  }, [id, navigate])

  return (
    <div className="update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button>Update employee Card</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update