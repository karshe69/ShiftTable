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
        try {
            await signup(email, password)
            closeSignin()
        } catch (err) {
            setError(err.code.slice(5).replaceAll("-", " "))
        }
        return
    }

    return (
        <>
            {isOpen && (
                <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-background p-4 rounded-lg w-full max-w-lg flex justify-between">
                        <div className='flex-1 flex flex-col justify-center items-center gap-2 w-full h-full'>
                            <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>{isLoggingIn ? 'Login' : 'register'}</h1>
                            {error && <div className='w-full max-w-[40ch] border-rose border text-center border-solid text-rose py-2'>{error}</div>}
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='bg-inherit outline-none focus:border-b-2 focus:border-solid focus:border-secondary p-2 w-full max-w-[40ch]'></input>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='bg-inherit outline-none p-2 w-full max-w-[40ch] focus:border-b-2 focus:border-solid focus:border-secondary' />
                            <div type="text" className='space-y-2 flex-col flex'>
                                <button onClick={submitHandler} className="transition duration-300 bg-background_pop hover:bg-bg_prim font-bold py-2 px-4 rounded">submit</button>
                                <button onClick={(e) => setIsLoggingIn(!isLoggingIn)} className="transition duration-300 bg-background_pop hover:bg-bg_prim font-bold py-2 px-4 rounded">{!isLoggingIn ? 'Login' : 'Register'}</button>
                                <button onClick={closeSignin} className="transition duration-300 bg-background_pop hover:bg-bg_prim font-bold py-2 px-4 rounded">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            <nav className="sm:p-6 p-1">
                <div className="flex justify-between items-center">
                    <a href="/" className="sm:text-2xl font-medium">Shift Table</a>
                    <div className="flex">
                        <a href="/" className="text-sm sm:text-lg mr-4">Home</a>
                        <a href="/contact" className="text-sm sm:text-lg mr-4">Contact</a>
                        {!currentUser && <button onClick={openSignin} className="text-sm sm:text-lg mr-4 font-bold rounded-full hover:bg-slate-700">login</button>}
                        {currentUser && <button onClick={logoutHandler} className="text-sm sm:text-lg mr-4 font-bold rounded-full hover:bg-slate-700">logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}