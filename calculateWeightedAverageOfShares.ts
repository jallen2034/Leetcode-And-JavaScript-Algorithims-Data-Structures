/* My friend was stuck on their accounting homework and decided to help them figure out how to calculate the weighted average number of shares 
 * https://www.investopedia.com/ask/answers/12/weighted-average-shares-basic-weight-shares.asp#:~:text=The%20weighted%20average%20number%20of,number%20applies%20for%20each%20period */

// Define a type for an individual change
type Change = {
  month: string;
  change: number;
};

// Define a type for the month mappings
type MonthMappings = {
  [key: string]: number;
};

// Define a type for the array of changes
type ChangesArray = Change[];

const monthMappings: MonthMappings = {
  'January': 1,    // January
  'February': 2,   // January to February
  'March': 3,      // January to March
  'April': 4,      // January to April
  'May': 5,        // January to May
  'June': 6,       // January to June
  'July': 7,       // January to July
  'August': 8,     // January to August
  'September': 9,  // January to September
  'October': 10,   // January to October
  'November': 11,  // January to November
  'December': 12,  // January to December
};

// The companies profit for the year
const profit: number = 880000;

// Data to indicate when there are additional shares added or retired
const changes: ChangesArray = [
  { month: 'January', change: 0 },
  { month: 'April', change: 40000 },
  { month: 'November', change: -30000 },
];

const sharesOutstanding: number = 500000; // Initial shares outstanding
const preferredDividends: number = 250000;

const calculateMonthsLeftInYear = (
  currentMonth: number
) => {
  const monthsInYear = 12;
  return monthsInYear - currentMonth + 1; // +1 to include the current month
}

const calculateFractionOfYearOutstanding = (
  changes: ChangesArray,
  i,
): number => {
  if (i < 0 || i >= changes.length) {
    return 0; // Default value if i is out of range
  }

  const currentMonth: number = monthMappings[changes[i].month];

  if (i === changes.length - 1) {
    return calculateMonthsLeftInYear(currentMonth) / 12;
  }

  const monthOfNextStockChange: number = monthMappings[changes[i + 1].month];

  // Months that passed between the current month and month of the next stock change
  if (currentMonth !== undefined && monthOfNextStockChange !== undefined) {
    const monthsBetween: number = monthOfNextStockChange - currentMonth;
    return monthsBetween / 12; // Calculate fractionOfYearOutstanding
  }

  return 0; // Default value if no valid months are found
}

const calculateEndShares = (
  changes: ChangesArray,
  i: number,
  startShares: number,
): number => {
  let endShares = startShares;

  const currentChange = changes[i];

  if (currentChange && monthMappings[currentChange.month]) {
    endShares += currentChange.change;
  }

  return endShares;
}

const calculateWeightedAverageShare = (
  changes: ChangesArray,
  sharesOutstanding: number
) => {
  let weightedAverageSum: number = 0; // Initialize the sum of the weighted share

  for (let i = 0; i < changes.length; i++) {
    const startShares: number = sharesOutstanding;

    // Calculate fraction of year Outstanding
    const startFraction: number = calculateFractionOfYearOutstanding(changes, i);

    // Calculate Month changes happened and endShares
    const endShares: number = calculateEndShares(changes, i, startShares);

    // Update weightedAverageSum and sharesOutstanding
    weightedAverageSum += endShares * startFraction;
    sharesOutstanding = endShares;
  }

  return weightedAverageSum;
}

const calculateEarningsPerShare = (
  changes: ChangesArray,
  sharesOutstanding: number,
  profit: number,
  preferredDividends: number
): number => {
  const earnings: number = profit - preferredDividends; // Overall company earnings = profit - preferredDividends
  const weightedAverageCommonShares: number = calculateWeightedAverageShare(changes, sharesOutstanding);
  return earnings / weightedAverageCommonShares;
}

// Calculate earnings per share
const earningsPerShare: number = calculateEarningsPerShare(
  changes,
  sharesOutstanding,
  profit,
  preferredDividends
);

console.log(earningsPerShare);
