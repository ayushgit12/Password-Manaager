import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


function Manager() {
     const ref = useRef();
     const [form, setform] = useState({ "site": '', "username": '', "password": '' })
     const [passwordArray, setPasswordArray] = useState([])

     const getPasswords = async () => {
          let req = await fetch('http://localhost:3000/')
          let passwords = await req.json()
          setPasswordArray(passwords)


     }

     useEffect(() => {
          getPasswords()



     }, [])


     const handleChange = (e) => {
          setform({ ...form, [e.target.name]: e.target.value })
     }
     const showPassword = (e) => {
          let input = e.target.previousSibling;
          if (input.type === 'password') {
               ref.current.src = "src/assets/hide.png"
               input.type = 'text'
          } else {
               ref.current.src = "src/assets/show.png"
               input.type = 'password'
          }
     }

     const copyText = (e) => {

          navigator.clipboard.writeText(e)
          toast('Password Copied Successfully!', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          });
     }


     const savePassword = async () => {
          if (form.site !== '' && form.password !== '') {
               
               await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: form.id }) })
               
               setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
               await fetch('http://localhost:3000/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: uuidv4() }) })
               // localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
               setform({ "site": '', "username": '', "password": '' })
               toast('Password Saved Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               });
          }
          else {
               toast('Please enter all the fields!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               });

          }
     }
     const deletePassword = async (id) => {
          let c = confirm('Are you sure you want to delete this password?')
          if (!c) {
               return
          }
          setPasswordArray(passwordArray.filter((password) => password.id !== id))
          let res = await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
          // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((password) => password.id !== id)))
          toast('Password Deleted Successfully!', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          });


     }

     const editPassword = (id) => {
          setform({...passwordArray.filter((password) => password.id === id)[0], id: id})
          setPasswordArray(passwordArray.filter((password) => password.id !== id))
          localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((password) => password.id !== id)))


     }





     return (
          <>
               <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition="Bounce"
               />
               {/* Same as */}
               <ToastContainer />
               <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
               <div className='mx-auto px-2 md:px-0 md:mycontainer text-center min-h-[90vh]'>

                    <h1 className='text-4xl'><div className="logo font-bold text-2xl">
                         <span className='text-purple-600'>&lt;</span>Pass<span className='text-purple-600'>OP / &gt;</span>
                    </div></h1>
                    <p className='text-lg text-purple-600'>Your own Password Manager</p>


                    <div className="p-4 flex flex-col gap-8 text-black">
                         <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" name="site" className='webURL border px-4 py-1 border-purple-400 rounded-full' id="" />
                         <div className="flex w-full justify-between gap-8 flex-col md:flex-row">
                              <input value={form.username} onChange={handleChange} type="text" placeholder='Enter UserName' className='webUN border px-4 py-1 w-full border-purple-400 rounded-full' name="username" id="" />
                              <div className='relative'>
                                   <input value={form.password} type="password" placeholder='Enter Password' onChange={handleChange} className='webPW border px-4 py-1 w-full border-purple-400 rounded-full' name='password' id='' />
                                   <img ref={ref} onClick={showPassword} className='absolute right-[5px] cursor-pointer top-[5px]' width={'25px'} src="src/assets/show.png" alt="eye" />
                              </div>
                         </div>

                         <button onClick={savePassword} className='bg-purple-500 border border-purple-950 gap-2 text-black hover:bg-purple-400 w-fit px-6 py-2 rounded-full flex items-center mx-auto'><lord-icon
                              src="https://cdn.lordicon.com/jgnvfzqg.json"
                              trigger="hover">
                         </lord-icon>Save Password</button>



                    </div>


                    <div className="passwords">

                         <h2 className='text-3xl font-bold pb-5 pt-10'>YOUR SAVED PASSWORDS</h2>
                         {passwordArray.length === 0 && <div className='text-2xl text-purple-600'>No Passwords Saved</div>}
                         {passwordArray.length > 0 &&

                              <table className="table-fixed w-full rounded-md overflow-hidden">
                                   <thead className='bg-purple-600 text-white'>
                                        <tr>
                                             <th className='py-1'>Site</th>
                                             <th className='py-1'>Username</th>
                                             <th className='py-1'>Password</th>
                                             <th className='py-1'>Actions</th>
                                        </tr>
                                   </thead>

                                   <tbody className='bg-purple-100'>
                                        {passwordArray.map((password, index) => {

                                             return <tr key={index}>
                                                  <td className='py-2 border border-purple-50'><a href={password.site} target='_blank'>{password.site}</a></td>
                                                  <td className='py-2 border border-purple-50'>{password.username}</td>
                                                  <td className='py-2 border border-purple-50 flex gap-2 justify-center items-center'>{password.password}
                                                       <div className="cursor-pointer flex items-center" onClick={() => copyText(password.password)}><lord-icon style={{ "width": "20px", "height": "20px" }}
                                                            src="https://cdn.lordicon.com/oiiqgosg.json"
                                                            trigger="hover">
                                                       </lord-icon>
                                                       </div>
                                                  </td>
                                                  <td className='py-2 border border-purple-50'>
                                                       <div className='flex gap-3 justify-center'>
                                                            <span className='cursor-pointer' onClick={() => deletePassword(password.id)}><lord-icon
                                                                 src="https://cdn.lordicon.com/skkahier.json"
                                                                 trigger="hover">
                                                            </lord-icon></span>
                                                            <span className='cursor-pointer' onClick={() => { editPassword(password.id) }}><lord-icon
                                                                 src="https://cdn.lordicon.com/wkvacbiw.json"
                                                                 trigger="hover">
                                                            </lord-icon></span>
                                                       </div>
                                                  </td>
                                             </tr>

                                        })}
                                   </tbody>
                              </table>}

                    </div>
               </div>
          </>
     )
}

export default Manager
