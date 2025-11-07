
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";
import type { RowInput } from "jspdf-autotable";
import { useEffect, useState } from 'react';
import { getCompany } from '../../api';

const Invoice = ({invoice}) => {
    const [company,setCompany] = useState([])

    useEffect(() => {
        const getDet = async() => {
            const rec = await getCompany()
            setCompany(rec.data.data[0])
        }
        getDet()
    })

 const downloadInvoice = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("TAX INVOICE", doc.internal.pageSize.getWidth() / 2, 15, {
        align: "center"
    });

    // Company info
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${company.companyName}`, 14, 25);
    doc.setFont("helvetica", "normal");
    doc.text(`${company?.address?.street},`, 14, 30);
    doc.text(`${company?.address?.city}, ${company?.address?.state},`, 14, 35);
    doc.text(`${company?.address?.zipCode}, ${company?.address?.country}.`, 14, 40);
    doc.text(`${company?.phone}`, 14, 45);

    // Invoice Info
    doc.setFont("helvetica", "bold");
    doc.text(`Order No: ${invoice.orderNumber}`, 150, 25);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString('en-GB')}`, 150, 30);

    doc.text(`Bill To: ${invoice.customerName}`, 14, 55);
    doc.text(`Phone: ${invoice.customerPhone}`, 14, 60);
    doc.text(`Location: ${invoice.shippingAddress.street},`, 14, 65);
    doc.text(`${invoice.shippingAddress.city},${invoice.shippingAddress.state},`,30,70)
    doc.text(`${invoice.shippingAddress.zipCode},${invoice.shippingAddress.country}.`,30,75)

    // Table
    const tableData = invoice.items.map((item, index) => [
      index + 1,
      item.productName,
      `Rs. ${item.price}`,
      item.quantity,
      `Rs. ${item.subtotal}`
    ]);

    autoTable(doc,{
      head: [['S.No', 'ITEM', 'PRICE', 'Qty', 'Amount']],
      body: tableData as RowInput[],
      startY: 85,
      headStyles: {
        fillColor: [213, 117, 77], // #d5754d in RGB (R,G,B)
        textColor: [255, 255, 255], //white
        fontStyle: "bold"
    },
    });

    // Totals
    const discount = (doc as any).lastAutoTable.finalY + 5;
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    if(invoice.discount > 0 ){
        doc.setTextColor(0, 128, 0); //green

        doc.text(`${invoice.discount}% discount applied`, 140, discount);

        // back to black
        doc.setTextColor(0, 0, 0);
    }
    
    doc.text(`Total Amount: Rs. ${invoice.total}`, 140, finalY);
    doc.setFont("helvetica", "normal");

    // Save PDF
    doc.save(`Invoice_${invoice.orderNumber}.pdf`);
  };

  return (
    <button onClick={downloadInvoice} className='shadow-2xl font-semibold rounded-lg py-2 px-4 cursor-pointer bg-[#d5754d] text-black transition duration-300'>
      Download Invoice
    </button>
  )
}

export default Invoice