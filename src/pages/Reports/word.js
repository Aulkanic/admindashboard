

const convertToWords = (number) => {
    const unitsMap = [
        '', 'One', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
     ];
    
     const tensMap = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
     ];
    
     const thousandsMap = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion',
        'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion',
        'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion',
        'vigintillion',
     ];
    
     let num = number.toString();
     let length = num.length;
     let words = '';
     let group;
    
     for (let i = 0; i < length; i += 3) {
        group = num.slice(i, i + 3);
    
        if (group[1] === '0' && group[2] === '0') {
          words += `${unitsMap[Number(group[0])]} `;
        } else if (group[1] === '0') {
          words += `${unitsMap[Number(group[0])]} hundred `;
          if (group[2] !== '0') {
            words += `${unitsMap[Number(group[2])]} `;
          }
        } else if (group[1] === '1') {
          words += `${unitsMap[Number(group[0])]} hundred `;
          words += `${unitsMap[Number(group[2]) + 10]} `;
        } else {
          words += `${unitsMap[Number(group[0])]} hundred `;
          words += `${tensMap[Number(group[1])]} `;
          if (group[2] !== '0') {
            words += `${unitsMap[Number(group[2])]} `;
          }
        }
       console.log(length - i)
        if (length - i >= 3) {
          words += `${thousandsMap[Math.floor((i + 3) / 3) - 1]} `;
        }
     }
    
     return words.trim();
};
export default convertToWords;