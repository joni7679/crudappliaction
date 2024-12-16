import React from 'react'
import { Link } from 'react-router-dom'

export default function Edit() {
    return (
        <>
            <div className="px-5">

                <Link to={`/`}> <button className='btn btn-primary mt-5'>Data</button> </Link>
                <div className="reg-form w-[350px]  shadow-lg p-5 rounded">
                    <form action="">

                        <div className="form-group mt-2">
                            <label className='' for="name">Student Name</label>
                            <input type="text" id="name" className='py-1 px-2 border-none outline-none w-full mt-2' name="name" placeholder="Enter Student Name" />
                        </div>
                        <div className="form-group mt-2">
                            <label className='' for="name">Student Email</label>
                            <input type="text" id="name" className='py-1 px-2 border-none outline-none w-full mt-2' name="name" placeholder="Enter Email Id" />
                        </div>


                        <div className="form-group mt-2">
                            <label className='' for="name">Student Age</label>
                            <input type="text" id="name" className='py-1 px-2 border-none outline-none w-full mt-2' name="name" placeholder="Student Age" />
                        </div>

                        <div className="form-group mt-2">
                            <label className='' for="name">Student Address</label>
                            <input type="text" id="name" className='py-1 px-2 border-none outline-none w-full mt-2' name="name" placeholder="Student Address" />
                        </div>

                        <div className="form-group mt-2">

                            <input type="submit" className='btn btn-primary' value='Update' />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
