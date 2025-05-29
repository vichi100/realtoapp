export const numDifferentiation = value => {
  var val = Math.abs(value);
  if (val >= 10000000) {
    val = parseFloat((val / 10000000).toFixed(2)) + " Cr";
  } else if (val >= 100000) {
    val = parseFloat((val / 100000).toFixed(2)) + " Lac";
  } else if (val >= 1000) {
    val = parseFloat((val / 1000).toFixed(2)) + " K";
  }
  return val;
};

export const dateFormat = date => {
  // // console.log(date.slice(0, 16));
  return date.slice(0, 16).trim();
};

export const addDays = (theDate, days) => {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

// Function to format the date
export const formatIsoDateToCustomString = (isoString) => {
  // 1. Create a Date object from the ISO string
  const date = new Date(isoString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date string provided:", isoString);
    return "Invalid Date";
  }

  // 2. Get day of the week, month, day of the month, and year
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  // 3. Construct the desired string format
  return `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
};

