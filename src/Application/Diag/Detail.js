import React, { useEffect, useState } from "react";
import './Det.css';
import "jspdf-autotable";
import { useSelector } from 'react-redux';
import { selectLink } from '../../GlobalState';
import member4 from '../../static/public/computer.png';
import member5 from '../../static/public/VNIT_logo.jpeg';
import member6 from '../../static/public/aimsImage.png';
import { jsPDF } from "jspdf";
import { ImageListItemBar } from "@mui/material";
const Detail = ({ patientId }) => {
  const link = useSelector(selectLink);
  const [storeH, setStoreH] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataAno, setDataAno] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility
  const [selectedImage, setSelectedImage] = useState(null);
 const[result,setResult]=useState('');
 const[error,setError]=useState('');
 const [directImage,setDirectImage]=useState();
  const [imageLoader,setImageLoader]=useState({});
  const [afterSubmit,setAfterSubmit]=useState(false);


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
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setDirectImage(file) // Store selected image URL for preview
    }
  };

  const handleSubmitImage = async () => {
    setIsModalOpen(false);
      setAfterSubmit(true);
      const formData=new FormData();
      formData.append('image',directImage);
      console.log(directImage)
   try{    
      const res=await fetch ('https://zgsn772h-9800.inc1.devtunnels.ms/predict',{
        method:'POST',
        body:formData,
      });
      if(!res.ok) throw new Error('Failed to upload ');
      const data = await res.json(); // Expecting JSON response




        setResult(data.predicted_label);
        console.log(result);
        const formData1 = new FormData();
        formData1.append('file', directImage); // Add image file
        formData1.append('patientId', storeH[0].id); // Add patient ID
        const currentDate = new Date().toISOString()
        formData1.append('date', currentDate); // Add current date
        formData1.append('result', data.predicted_label); 
console.log(formData1);

        const response1 = await fetch(`${link}/save`, {
          method: 'POST',
          body: formData1,
        });
        console.log(response1);
if (!response1.ok) throw new Error('Failed to send data, try again'); 
  }
catch (err) {
  setError(err.message);
  } finally {
   
    setIsModalOpen(false);
  setLoading(false);
  }



    // Close modal after submission
  };
  const genratePdf = async (item, index) => {
  
    try {
      const doc = new jsPDF();
      const image = `${link}/api/images/home?imageUrl=${encodeURIComponent(item.imagePath)}`;

      // Add other content (headers, text, tables, etc.)
      doc.addImage(member6, 'png', 110, 13, 20, 25);
      doc.addImage(member5, 'jpeg', 5, 10, 30, 33);
      doc.setFontSize(10);
      doc.text("Visvesvaraya National Institute of Technology", 32, 20);
      doc.setFontSize(8);
      doc.text("South Ambazari Road, Nagpur, Maharashtra", 32, 27);
      doc.setFontSize(10);
      doc.text("All India Institute of Medical Sciences", 135, 20);
      doc.setFontSize(8);
      doc.text("MIHAN, Nagpur- 441108, Maharashtra, India", 135, 27);
      doc.line(10, 42, 200, 42);
      doc.setFontSize(14);
      doc.text("Report Generated On: " + new Date().toLocaleString(), 14, 50);

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

      doc.text("Uploaded image:", 14, 159);
      doc.addImage(image, 'jpeg', 14, 164, 80, 80);

      doc.text("Result:", 120, 164);
      doc.text(item.result === 'DR' ? "Diabetic" : "Age-Related Macular Degeneration", 125, 173);
      doc.setFontSize(10);
      doc.setTextColor(255, 0, 0);
      doc.text("*Don't rely totally on this result; kindly consult a doctor*", 120, 180);

      doc.setFontSize(10);
      doc.text("Confidential - Do not distribute", 14, doc.internal.pageSize.height - 10);

      doc.save("patient_report.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } 
  };
    const handleImageLoader=(index)=>{
      console.log("is called but effect is now showmn")
          setImageLoader((prev)=>({
            ...prev,[index]:true,
          }));
          console.log(imageLoader[index]);
    }
   const handleImageError = (index) => {
    setImageLoader((prevLoading) => ({
      ...prevLoading,
      [index]: true,  // Hide loader if image fails to load
    }));
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
            <span className="detail-label" style={{ paddingTop: '10px' }}>Upload Image: </span>
            <span>
            <button type="button" onClick={() => setIsModalOpen(true)}>
                Upload Image
              </button>
            </span>
          </div>
        </div>
      </div>
{/* Modal for image upload */}
{isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2 style={{  fontSize:'20px'}}><b>Select an Image to Upload</b></h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {selectedImage && (
        <div className="image-preview">
          <h3>Preview</h3>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ width: '300px', height: '250px', objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="modal-actions">
        <button onClick={handleSubmitImage}>Submit</button>
        <button onClick={() => {setIsModalOpen(false);setSelectedImage(null)}}>Cancel</button>
      </div>
    </div>
  </div>
)}{afterSubmit && (
  <div className="after-submit-modal">
    <div className="after-submit-content">
      <div className="result-container">
        <h3 className="result-title">Analysis Result</h3>
        <div className="result-value">{result}</div>
      </div>
      <div className="after-submit-image">
        <img src={selectedImage} alt="Submitted Preview" />
      </div>
      <div className="after-submit-actions">
        <button className="ok-btn" onClick={() => { setAfterSubmit(false); setSelectedImage(null); }}>OK</button>
      </div>
    </div>
  </div>
)}



      <div className="table-container">
        <table className="data-ano-table">
          <caption style={{ fontSize: '20px', position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
            <b>Previous Records</b>
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
                    rel="noopener noreferrer"
                  >
                <div style={{ position: 'relative', width: '100px', height: '90px' }}>
               
                {!imageLoader[index] && (
                <>loading wait</>
                )}

                <img
                  src={`${link}/api/images/home?imageUrl=${encodeURIComponent(item.imagePath)}`}
                  alt="Image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  onLoad={() => setImageLoader((prev) => ({ ...prev, [index]: true }))}
                  onError={() => handleImageError(index)}
                />
              </div>
                  </a>
                </td>
                <td>{item.result}</td>
                <td>
                  <button onClick={() => genratePdf(item, index)}>
                     Generate PDF Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Detail;
