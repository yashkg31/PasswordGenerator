import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(num) str+="0123456789"
    if(char) str+="!@#$%^&*_-+=,./?"

    for(let i=1; i<=length; i++){
      let x = Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(x)
    }

    setPass(pass)
  }, [length, num, char, setPass])

  useEffect(() => {
    passGenerator()
  }, [length, num, char, passGenerator])

  const passRef = useRef(null)

  const copyPass = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  }, [pass])

  return (
    <>
      <h1 className=" py-4 text-4xl text-center text-white">
        Password Generator
      </h1>
      <div className=" w-full max-w-md mx-auto
      shadow-md rounded-lg py-6 px-3 my-8 text-yellow-400
      bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden
        mb-4">
          <input type="text"
          value={pass}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="Password"
          readOnly
          ref={passRef}>
          </input>

          <button
          onClick={copyPass}
          className="outline-none bg-green-700 text-white
          px-3 py-0.5 shrink-0 ">
            Copy
          </button>
        </div>
        <div className=" flex text-sm gap-x-2">
          <div className=" flex items-center gap-x-1">
            <input type="range"
            min={6}
            max={100}
            value={length}
            className=" cursor-pointer"
            onChange={(e) => (setLength(e.target.value))}>
            </input>

            <label>
              Length: {length}
            </label>
          </div>

          <div className=" flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={num}
            id="numInput"
            onChange={() => {
              setNum((prev) => !prev);
            }}>
            </input>
            <label htmlFor="numInput">Numbers</label>

            <input
            type="checkbox"
            defaultChecked={char}
            id="charInput"
            onChange={() => {
              setChar((prev) => !prev);
            }}>
            </input>
            <label htmlFor="charInput">Charaters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
