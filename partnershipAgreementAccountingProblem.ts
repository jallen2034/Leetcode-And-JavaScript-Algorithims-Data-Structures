/*
  My friend encountered this accounting question in her school, and I found it intriguing as a programmer to tackle the problem by implementing a solution in code. Here's how I approached it:

  Problem Statement:
  The partnership agreement between J. Hansen and D. Hernandez outlines differences in service and capital contributions as follows:

  1. They receive annual salary allowances of $30,000 for Hansen and $10,000 for Hernandez.
  2. They are entitled to annual interest allowances of 10% of their respective beginning-year capital balances.
  3. They share any remaining profit or loss equally. Both partners had a beginning-year capital balance of $50,000.

  Given that the partnership made a profit of $30,000 in the first year, the question is: How much profit would be allocated to Hansen?

  Approach:
  I broke down the problem into code using TypeScript. Here's what I did step by step:

  1. Created a function to calculate profits for an individual based on salary, interest allowance, and their share of the losses in the company.
  2. Calculated total salary expenses for the company by summing Hansen's and Hernandez's salaries.
  3. Calculated interest allowances for each partner based on their beginning-year capital and the interest rate.
  4. Subtracted salary expenses and interest allowances from the company's profit, leaving the company's balance 20k in the red.
  5. Used the calculateProfitsForPerson function to determine the individual profits for Hansen and Hernandez, considering their salaries, interest allowances 
  and share of what they owe each from the company being in the red.

  Results:
  Based on the provided example, the calculated individual profits were as follows:
  - Hansen's individual result: $25,000
  - Hernandez's individual result: $5,000

  This experience allowed me to bridge the gap between accounting concepts and programming logic, showcasing the crossover between the two fields. 
  It was an engaging exercise that highlighted the practical application of algorithmic thinking in a real-world scenario.
*/

// Type for partners in company
type Partner = {
  name: string,
  salary: number,
  interestRate: number,
  beginningYearCapital: number,
  interestAllowance: number,
  companyProfit: number,
  individualProfit: number
};

// Calculate profits for an individual based on salary, interest allowance, and loss share
const calculateProfitsForPerson = (
  partner: Partner,
  shareOfWhatCompanyLost: number
) => {
  try {
    const positiveLoss: number = Math.abs(shareOfWhatCompanyLost);
    const profits: number = partner.salary + partner.interestAllowance;
    partner.individualProfit = profits - positiveLoss;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
}

// Calculate total salary expenses for the company
const calculateTotalSalaryExpense = (
  partner1: Partner,
  partner2: Partner
): number => {
  try {
    if (partner1 && partner2) {
      return partner1.salary + partner2.salary;
    }
    return 0;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
}

// Calculate interest allowance for a partner
const calculateIndividualInterestAllowance = (
  partner: Partner
) => {
  try {
    partner.interestAllowance = (partner.beginningYearCapital * partner.interestRate) / 100;
  } catch (e: any) {
    console.error(e);
    throw e;
  }
}

const calculateToalInterestAllowanceForAllPartners = (
  partner1: Partner,
  partner2: Partner
): any => {
  try {
    if (partner1 && partner2) {
      return partner1.interestAllowance + partner2.interestAllowance;
    }
    return 0;
  } catch (e: any) {
    console.log(e);
  }
}

// Calculate individual profits for partners in a company
const calculatePartnerResults = (
  partners: Partner[]
) => {
  try {
    let companySalaryExpense: number = 0; // Total salary expense for the company
    let companyProfit: number = partners[0].companyProfit;
    let totalPartnersInterestAllowance: number = 0;
  
    // Calculate the salary expenses for all employees
    for (let i = 0; i < partners.length; i++) {
      companySalaryExpense += calculateTotalSalaryExpense(partners[i], partners[i + 1])
    }
  
    // Calculate individual interest allowence for all partners
    for (let partner of partners) {
      calculateIndividualInterestAllowance(partner);
    }
  
    companyProfit -= companySalaryExpense; // Company 10k in the red
  
    for (let i = 0; i < partners.length; i++) {
      totalPartnersInterestAllowance += calculateToalInterestAllowanceForAllPartners(partners[i], partners[i + 1]);
    }
  
    companyProfit -= totalPartnersInterestAllowance; // Company 20k in the red
  
    // Calculate individual profits for Hansen and Hernandez directly
    for (let partner of partners) {
      calculateProfitsForPerson(partner, companyProfit / 2);
    }
  } catch (e: any) {
    console.error(e);
    throw e;
  }
}

const beginningYearCapital: number = 50000;

// Test data to use
const partners: Partner[] = [
  {
    name: 'Hansen',
    salary: 30000,
    interestRate: 10,
    beginningYearCapital: beginningYearCapital,
    interestAllowance: 0,
    companyProfit: 30000,
    individualProfit: 0
  },
  { 
    name: 'Hernandez',
    salary: 10000,
    interestRate: 10,
    beginningYearCapital: beginningYearCapital,
    interestAllowance: 0,
    companyProfit: 30000,
    individualProfit: 0
  }
];

// Example usage
console.log("\n");
console.log("Partners before calculation: ", partners);
calculatePartnerResults(partners);
console.log("\n");
console.log("Partners after calculation: ", partners);
