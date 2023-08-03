import { supabase } from "../supabaseConfig/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Create = () => {
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
      .insert([{ name, age, position, country, salary }])
      .select()

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly')
    }

    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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

        <button>Create employee Card</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create