import { useState } from "react";
import Header from "./components/header/Header";
import InvestmentCalculator from "./components/investmentCalculator/investmentCalculator";
import Results from "./components/results/Results";

function App() {
  const [inputData, setInputData] = useState(null);

  const calculateHandler = (userInput) => {
    setInputData(userInput);
  };

  // You might not directly want to bind it to the submit event on the form though...
  const yearlyData = []; // per-year results
  if (inputData) {
    let currentSavings = +inputData["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +inputData["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +inputData["expected-return"] / 100;
    const duration = +inputData["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <InvestmentCalculator formSubmit={calculateHandler} />
      {!inputData && <p style={{ textAlign: "center" }}>No data available</p>}
      {inputData && (
        <Results
          data={yearlyData}
          initialInvestment={inputData["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
