import React, { useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [template, setTemplate] = useState("serendib");
  const [data, setData] = useState({
    name: "UMESH ERANGA",
    position: "IT EXECUTIVE",
    photo: null,
    office: "Head Office",
    salesCode: "XXXXX",
    nicNo: "199509501869",
    empId: "EMP-001", // For classic template
    department: "IT", // For classic template
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, photo: URL.createObjectURL(file) });
    }
  };

  const downloadCard = () => {
    const card = document.getElementById("id-card-capture");
    html2canvas(card, { scale: 3, useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-id.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>ID Card Generator PRO</h1>
        <div style={styles.templateSwitcher}>
          <button 
            onClick={() => setTemplate("serendib")}
            style={{...styles.switchBtn, ...(template === "serendib" ? styles.activeSwitch : {})}}
          >
            Serendib Template
          </button>
          <button 
            onClick={() => setTemplate("classic")}
            style={{...styles.switchBtn, ...(template === "classic" ? styles.activeSwitch : {})}}
          >
            Classic Template
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* FORM SECTION */}
        <section style={styles.formSection}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Employee Details</h2>
            <div style={styles.gridForm}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="name"
                  value={data.name}
                  placeholder="e.g. Umesh Eranga"
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Position</label>
                <input
                  name="position"
                  value={data.position}
                  placeholder="e.g. IT Executive"
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              {template === "serendib" ? (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Office / Branch</label>
                    <input
                      name="office"
                      value={data.office}
                      placeholder="e.g. Head Office"
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Sales Code</label>
                    <input
                      name="salesCode"
                      value={data.salesCode}
                      placeholder="e.g. S-12345"
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>NIC Number</label>
                    <input
                      name="nicNo"
                      value={data.nicNo}
                      placeholder="e.g. 199509501869"
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Employee ID</label>
                    <input
                      name="empId"
                      value={data.empId}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Department</label>
                    <input
                      name="department"
                      value={data.department}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </>
              )}
              
              <div style={{...styles.inputGroup, gridColumn: "1 / -1"}}>
                <label style={styles.label}>Profile Photo</label>
                <input type="file" onChange={handlePhoto} style={styles.fileInput} />
              </div>
            </div>
            
            <button onClick={downloadCard} style={styles.downloadBtn}>
              Download PNG
            </button>
          </div>
        </section>

        {/* PREVIEW SECTION */}
        <section style={styles.previewSection}>
          <div id="id-card-capture" style={template === "serendib" ? styles.serendibCard : styles.classicCard}>
            {template === "serendib" ? (
              <SerendibCard data={data} />
            ) : (
              <ClassicCard data={data} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const SerendibCard = ({ data }) => (
  <div style={styles.serendibContainer}>
    {/* Top Green Section */}
    <div style={styles.serendibHeader}>
      <div style={styles.serendibTopShape}></div>
      <div style={styles.serendibLogoArea}>
        <svg width="50" height="40" viewBox="0 0 120 100" style={styles.serendibLogoLeaves}>
          {/* Smaller Left Leaf */}
          <path 
            d="M45 45 C35 30 15 35 15 60 C15 85 35 90 45 80 C55 90 75 85 75 60 C75 35 55 30 45 45" 
            fill="white" 
            transform="rotate(-20, 45, 60) scale(0.8)"
          />
          {/* Larger Right Leaf */}
          <path 
            d="M75 35 C65 15 35 20 35 50 C35 80 65 90 75 80 C85 90 115 80 115 50 C115 20 85 15 75 35" 
            fill="white" 
            transform="rotate(15, 75, 50)"
          />
        </svg>
        <span style={styles.serendibMainText}>Serendib</span>
        <span style={styles.serendibSubText}>GREEN PLANTATION</span>
      </div>
    </div>

    {/* Photo Area */}
    <div style={styles.serendibPhotoContainer}>
      <div style={styles.serendibPhotoCircle}>
        {data.photo ? (
          <img src={data.photo} alt="profile" style={styles.serendibPhotoImage} />
        ) : (
          <div style={styles.serendibPhotoPlaceholder} />
        )}
      </div>
    </div>

    {/* Details Area */}
    <div style={styles.serendibBody}>
      <h2 style={styles.serendibName}>{data.name || "YOUR NAME"}</h2>
      <p style={styles.serendibPositionText}>{data.position || "POSITION"}</p>
      
      <div style={styles.serendibDetailsArea}>
        <p style={styles.serendibTextRow}>{data.office || "Head Office"}</p>
        <p style={styles.serendibTextRow}>Sales Code : {data.salesCode || "XXXXX"}</p>
        <p style={styles.serendibTextRow}>NIC NO : {data.nicNo || "199509501869"}</p>
      </div>

      <p style={styles.serendibWebsite}>www.serendibgroups.com</p>
    </div>

    {/* Bottom Green Section */}
    <div style={styles.serendibFooter}>
      <div style={styles.serendibBottomShape}></div>
    </div>
  </div>
);

const ClassicCard = ({ data }) => (
  <div style={styles.classicContainer}>
    <div style={styles.classicAccent} />
    <div style={styles.classicContent}>
      <div style={styles.classicPhotoBox}>
        {data.photo ? (
          <img src={data.photo} alt="profile" style={styles.classicPhoto} />
        ) : (
          <div style={styles.classicPhotoPlaceholder} />
        )}
      </div>
      <div style={styles.classicText}>
        <h2 style={styles.classicName}>{data.name || "Employee Name"}</h2>
        <p style={styles.classicPos}>{data.position || "Position"}</p>
        <div style={styles.classicFooter}>
          <p><strong>ID:</strong> {data.empId}</p>
          <p><strong>Dept:</strong> {data.department}</p>
        </div>
      </div>
    </div>
  </div>
);

// --- STYLES ---

const styles = {
  container: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    color: "#1a1a1b",
    padding: "0 0 40px 0",
  },
  header: {
    background: "#ffffff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "40px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #1d7c3d 0%, #4caf50 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  templateSwitcher: {
    display: "flex",
    gap: "10px",
    background: "#f0f2f5",
    padding: "4px",
    borderRadius: "8px",
  },
  switchBtn: {
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#64748b",
    transition: "all 0.2s",
  },
  activeSwitch: {
    background: "#ffffff",
    color: "#1d7c3d",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "40px",
    padding: "0 20px",
  },
  // Form Styles
  formSection: {
    display: "flex",
    flexDirection: "column",
  },
  formCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#334155",
  },
  gridForm: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    marginLeft: "4px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  fileInput: {
    padding: "10px",
    background: "#f8fafc",
    border: "1px dashed #cbd5e1",
    borderRadius: "8px",
    fontSize: "13px",
  },
  downloadBtn: {
    marginTop: "30px",
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #1d7c3d 0%, #4caf50 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(29, 124, 61, 0.3)",
    transition: "transform 0.1s",
  },
  // Preview Section
  previewSection: {
    position: "sticky",
    top: "40px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  serendibCard: {
    width: "350px",
    height: "560px",
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  classicCard: {
    width: "400px",
    height: "250px",
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  // Serendib Template Styles
  serendibContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    background: "white",
    display: "flex",
    flexDirection: "column",
  },
  serendibHeader: {
    position: "relative",
    height: "180px",
    background: "#1d7c3d", // Darker green
    overflow: "hidden",
  },
  serendibTopShape: {
    position: "absolute",
    bottom: "-60px",
    right: "-20px",
    width: "120%",
    height: "120px",
    background: "#4caf50", // Lighter green
    transform: "rotate(-15deg)",
    borderRadius: "50% 50% 0 0",
  },
  serendibLogoArea: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  },
  serendibLogoLeaves: {
    marginBottom: "5px",
  },
  serendibMainText: {
    color: "white",
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "1px",
    lineHeight: 1,
  },
  serendibSubText: {
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "3px",
    marginTop: "5px",
  },
  serendibPhotoContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-70px",
    position: "relative",
    zIndex: 3,
  },
  serendibPhotoCircle: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "white",
    padding: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  serendibPhotoImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #4caf50",
  },
  serendibPhotoPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#f1f5f9",
    border: "5px solid #4caf50",
  },
  serendibBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 10px",
  },
  serendibName: {
    fontSize: "26px",
    fontWeight: "800",
    color: "black",
    margin: "10px 0 0 0",
    textTransform: "uppercase",
  },
  serendibPositionText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2e7d32",
    margin: "5px 0 20px 0",
    textTransform: "uppercase",
  },
  serendibDetailsArea: {
    textAlign: "center",
    color: "#475569",
    fontSize: "15px",
    lineHeight: "1.8",
  },
  serendibTextRow: {
    margin: 0,
    fontWeight: "600",
  },
  serendibWebsite: {
    marginTop: "auto",
    color: "#1d7c3d",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  serendibFooter: {
    height: "60px",
    position: "relative",
    overflow: "hidden",
  },
  serendibBottomShape: {
    position: "absolute",
    bottom: "-40px",
    left: "-10%",
    width: "120%",
    height: "100px",
    background: "#4caf50",
    borderRadius: "50% 50% 0 0",
  },
  // Classic Template
  classicContainer: {
    height: "100%",
    position: "relative",
    display: "flex",
    paddingLeft: "15px",
  },
  classicAccent: {
    width: "8px",
    background: "#1d7c3d",
    height: "100%",
  },
  classicContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "20px",
    gap: "20px",
  },
  classicPhotoBox: {
    width: "120px",
    height: "150px",
    background: "#f8fafc",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  classicPhoto: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  classicPhotoPlaceholder: {
    width: "100%",
    height: "100%",
    background: "#e2e8f0",
  },
  classicText: {
    flex: 1,
  },
  classicName: {
    fontSize: "22px",
    fontWeight: "800",
    margin: "0 0 5px 0",
  },
  classicPos: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0 0 20px 0",
  },
  classicFooter: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "15px",
    fontSize: "14px",
    color: "#475569",
  },
};