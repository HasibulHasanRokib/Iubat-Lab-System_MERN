import { useState } from "react"
import { URL } from '../App'
import Spinner from "./spinner"

const Form = () => {

    const [studentid, setStudentid] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {

        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(`${URL}/api/student/sign-in`, {
              
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentid, password }),
            })
            const data = await res.json()
            if (data.success === false) {
                setMessage(data.message)
                setLoading(false)
            } else {
                setMessage(data.message)
                setLoading(false)
            }
            setPassword("")
            setStudentid("")

        } catch (error) {
            setMessage(error.message)
            setLoading(false)
        }

    }
    return (
        <section className=' h-auto py-6 max-md:px-2 border-2 flex flex-col justify-center items-center bg-white'>
            <div className="md:flex">
                <form className='flex max-md:flex-col gap-4 md:items-end md:p-5 ' onSubmit={handleLogin}>
                    <span className='flex md:flex-col'>
                        <label className='text-sm m-1'>Student ID</label>
                        <input onChange={(e) => setStudentid(e.target.value)} value={studentid} className='border py-1 px-3 outline-slate-300 ' type="text" placeholder='Enter Your ID' />
                    </span>
                    <span className='flex md:flex-col '>
                        <label className='text-sm m-1' >Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='border py-1 px-3 outline-slate-300 ' type="password" placeholder='Enter Password' />
                    </span>
                    <button type='submit' className='bg-gray-700 p-[0.4rem]  text-white  font-semibold text-sm hover:opacity-90'>{loading ? (<Spinner />) : "Login/Logout"}</button>
                </form>
            </div>
            <h5 className='font-semibold text-xs text-orange-800 opacity-50 max-md:p-1'>Note:You have to logout when you will leave the lab. Otherwise you will be blocked.</h5>
            {message && <h3 className='font-semibold  text-xs mt-2 flex items-center justify-between text-red-500'>{message}</h3>}
        </section>
    )
}

export default Form
