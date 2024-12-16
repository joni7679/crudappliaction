import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";

export default function Student() {
    const [data, SetData] = useState([]);
    const [popup, SetPopup] = useState(false)
    const [FormData, SetFormData] = useState({
        name: "",
        email: "",
        stuAge: "",
        adderss: ""
    });

    const fatchData = () => {
        axios.get(`http://localhost:3000/StudentsName`).then((res) => {
            res.data
            SetData(res.data)
            console.log(res.data);

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the form data for debugging.
        console.log(FormData);

        axios.post(`http://localhost:3000/StudentsName`, FormData)
            .then(() => {
                fatchData();
                // SetPopup(false)
                SetFormData({ name: "", email: "", stuAge: "", adderss: "" });
            })
            .catch((error) => {
                console.error("Error adding data:", error);
            });
    };
    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this student Data?");
        if (isConfirmed) {
            axios.delete(`http://localhost:3000/StudentsName/${id}`).then(() => fatchData()).catch((err) => console.error("Error deleting student:", err));
        }
    };




    useEffect(() => {
        fatchData();
    }, [])



    return (
        <>
            <div className="px-5 relative w-full h-screen ">
                <div className={`reg-form w-[350px]  shadow-lg p-5 rounded absolute top-[-100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gray-700 z-10 duration-100	 ease-in ${popup ? "activpopup" : ""}`}>
                    <RxCross1 onClick={() => SetPopup(!popup)} className='cursor-pointer absolute right-4' />
                    <form method='post' onSubmit={handleSubmit} autoComplete='off'>

                        <div className="form-group mt-2">
                            <label className='' for="username">Student Name</label>
                            <input type="text"  required id="username" className='py-1 px-2 border-none outline-none w-full mt-2' name="username" placeholder="Enter Student Name" value={FormData.name} onChange={(e) => SetFormData({ ...FormData, name: e.target.value })} />
                        </div>
                        <div className="form-group mt-2">
                            <label className='' for="username">Student Email</label>
                            <input type="text" required  id="email" className='py-1 px-2 border-none outline-none w-full mt-2' name="email" placeholder="Enter Email Id" value={FormData.email} onChange={(e) => SetFormData({ ...FormData, email: e.target.value })} />
                        </div>

                        <div className="form-group mt-2">
                            <label className='' for="stuAge">Student Age</label>
                            <input type="number"  required id="name" className='py-1 px-2 border-none outline-none w-full mt-2' name="stuAge" placeholder="Student Age" value={FormData.stuAge} onChange={(e) => SetFormData({ ...FormData, stuAge: e.target.value })} />
                        </div>

                        <div className="form-group mt-2">
                            <label className='' for="adderss">Student Address</label>
                            <input type="text" id="adderss" className='py-1 px-2 border-none outline-none w-full mt-2' name="adderss" placeholder="Student Address" value={FormData.adderss} onChange={(e) => SetFormData({ ...FormData, adderss: e.target.value })} />
                        </div>

                        <div className="form-group mt-2">

                            <input type="submit" className='btn btn-primary' value='Add Data' />
                        </div>
                    </form>
                </div>

                <button onClick={() => SetPopup(!popup)} className="btn btn-primary mt-5">  Add </button>
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

                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id ? item.id : 'N/A'}</td>
                                        <td>{item.name ? item.name : 'N/A'}</td>
                                        <td>{item.email ? item.email : 'N/A'}</td>
                                        <td>{item.stuAge ? item.stuAge : 'N/A'}</td>
                                        <td>{item.adderss ? item.adderss : 'N/A'}</td>
                                        <td onClick={() => alert(`You clicked on index: ${index}`)} className='cursor-pointer text-xl'><GrEdit /></td>
                                        <td onClick={() => handleDelete(item.id)} className='cursor-pointer text-xl'><MdDeleteOutline /></td>
                                    </tr>
                                )
                            }
                            )}

                    </tbody>

                </table>
            </div >
        </>
    )
}
