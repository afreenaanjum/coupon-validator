const isInTimeFrame = ({ startDate, endDate }) => {
  let currentDate = Date.now();
  return currentDate >= startDate && currentDate <= endDate;
};

module.exports = { isInTimeFrame };
