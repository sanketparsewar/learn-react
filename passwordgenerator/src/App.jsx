import { useState, useCallback,  useEffect,useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);

  // creating the refrence of password field
  const passwordRef= useRef(password)

  const isNumber = () => {
    setNumber(!number);
  };
  const isCharacters = () => {
    setCharacters(!characters);
  };

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) str += "0123456789";
    if (characters) str += "!@#$%&{}[]()*";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, characters,setPassword]);


  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()   //this will select the password (highlight the text to blue)
    window.navigator.clipboard.writeText(password)
  },[password])

  // run after render, if any one of the given dependency gets change then the useEffect gets run
  // we cannot give password as dependency because generatePassword() function get call and we get
  // updated password then, as we get updated password the useEffect again gets run so this stuck in loop
  useEffect(() => {
    generatePassword();
  }, [length, number, characters]);

  return (
    <>
      <div className="flex justify-center w-full  ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl">Password generator</h1>
          <div>
            <input
              type="text"
              value={password}
              ref={passwordRef}
              readOnly
              className="border-1 px-2 py-1 focus:outline-0 rounded-2xl"
            />
           
            <button onClick={copyPassword} className="cursor-pointer active:bg-blue-400 mx-1 px-2 py-1 bg-amber-300 border rounded-2xl">
              Copy
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            <div className="flex items-center">
              <input
                type="range"
                onChange={(event) => setLength(event.target.value)}
                min={6}
                max={25}
                value={length}
                className="cursor-pointer"
              />
              <label htmlFor="length">
                <span className="text-blue-800 ">({length})</span> Length{" "}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="number"
                onChange={isNumber}
                checked={number}
                className="cursor-pointer"
              />
              <label htmlFor="number" className="cursor-pointer">
                Number{" "}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={isCharacters}
                checked={characters}
                id="characters"
                className="cursor-pointer"
              />
              <label htmlFor="characters" className="cursor-pointer">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
