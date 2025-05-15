import {useState} from 'react'
import Card from './components/card'
function App() {

  // by writing this my counter value is updated but its not reflected in the UI
  // const addValue=()=>{
  //   counter=counter+1
  //   console.log(counter)
  // }
  // let counter=15

  // we have to use the useState hook to update the state/variable value in the UI
  // the initial value of counter is the value written in useState(10)
  let [counter,setCounter]=useState(1)

  // this still increments for single time
  // Because in react state updates in batches, especially during event handlers, it doesn't apply each update immediately. Instead, it sees five identical updates (counter + 1 from the same value) and effectively processes just one update.
  // const addValue=()=>{
  //   setCounter(counter+1)
  //   setCounter(counter+1)
  //   setCounter(counter+1)
  //   setCounter(counter+1)
  //   setCounter(counter+1)
  // }

  // this will increment the counter 4 times
  // setCounter has callback function that takes prev value and then update it
  const add4Value=()=>{
    if(counter>=20) return setMsg(`Max ${counter}`)
      setCounter(prevCounter=>prevCounter+1)
    setCounter(prevCounter=>prevCounter+1)
    setCounter(prevCounter=>prevCounter+1)
    setCounter(prevCounter=>prevCounter+1)
    setMsg('')
    }


  let [msg,setMsg]=useState('');
  const addValue=()=>{
    if(counter>=20) return setMsg(`Max ${counter}`)
    setCounter(counter+1) 
    setMsg('')
  }
  const reduceValue=()=>{
    if(counter<=0) return setMsg('Min 0')
    setCounter(counter-1)
    setMsg('')
  }


  return (
    <>
    <div className='flex flex-col items-center gap-2 text-center ' >
      <div className=''>
        <h1 className='text-xl'>Counter {counter}</h1>
          <button type="button"  className='mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer' onClick={add4Value}>Add 4 Value</button>
          <button type="button"  className='mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer' onClick={addValue}>Add Value</button>
          <button type="button"  className='mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer' onClick={reduceValue} >Reduce Value</button>
        <p className='text-red-600'>{msg}</p>
      </div>
      {/* what ever we pass here is consider as props for this component */}
        <Card name='sanket' city='Pune' state="MH"   />

    </div>

   
    </>

  )
}

export default App
