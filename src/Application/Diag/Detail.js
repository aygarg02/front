import React, { useEffect, useState } from "react";
import './Det.css';
import "jspdf-autotable";
import { useSelector } from 'react-redux';
import { selectLink } from '../../GlobalState';
import member4 from '../../static/public/computer.png';
import member5 from '../../static/public/VNIT_logo.jpeg';
import member6 from '../../static/public/aimsImage.png';
import { jsPDF } from "jspdf";
const Detail = ({ patientId }) => {
  const link = useSelector(selectLink);
  const [storeH, setStoreH] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataAno, setDataAno] = useState([]);

  const getDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${link}/data?query=patientId&searchFor=${encodeURIComponent(patientId)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setStoreH(data);
    } catch (error) {
      console.error('Failed to fetch details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoreDetail = async () => {
    try {
      if (storeH[0]) {
        const response = await fetch(
          `${link}/detailsaddOns?name=${storeH[0]?.name}&email=${storeH[0]?.email}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDataAno(data);
      }
    } catch (error) {
      console.error('Failed to fetch details:', error);
    }
  };

  useEffect(() => {
    if (patientId) {
      getDetail();
    }
  }, [patientId]);

  useEffect(() => {
    if (storeH[0]) {
      getMoreDetail();
    }
  }, [storeH]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!storeH || storeH.length === 0) {
    return <div className="loading">No data found</div>;
  }
  
  const genratePdf = async (item) => {
    const doc = new jsPDF();
    const image=`${link}/api/images/home?imageUrl=${encodeURIComponent(item.imagePath)}`;
    // Add other content (headers, text, tables, etc.) // y x
    doc.addImage(member6, 'png', 110, 13, 20, 25);
    doc.addImage(member5, 'jpeg', 5, 10, 30, 33);
    doc.setFontSize(10);
    doc.text("Visvesvaraya National Institute of Technology", 32, 20);
    doc.setFontSize(8);
    doc.text("South Ambazari Road, Nagpur, Maharashtra", 32, 27);
    doc.setFontSize(10);
    doc.text("All India Institute of Medical Sciences",135,20);
    doc.setFontSize(8);
    doc.text("MIHAN, Nagpur- 441108, Maharashtra, India", 135, 27);
    doc.setLineWidth(0.5); // Line thickness
    doc.line(10, 42 , 200, 42); 
    doc.setFontSize(14);
    doc.text("Report Generated On: " + new Date().toLocaleString(), 14, 50);
  
    // Patient Details Table
    doc.setFontSize(15);
    doc.text("Patient Details", 14, 60);
    doc.autoTable({
      head: [["Patient", "Details"]],
      body: [
        ["Patient Name", storeH[0].name.toUpperCase()],
        ["Patient ID", storeH[0].id],
        ["Patient Email", storeH[0].email],
      ],
      startY: 67,
      theme: "grid",
    });
  
    // Image Details Table
    doc.setFontSize(15);
    doc.text("Image Details", 14, 117);
    doc.autoTable({
      head: [["Image", "Details"]],
      body: [
        ["Disease", item.result],
        ["Date Image uploaded", new Date(item.dateWrt).toLocaleString()],
      ],
      startY: 123,
      theme: "grid",
    });
  
    // Add Image 
    doc.setFontSize(15);

    doc.text("Uploaded image :",14,159);
   
    doc.addImage(image, 'jpeg',14, 164, 80, 80);
    doc.setFontSize(15);

    doc.text("Result:",120,164);
    doc.setFontSize(15);
    var te=(item.result==='DR')?"Diabetic":" Age-Related Macular Degeneration";

    doc.text(te,125,173);
    doc.setFontSize(10);
   
    doc.setTextColor(255, 0, 0);
    doc.text("*don't relay totally on this result kindly concern the doctor *",120,180);
    //  
      // Footer
      doc.setFontSize(10);
      doc.text("Confidential - Do not distribute", 14, doc.internal.pageSize.height - 10);
  
      // Save PDF
      doc.save("patient_report.pdf");
    
  
  };
return (  
    <>
      <div className="card">
        <div className="card-header">
          <div className="avatar">
            <img src={member4} alt="Avatar" />
          </div>
          <h2 className="user-name">Patient: {storeH[0]?.name.toUpperCase()}</h2>
        </div>
        <div className="card-content">
          <div className="user-details">
            <span className="detail-label">Email:</span>
            <span>{storeH[0]?.email}</span>
            <span className="detail-label">Patient ID:</span>
            <span>{storeH[0]?.id}</span>
            <span className="detail-label" style={{paddingTop:'10px'}}>Upload Image: </span>
            <span>
            <button type='submit'>
          Upload Image
        </button>
            </span>
          </div>
        </div>
       
      </div>
  



      <div className="table-container">
      <table className="data-ano-table">
      <caption style={{ fontSize: '20px', position: 'sticky', top: '0', backgroundColor: 'white',zIndex:'1' }}>
      <b>Previous  Records</b>
    </caption>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Date</th>
            <th>Image</th>
            <th>Result</th>
            <th>Report</th>
          
          </tr>
        </thead>
        <tbody>
  {dataAno.map((item, index) => (
   
    <tr key={index}>
       
      <td>{index + 1}</td> 

      <td>{item.dateWrt ? new Date(item.dateWrt).toLocaleString() : 'N/A'}</td>
      <td>
        <a 
          href={`${link}/api/images/home?imageUrl=${encodeURIComponent(item.imagePath)}`} 
          target="_blank" 
       
        >
          <img 
            src={`${link}/api/images/home?imageUrl=${encodeURIComponent(item.imagePath)}`} 
            alt="Image" 
            style={{ width: '100px', height: '90px', objectFit: 'cover' }} 
            loading="lazy" 
          />
        </a>
      </td>
  <td>{item.result}</td>
  <td> <button onClick={() =>genratePdf(item)}>
          Generate PDF Report
        </button></td>
    </tr>
  ))}
</tbody>

      </table>
      </div>
    </>
  );
};

export default Detail;

