import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function Student() {
    let navigate = useNavigate()
    const [data, SetData] = useState([]);
    const [popup, SetPopup] = useState(false)
    const [FormData, SetFormData] = useState({
        name: "",
        email: "",
        stuAge: "",
        address: ""
    });

    const fetchData = () => {
        axios.get(`http://localhost:3000/Students`).then((res) => {
            SetData(res.data);
            console.log(res.data);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the form data for debugging.
        console.log(FormData);

        axios.post(`http://localhost:3000/Students`, FormData)
            .then(() => {
                fetchData();
                SetFormData({ name: "", email: "", stuAge: "", address: "" });
            })
            .catch((error) => {
                console.error("Error adding data:", error);
            });
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this student data?");
        if (isConfirmed) {
            axios.delete(`http://localhost:3000/Students/${id}`)
                .then(() => fetchData())
                .catch((err) => console.error("Error deleting student:", err));
        }
    };

    const handleEdit = (id) => {
        console.log("callid", id);
        window.localStorage.setItem("Id", id)
        navigate(`/edit/${id}`);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="px-5 relative w-full h-screen">
                <div className={`reg-form w-[350px] shadow-lg p-5 rounded absolute top-[-100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 z-10 duration-100 ease-in ${popup ? "activpopup" : ""}`}>
                    <RxCross1 onClick={() => SetPopup(!popup)} className='cursor-pointer absolute right-4' />
                    <form method='post' onSubmit={handleSubmit} autoComplete='off'>

                        <div className="form-group mt-2">
                            <label htmlFor="username">Student Name</label>
                            <input
                                type="text"
                                required
                                id="username"
                                className='py-1 px-2 border-none outline-none w-full mt-2'
                                name="username"
                                placeholder="Enter Student Name"
                                value={FormData.name}
                                onChange={(e) => SetFormData({ ...FormData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email">Student Email</label>
                            <input
                                type="text"
                                required
                                id="email"
                                className='py-1 px-2 border-none outline-none w-full mt-2'
                                name="email"
                                placeholder="Enter Email Id"
                                value={FormData.email}
                                onChange={(e) => SetFormData({ ...FormData, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="stuAge">Student Age</label>
                            <input
                                type="number"
                                required
                                id="stuAge"
                                className='py-1 px-2 border-none outline-none w-full mt-2'
                                name="stuAge"
                                placeholder="Student Age"
                                value={FormData.stuAge}
                                onChange={(e) => SetFormData({ ...FormData, stuAge: e.target.value })}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="address">Student Address</label>
                            <input
                                type="text"
                                id="address"
                                className='py-1 px-2 border-none outline-none w-full mt-2'
                                name="address"
                                placeholder="Student Address"
                                value={FormData.address}
                                onChange={(e) => SetFormData({ ...FormData, address: e.target.value })}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <input type="submit" className='btn btn-primary' value='Add Data' />
                        </div>
                    </form>
                </div>

                <button onClick={() => SetPopup(!popup)} className="btn btn-primary mt-5">Add</button>
                <table className='table mt-5 capitalize'>
                    <thead>
                        <tr>
                            <th className='text-xl'>Student ID</th>
                            <th className='text-xl'>Student Name</th>
                            <th className='text-xl'>Student Email</th>
                            <th className='text-xl'>Student Age</th>
                            <th className='text-xl'>Student Address</th>
                            <th className='text-xl' rowSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id || 'N/A'}</td>
                                <td>{item.name || 'N/A'}</td>
                                <td>{item.email || 'N/A'}</td>
                                <td>{item.stuAge || 'N/A'}</td>
                                <td>{item.address || 'N/A'}</td>
                                <td onClick={() => handleEdit(item.id)} className='cursor-pointer text-xl'><GrEdit /></td>
                                <td onClick={() => handleDelete(item.id)} className='cursor-pointer text-xl'><MdDeleteOutline /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
