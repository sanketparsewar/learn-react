import React from "react";
import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange, //currency change
  currencyOptions = [], //all the currencies
  selectCurrency = "usd", //the selected urrency
  isReadonly = false,
}) {
  const amountInputId = useId(); //this will give a unique id, use for accessing using tab

  return (
    <div className="">
      <label htmlFor={amountInputId} className="mx-2 text-slate-400">
        {label}:
      </label>
      <div>
        <input
          id={amountInputId}
          type="number"
          value={amount}
          readOnly={isReadonly}
          // here when passing the number as value it may possible that it is passsed as string so make type conversion
          onChange={(event) =>
            onAmountChange && onAmountChange(Number(event.target.value))
          } //if anyone have not passed value then it may crash
          className="focus:outline-0 px-3 py-2 border border-gray-400 rounded-xl "
          placeholder="Enter value"
        />
        <label className="mx-1">
          <select
            onChange={(event) =>
              onCurrencyChange && onCurrencyChange(event.target.value)
            } //this is string
            className="cursor-pointer focus:outline-0 px-2 hover:bg-gray-200 rounded-md py-1"
            value={selectCurrency}
          >
            {/* array of currencies */}
            {/* to get good performance in loop pass the key (key can be id,index,or unique value) */}
            {currencyOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default InputBox;
