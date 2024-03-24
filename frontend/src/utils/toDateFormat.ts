const toDateFormat = (date: string): string => {
  const [formattedDate, time] = new Date(date).toLocaleString().split(', ');

  return `${formattedDate} in ${time}`;
};

export default toDateFormat;
