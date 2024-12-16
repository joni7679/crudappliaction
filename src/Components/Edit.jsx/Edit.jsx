import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Edit() {
    const [student, setStudent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/Students/ecc7`).then((res) => {
            console.log(res.data);
            setStudent(res.data);
        }).catch((error) => {
            console.log("error", error);
        });
    }, [id]);

    const UpdateDetails = (e) => {
        e.preventDefault();

  

        let data = {
            name: student.name,
            email: student.email,
            stuAge: student.stuAge,
            address: student.address
        };

        axios.put(`http://localhost:3000/Students/ecc7`, data).then((res) => {
            console.log(res.data);
            alert("Student Details Updated Successfully");
            setStudent(res.data);
        }).catch((error) => {
            console.log("error", error);
        });
    };

    return (
        <div className="px-5 w-full h-screen flex items-center justify-center flex-col">
            <Link to={`/`}>
                <button className='btn btn-primary mt-5'>Back To Data</button>
            </Link>
            <div className="reg-form w-[350px] shadow-lg p-5 rounded">
                <form onSubmit={UpdateDetails} method='post'>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Student Name</label>
                        <input
                            type="text"
                            id="name"
                            className='py-1 px-2 border-none outline-none w-full mt-2'
                            name="name"
                            placeholder="Enter Student Name"
                            value={student.name || ''}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="email">Student Email</label>
                        <input
                            type="email"
                            id="email"
                            className='py-1 px-2 border-none outline-none w-full mt-2'
                            name="email"
                            placeholder="Enter Email Id"
                            value={student.email || ''}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="age">Student Age</label>
                        <input
                            type="text"
                            id="age"
                            className='py-1 px-2 border-none outline-none w-full mt-2'
                            name="age"
                            placeholder="Student Age"
                            value={student.stuAge || ''}
                            onChange={(e) => setStudent({ ...student, stuAge: e.target.value })}
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
                            value={student.address || ''}
                            onChange={(e) => setStudent({ ...student, address: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" className='btn btn-primary' value='Update' />
                    </div>
                </form>
            </div>
        </div>
    );
}
