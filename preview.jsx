import React, { useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [data, setData] = useState({
    name: "",
    empId: "",
    position: "",
    department: "",
    photo: null,
  });

  // Handle text input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, photo: URL.createObjectURL(file) });
    }
  };

  // Download ID card
  const downloadCard = () => {
    const card = document.getElementById("id-card");

    html2canvas(card, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "employee-id.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div style={styles.container}>
      <h1>ID Card Generator</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="empId"
          placeholder="Employee ID"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="position"
          placeholder="Position"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          style={styles.input}
        />
        <input type="file" onChange={handlePhoto} style={styles.input} />
      </div>

      {/* ID CARD */}
      <div id="id-card" style={styles.card}>
        {/* TEMPLATE BACKGROUND */}
        <img
          src="/template.png"
          alt="template"
          style={styles.template}
        />

        {/* PHOTO */}
        {data.photo && (
          <img src={data.photo} alt="profile" style={styles.photo} />
        )}

        {/* TEXT */}
        <h2 style={styles.name}>{data.name}</h2>
        <p style={styles.position}>{data.position}</p>
        <p style={styles.empId}>ID: {data.empId}</p>
        <p style={styles.dept}>{data.department}</p>
      </div>

      <button onClick={downloadCard} style={styles.button}>
        Download ID
      </button>
    </div>
  );
}

// 🎨 STYLES (All in one file)
const styles = {
  container: {
    fontFamily: "Arial",
    background: "#f4f6f9",
    minHeight: "100vh",
    textAlign: "center",
    padding: "20px",
  },

  form: {
    marginBottom: "20px",
  },

  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "250px",
  },

  card: {
    position: "relative",
    width: "350px",
    height: "220px",
    margin: "20px auto",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    background: "#fff",
  },

  template: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  photo: {
    position: "absolute",
    top: "60px",
    left: "20px",
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    objectFit: "cover",
  },

  name: {
    position: "absolute",
    top: "60px",
    left: "110px",
    fontSize: "18px",
    fontWeight: "bold",
  },

  position: {
    position: "absolute",
    top: "90px",
    left: "110px",
  },

  empId: {
    position: "absolute",
    bottom: "40px",
    left: "20px",
  },

  dept: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
  },

  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};