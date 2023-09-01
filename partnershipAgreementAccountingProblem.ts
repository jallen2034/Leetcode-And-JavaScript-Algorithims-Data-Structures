/*
My girlfriend encountered this accounting question in her school, and I found it intriguing as a programmer to tackle the problem by implementing a solution in code. Here's how I approached it:

Problem Statement:
The partnership agreement between J. Hansen and D. Hernandez outlines differences in service and capital contributions as follows:

1. They receive annual salary allowances of $30,000 for Hansen and $10,000 for Hernandez.
2. They are entitled to annual interest allowances of 10% of their respective beginning-year capital balances.
3. They share any remaining profit or loss equally. Both partners had a beginning-year capital balance of $50,000.

Given that the partnership made a profit of $30,000 in the first year, the question is: How much profit would be allocated to Hansen?

Approach:
I broke down the problem into code using TypeScript. Here's what I did step by step:

1. Created a function to calculate profits for an individual based on salary, interest allowance, and loss share.
2. Calculated total salary expenses for the company by summing Hansen's and Hernandez's salaries.
3. Calculated interest allowances for each partner based on their beginning-year capital and the interest rate.
4. Subtracted salary expenses and interest allowances from the company's profit, leaving the company's balance in the red.
5. Used the calculateProfitsForPerson function to determine the individual profits for Hansen and Hernandez, considering their salaries, interest allowances and share of what they owe each fromt he company being in the red.

Results:
Based on the provided example, the calculated individual profits were as follows:
- Hansen's individual result: $25,000
- Hernandez's individual result: $5,000

This experience allowed me to bridge the gap between accounting concepts and programming logic, showcasing the crossover between the two fields. It was an engaging exercise that highlighted the practical application of algorithmic thinking in a real-world scenario.
*/

// Calculate profits for an individual based on salary, interest allowance, and loss share
const calculateProfitsForPerson = (
  salary: number,
  interestAllowance: number,
  shareOfWhatCompanyLost: number
): number => {
  const positiveLoss = Math.abs(shareOfWhatCompanyLost);
  const profits = salary + interestAllowance;
  return profits - positiveLoss;
}

// Calculate total salary expenses for the company
const calculateTotalSalaryExpense = (
  hansenSalary: number,
  hernandezSalary: number
): number => {
  return hansenSalary + hernandezSalary;
}

// Calculate interest allowance for a partner
const calculateInterestAllowance = (
  beginningYearCapital: number,
  interestRate: number
): number => {
  return beginningYearCapital * (interestRate / 100);
}

// Calculate individual profits for partners in a company
const calculatePartnerResults = (
  companyProfit: number,
  hansenSalary: number,
  hernandezSalary: number,
  interestRate: number,
  hansenBeginningYearCapital: number,
  hernandezBeginningYearCapital: number
): [number, number] => {
  const companySalaryExpense: number = calculateTotalSalaryExpense(hansenSalary, hernandezSalary);
  companyProfit -= companySalaryExpense; // Company 10k in the red

  const hernandezInterestAllowance: number = calculateInterestAllowance(hernandezBeginningYearCapital, interestRate);
  const hansenInterestAllowance: number = calculateInterestAllowance(hansenBeginningYearCapital, interestRate);
  companyProfit -= hernandezInterestAllowance + hansenInterestAllowance; // Company 20k in the red

  // Calculate individual profits for Hansen and Hernandez directly
  const hansenProfit: number = calculateProfitsForPerson(hansenSalary, hansenInterestAllowance, companyProfit / 2);
  const hernandezProfit: number = calculateProfitsForPerson(hernandezSalary, hernandezInterestAllowance, companyProfit / 2);

  return [hansenProfit, hernandezProfit];
}

// Example usage
const [hansenResult, hernandezResult] = calculatePartnerResults(30000, 30000, 10000, 10, 50000, 50000);

console.log("Hansen's individual result:", hansenResult);
console.log("Hernandez's individual result:", hernandezResult);
