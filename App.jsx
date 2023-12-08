 import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
  const [length,setLength] = useState(8)
  const [number,setNumber] = useState(false) 
  const [charter,setCharter] = useState(false) 
  const [password,setPassword] = useState("") 

  // UseRef Hook
  const passwordRef = useRef(null)  

  const passwordGenrator = useCallback(() => {
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
    if(number)str += "0123456789"
    if(charter)str += "!@#$%^&*+*/-~"

    for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char)
    }
     
    setPassword(pass)

    },[length,number,charter,setPassword])
     
    const copyPasswaordToClipboard = useCallback(()=> {
      passwordRef.current?.select();
      passwordRef.current?.setselectionReang(0.999);

      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
      passwordGenrator()
    }, [length,number,charter,passwordGenrator])
  
    return (

  <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='flex shadow rounded-lg'>Password Genrator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        placeholder='password'
        value={password}
        readOnly
        ref={passwordRef}
        className='outline-none w-full py-1 px-3' />
        <button onClick={copyPasswaordToClipboard} className='outline-none bg-blue-700 text-cyan-50 px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex text-sm gap-x-1'>
          <input 
          min   = {6}
          max   = {15}
          value = {length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          type="range" />
          <label>Leanth:{length}</label>
        </div>
       
       
        <div className='flex text-sm gap-x-1'>
        <input
        defaultcheckedcke={number}
        id='numberInput'
        onChange={()=>{setNumber((prev)=>!prev); }}
        type='checkbox'/>
          <label htmlFor='numberInpuut'>Numbers</label>
        </div>
        
        
        <div className='flex text-sm gap-x-1'>
        <input
        defaultcheckedcke={charter}
        id='charterInput'
        onChange={()=>{setCharter((prev)=>!prev); }}
        type='checkbox'/>
        <label htmlFor='charterInpuut'>Charters</label>
       
        </div>
      
      </div>
    </div>
    </>
  )
}

export default App
