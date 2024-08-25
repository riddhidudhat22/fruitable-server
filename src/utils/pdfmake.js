const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

// Construct absolute paths to font files
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/fonts/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {
    const docDefinition = {
        content: [

            {
                image: '../../../../../fullstack project/backend/ecomerce/public/temp/1718881630478-4562380-Plums.jpg',
                width: 100,

            },
            { text: 'Invoice', style: 'header', alignment: 'center', style: 'content', margin: [40, 40, 0, 10] },

            { text: 'Name: Ridhdhi Dudhat', style: 'content', margin: [0, 10, 20, 0] },
            { text: 'Address: surat', style: 'content', margin: [0, 10, 0, 0] },
            { text: 'Email:-ridhdhidudhat@gmail.com', style: 'content', margin: [0, 10, 0, 0] },
            { text: 'phone No:- 997865423', style: 'content', margin: [0, 10, 0, 0] },
            {

                style: 'tableExample',
                table: {
                    body: [
                        ['Sr No', 'Item', 'Quanity', 'Price', 'Total Price'],
                        ['1', 'Phone', '1', '19000', '19000'],
                        ['2', 'charger', '1', '1000', '1000'],
                        [
                            { text: 'Total Amount', colSpan: 4, alignment: 'center' }, '', '', '', '20000'
                        ]
                    ],

                },
                margin: [30, 20, 20, 20],
            }
        ]

    };


    const outputPath = path.join(__dirname, '../../../../../../fullstack project/backend/ecomerce/bill1.pdf');

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;