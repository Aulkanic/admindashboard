export function convertToWords(number) {
    console.log(number)
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function convertChunk(chunk) {
        if (chunk === 0) {
            return '';
        }

        const chunkArr = chunk.toString().split('').map(Number);
        const [hundreds, tensUnits] = chunkArr.reverse();
        console.log(hundreds)
        console.log(tensUnits)
        console.log(chunkArr[0])
        let result = '';
        if (hundreds) {
            result += units[hundreds] + ' hundred ';
        }

        if (tensUnits === 1) {
            console.log(tens[chunkArr[0]] + ' ')
            result += teens[chunkArr[0]] + ' ';
        } else {
            result += tens[tensUnits] + ' ' + units[chunkArr[0]] + ' ';
        }
console.log(result)
        return result.trim();
    }

    const numberStr = number.toString();
    console.log(numberStr)
    const chunks = [];
    for (let i = 0; i < numberStr.length; i += 3) {
        chunks.push(parseInt(numberStr.substring(i, i + 3), 10));
    }
console.log(chunks)
    const wordsChunks = chunks.map((chunk, index) => {
        const suffix = index > 0 ? ['', 'thousand', 'million', 'billion'][index] : '';
        console.log(suffix)
        return convertChunk(chunk) + ' ' + suffix;
    });

    return wordsChunks.reverse().join(' ').trim();
  }
  