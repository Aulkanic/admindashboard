// PDFUtils.js
import jsPDF from 'jspdf';
import ReactDOMServer from "react-dom/server";

export function generatePDF(content, fileName) {
    let element = content
    const doc = new jsPDF("p", "pt", "letter");
    // Add content to the PDF
    doc.html(ReactDOMServer.renderToString(element), {
        callback: function (pdf) {
            // Save the PDF with the specified file name
            pdf.save(fileName);
        }
    });
}
