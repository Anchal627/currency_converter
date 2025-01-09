/* eslint-disable no-undef */
import { ArrowDownUp, ArrowRightLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export function Currency_Converter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/e89a901804b350dcc9e179de/latest/${fromCurrency}`
        );
        const data = response.data;
        setCurrencies(Object.keys(data.conversion_rates)); // Extract available currencies
        setExchangeRate(data.conversion_rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    if (fromCurrency && toCurrency) {
      fetchData();
    }
  }, [fromCurrency, toCurrency]);
  const handleConvert = (e) => {
    e.preventDefault();
    if (amount && exchangeRate)
      setConvertedAmount((amount * exchangeRate).toFixed(2));
  };
  const swapped = (e) => {
    e.preventDefault();
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-10 rounded-xl shadow-lg bg-white mb-9">
      <form className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-md text-md text-gray-700">
            Enter Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-3"
            placeholder="Enter amount"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-md text-md text-gray-700">From</label>
          <select
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-1 mb-3"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button className="flex flex-row justify-center text-center align-middle mx-auto mt-1">
          <ArrowDownUp size={40} className=" text-blue-600" onClick={swapped} />
        </button>
        <div className="flex flex-col">
          <label className="mb-2 font-md text-md text-gray-700">To</label>
          <select
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-1 mb-2"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <button
            className="p-3 mb-2 bg-blue-400 rounded-sm w-full hover:bg-blue-100"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
        {convertedAmount && (
          <div className="flex justify-center text-center mt-5">
            <p className=" w-full p-2 mb-2 bg-yellow-200">
              {amount} {fromCurrency}={convertedAmount} {toCurrency}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
