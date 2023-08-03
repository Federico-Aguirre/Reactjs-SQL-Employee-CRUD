/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { supabase } from "../supabaseConfig/supabaseClient";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EmployeeCard({ data, onDelete }) {

    const handleDelete = async (dataId) => {
        const { data, error } = await supabase
            .from('employeeSystem')
            .delete()
            .eq('id', dataId)
            .select()

        if (data) {
            onDelete(dataId)
        }

        if (error) {
            console.log(error)
        }
    }

    return (
        <div className="employee-card">
            <h3>{data.name}</h3>
            <p>Age: {data.age}</p>
            <p>Country: {data.country}</p>
            <p>Salary: {data.salary}</p>
            <div className="position">{data.position}</div>
            <div className="buttons"></div>
            <div className="icons">
                <Link to={'/' + data.id}>
                    <EditIcon sx={{
                        color: '#333',
                        marginLeft: '10px',
                        fontSize: '1.2em',
                        padding: '6px',
                        background: '#eee',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }}>edit</EditIcon>
                </Link>
                <DeleteIcon onClick={() => handleDelete(data.id)} sx={{
                    color: '#333',
                    marginLeft: '10px',
                    fontSize: '1.2em',
                    padding: '6px',
                    background: '#eee',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}></DeleteIcon>
            </div>
        </div >
    )
}
export default EmployeeCard