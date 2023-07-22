'use client'

import { useAuth } from '../context/AuthContext'
import React, { useState } from 'react'

export default function NavBar() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    const { login, signup, logout } = useAuth()
    let { currentUser } = useAuth()

    const [isOpen, setIsOpen] = useState(false);

    const openSignin = () => {
        setIsOpen(true);
    };

    const closeSignin = () => {
        setIsOpen(false);
    };

    async function logoutHandler() {
        logout()
    }

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        if (isLoggingIn) {
            try {
                await login(email, password)
                closeSignin()
            } catch (err) {
                setError('Incorrect email or password')
            }
            return
        }
        await signup(email, password)
        closeSignin()
    }

    return (
        <>
            {isOpen && (
                <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-lg">
                        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
                            <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>{isLoggingIn ? 'Login' : 'register'}</h1>
                            {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300' />
                            <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">submit</button>
                            <h2 className='duration-300 hover:scale-110 cursor-pointer' onClick={() => setIsLoggingIn(!isLoggingIn)}>{!isLoggingIn ? 'Login' : 'Register'}</h2>
                            <button onClick={closeSignin} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <nav className="bg-gray-800 p-6">
                <div className="flex justify-between items-center">
                    <a href="/" className="text-white text-2xl font-medium">Shift Table</a>
                    <div className="flex">
                        <a href="/" className="text-white text-lg mr-4">Home</a>
                        <a href="/contact" className="text-white text-lg mr-4">Contact</a>
                        {!currentUser && <button onClick={openSignin} className="text-white text-lg mr-4 font-bold rounded-full hover:bg-slate-700">login</button>}
                        {currentUser && <button onClick={logoutHandler} className="text-white text-lg mr-4 font-bold rounded-full hover:bg-slate-700">logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}