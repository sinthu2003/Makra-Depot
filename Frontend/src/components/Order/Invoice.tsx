// components/Invoice.tsx
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import type { RowInput } from "jspdf-autotable";
import { useEffect, useState, useRef } from 'react';
import { getCompany } from '../../api';
import { RiDownload2Line } from 'react-icons/ri';
import QrCodeGenerator from './QrCodeGenerator';

interface InvoiceProps {
  invoice: {
    orderNumber: string;
    createdAt: string;
    customerName: string;
    customerPhone: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    items: Array<{
      productName: string;
      price: number;
      quantity: number;
      subtotal: number;
    }>;
    discount: number;
    total: number;
  };
}

interface Company {
  companyName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
}

const Invoice = ({ invoice }: InvoiceProps) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const qrCodeGenerated = useRef(false);

  useEffect(() => {
    const getDet = async () => {
      try {
        const rec = await getCompany();
        setCompany(rec.data.data[0]);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    getDet();
  }, []);

  // Generate GPay URL
  const gpayUrl = company ? 
  `upi://pay?pa=9894383645@upi&pn=${encodeURIComponent(company.companyName)}&am=${invoice.total}&cu=INR&tn=Invoice${invoice.orderNumber}` : 
  '';

  const handleQrCodeLoad = (dataUrl: string) => {
    setQrCodeDataUrl(dataUrl);
    qrCodeGenerated.current = true;
  };

  const downloadInvoice = async () => {
    if (!company) {
      alert('Company details not loaded yet');
      return;
    }

    setIsGeneratingPdf(true);

    try {
      // Wait a bit for QR code to generate if needed
      if (!qrCodeGenerated.current) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

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
      doc.text(`${company.address.street},`, 14, 30);
      doc.text(`${company.address.city}, ${company.address.state},`, 14, 35);
      doc.text(`${company.address.zipCode}, ${company.address.country}.`, 14, 40);
      doc.text(`${company.phone}`, 14, 45);

      // Invoice Info
      doc.setFont("helvetica", "bold");
      doc.text(`Order No: ${invoice.orderNumber}`, 150, 25);
      doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString('en-GB')}`, 150, 30);

      // Bill To section on left
      doc.text(`Bill To: ${invoice.customerName}`, 14, 55);
      doc.text(`Phone: ${invoice.customerPhone}`, 14, 60);
      doc.text(`Location: ${invoice.shippingAddress.street},`, 14, 65);
      doc.text(`${invoice.shippingAddress.city}, ${invoice.shippingAddress.state},`, 30, 70);
      doc.text(`${invoice.shippingAddress.zipCode}, ${invoice.shippingAddress.country}.`, 30, 75);

      if (qrCodeDataUrl) {
        // Add QR code to PDF
        doc.addImage(qrCodeDataUrl, 'PNG', 140, 50, 40, 40);
      } else {
        // Fallback placeholder
        doc.setDrawColor(0, 0, 0);
        doc.rect(140, 50, 40, 40);
        doc.text("QR Code", 150, 82);
        doc.setFontSize(8);
        doc.text("Generating...", 145, 87);
      }

      // Add QR code text instructions
      doc.setFontSize(8);
      doc.text("Scan with GPay app", 140, 95);
      doc.text(`to pay Rs. ${invoice.total}`, 140, 99);

      // Table
      const tableData = invoice.items.map((item, index) => [
        index + 1,
        item.productName,
        `Rs. ${item.price}`,
        item.quantity,
        `Rs. ${item.subtotal}`
      ]);

      autoTable(doc, {
        head: [['S.No', 'ITEM', 'PRICE', 'Qty', 'Amount']],
        body: tableData as RowInput[],
        startY: 115,
        headStyles: {
          fillColor: [213, 117, 77],
          textColor: [255, 255, 255],
          fontStyle: "bold"
        },
      });

      // Totals
      const finalY = (doc as any).lastAutoTable.finalY;
      const discountY = finalY + 5;
      const totalY = finalY + 10;

      if (invoice.discount > 0) {
        doc.setTextColor(0, 128, 0);
        doc.text(`${invoice.discount}% discount applied`, 140, discountY);
        doc.setTextColor(0, 0, 0);
      }

      doc.text(`Total Amount: Rs. ${invoice.total}`, 140, totalY);
      doc.setFont("helvetica", "normal");

      // Save PDF
      doc.save(`Invoice_${invoice.orderNumber}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div>
      {/* Hidden QR Code Generator */}
      <div style={{ display: 'none' }}>
        {company && (
          <QrCodeGenerator
            value={gpayUrl}
            size={160}
            onImageLoad={handleQrCodeLoad}
          />
        )}
      </div>

      <button 
        onClick={downloadInvoice} 
        disabled={isGeneratingPdf || !company}
        className='shadow-2xl font-semibold rounded-lg py-2 px-4 cursor-pointer bg-[#d5754d] text-black transition duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isGeneratingPdf ? (
          <>Generating...</>
        ) : (
          <>
            Invoice <RiDownload2Line />
          </>
        )}
      </button>
    </div>
  );
};

export default Invoice;