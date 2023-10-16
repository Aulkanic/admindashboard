const XLSX = require('xlsx');

export default function createExcelReport(data, title, date) {
  // Create a new workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const columnWidths = [
    { wch: 50 },  // Width for column A (assuming 20 is the desired width)
    { wch: 25 },  // Width for column B (assuming 15 is the desired width)
    { wch: 25 }, 
    { wch: 25 }, 
    { wch: 25 }, 
    { wch: 25 },
    { wch: 25 }, 
    { wch: 25 }, 
    { wch: 25 }, 
    { wch: 25 }, 
    // Add more entries for additional columns as needed
  ];

  // Set the column widths
  ws['!cols'] = columnWidths;
  // Add report title to cell A1
  const titleStyle = {
    font: { bold: true, sz: 18 }, // Bold and larger font size
    alignment: { horizontal: 'center' }, // Center-align the title
  };

  ws['A1'] = { v: title, t: 's',s: titleStyle }; // 's' indicates that it's a string

  // Add date created to cell A2
  ws['A4'] = { v: date, t: 'd' }; // 'd' indicates that it's a date

  // Style for the report title (cell A1)

  ws['A1'].s = titleStyle; // Apply the style to the cell

  // Style for the date created (cell A2)
  const dateStyle = {
    font: { bold: true, sz: 12 }, // Bold and regular font size
    alignment: { horizontal: 'center' }, // Right-align the date
  };
  ws['A4'].s = dateStyle; // Apply the style to the cell

  ws['!rows'] = ws['!rows'] || [];
  ws['!rows'][1] = { hpt: 20 };

  for (let i = 4; i < data.length + 4; i++) {
    ws[`A${i}`] = { t: 's' }; // 's' indicates that it's a string
    const dataStyle = {
      alignment: { horizontal: 'left' }, // Left-align the data
    };
    ws[`A${i}`].s = dataStyle; // Apply the style to the cell
  }

  // Save or export the Excel file
  XLSX.writeFile(wb, 'exported-report.xlsx');
}