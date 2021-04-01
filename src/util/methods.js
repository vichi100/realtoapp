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
  // console.log(date.slice(0, 16));
  return date.slice(0, 16).trim();
};

export const addDays = (theDate, days) => {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

