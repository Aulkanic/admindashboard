const currencyFormat = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    return formatter.format(num);
};

export default currencyFormat