import Test from "./test"


function App() {
  const userName='Sanket'
  return (
    <>
    <Test/>
    {/* here {userName} is an evaluated expresssion, means variable injection */}
    {/* here in {} we cannot write any js expression eg.if */}
    <h1>Hello {userName} </h1>  
    </>
  )
}

export default App
