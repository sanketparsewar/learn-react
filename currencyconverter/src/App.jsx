import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components"; //index file by default gets called

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // inside the currencyInfo we get data of objects in format of key and value
  const currencyInfo = useCurrencyInfo(from) || {}; // Ensure currencyInfo has a default value

  const options = Object.keys(currencyInfo || {}); // Handle case where currencyInfo is undefined

  const swap = () => {
    setTo(from);
    setFrom(to);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div className="flex items-center w-screen h-screen  justify-center bg-gray-100 ">
        <div className="flex flex-col items-center gap-2 p-6 rounded-3xl shadow-2xl shadow-black-900 ">
          <h1 className=" uppercase text-2xl font-bold  text-orange-900">Currency Converter</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="flex flex-col items-center gap-2 p-3"
          >
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={(e) => setAmount(e)}
              onCurrencyChange={(e) => setFrom(e)}
              currencyOptions={options}
              selectCurrency={from}
            />

            <div>
              <button
                type="button"
                onClick={swap}
                className=" cursor-pointer px-3 py-1 rounded-xl"
              >
                <svg
                  className="w-5 h-5 active:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
                  />
                </svg>
              </button>
            </div>

            <InputBox
              label="To"
              amount={convertedAmount}
              onAmountChange={(e) => setConvertedAmount(e)}
              onCurrencyChange={(e) => setTo(e)}
              currencyOptions={options}
              selectCurrency={to}
              isReadonly={true}
            />

            <div>
              <button
                type="submit"
                className="font-bold cursor-pointer active:bg-blue-500 bg-blue-300 px-6 py-1 rounded-md"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
