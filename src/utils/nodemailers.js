const nodemailer = require("nodemailer");
const sendmailer = () => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ridhdhidudhat2003@gmail.com',
      pass: process.env.SENDEMAIL_PASSWORD
    }
  });
  const mailOption = {
    from: 'ridhdhidudhat2003@gmail.com',
    to: 'riddhidudhat223@gmail.com',// list of receivers
    subject: "send email using nodemailer and gmail ✔", // Subject line
    text: "Hello world?", // plain text body 
    attachments: [
      {   // file on disk as an attachment   
        filename: 'Document',
        path: 'E:/sql_student_bitkhanan.docx'
      },
      {   // file on disk as an attachment   
        filename: 'image',
        path: 'E:/riddhi/0db7b2ff-46c0-46f3-b022-eb74559e7ac8.jpg'
      },

      {   // file on disk as an attachment   
        filename: 'PDF',
        path: 'E:/social media.pdf'
      },

      {   // file on disk as an attachment   
        filename: 'PDF',
        path: 'E:/fullstack project/backend/ecomerce/bill1.pdf'
        
      },
    ]
  }


  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      return console.log(error);

    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
module.exports = sendmailer






















// const PdfPrinter = require('pdfmake');
// const fs = require('fs');
// const path = require('path');

// // Construct absolute paths to font files
// const fonts = {
//     Roboto: {
//         normal: path.join(__dirname, '../../public/fonts/Roboto-Regular.ttf'),
//         bold: path.join(__dirname, '../../public/fonts/Roboto-Medium.ttf'),
//         italics: path.join(__dirname, '../../public/fonts/Roboto-Italic.ttf'),
//         bolditalics: path.join(__dirname, '../../public/fonts/Roboto-MediumItalic.ttf')
//     }
// };

// const printer = new PdfPrinter(fonts);

// const exportpdfmake = () => {
//     const docDefinition = {
//         content: [
//             { text: 'Tables', style: 'header' },
//             'Name:- abc ',
//             'Address:- surat',
//             'Email:- abc@gmail.com',
//             'Phone No:- 997865423',
//             {
//                 style: 'tableExample',
//                 table: {
//                   body: [
//                       ['Sr No', 'Item', 'Quantity', 'Price', 'Total Price'],
//                       ['1', 'Phone', '1', '19000', '19000'],
//                       ['2', 'Charger', '1', '1000', '1000'],
//                       [
//                           { text: 'Total Amount', colSpan: 4 }, '', '', '', '20000'
//                       ]
//                   ]
//               }
//             }
//         ]
//     };

//     const outputPath = path.join(__dirname, '../../../../../../fullstack project/backend/ecomerce/bill1.pdf');

//     const pdfDoc = printer.createPdfKitDocument(docDefinition);
//     pdfDoc.pipe(fs.createWriteStream(outputPath));
//     pdfDoc.end();
// }

// module.exports = exportpdfmake;
