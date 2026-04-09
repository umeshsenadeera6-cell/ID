import React, { useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [data, setData] = useState({
    name: "UMESH ERANGA",
    position: "IT EXECUTIVE",
    photo: null,
    office: "Head Office",
    salesCode: "XXXXX",
    nicNo: "199509501869",
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
          <span style={styles.activeTemplateText}>Serendib Professional Template</span>
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
          <div id="id-card-capture" style={styles.serendibCard}>
            <SerendibCard data={data} />
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const SerendibLogo = () => (
  <div style={styles.serendibLogoContainer}>
    <svg width="100" height="60" viewBox="0 0 100 60" style={styles.serendibLogoIcon}>
      <path d="M50 50C50 50 20 40 20 15C20 -10 50 0 50 50Z" fill="#ffffff" transform="rotate(-15 50 50)" />
      <path d="M50 50C50 50 80 40 80 15C80 -10 50 0 50 50Z" fill="#ffffff" transform="rotate(15 50 50)" />
    </svg>
    <div style={styles.serendibLogoText}>Serendib</div>
    <div style={styles.serendibLogoSubtext}>GROUP OF COMPANIES</div>
  </div>
);

const SerendibCard = ({ data }) => (
  <div style={styles.serendibContainer}>
    {/* Top Green Section */}
    <div style={styles.serendibHeader}>
      <div style={styles.serendibTopAccent}></div>
      <SerendibLogo />
      <div style={styles.serendibWave}></div>
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

    {/* Bottom Section */}
    <div style={styles.serendibFooter}>
      <div style={styles.serendibBottomShape}></div>
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
    height: "260px",
    background: "#1d7c3d",
    backgroundImage: "linear-gradient(135deg, #093d1d 0%, #1d7c3d 50%, #4caf50 100%)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "40px",
  },
  serendibTopAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(9, 61, 29, 0.4) 0%, transparent 60%)",
    clipPath: "polygon(0 0, 70% 0, 0 100%)",
    zIndex: 1,
  },
  serendibWave: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    height: "140px",
    background: "white",
    clipPath: "path('M 1000 140 L 1000 0 C 800 100 400 0 0 100 L 0 140 Z')", // SVG path for a wave
    zIndex: 2,
    transform: "scaleX(1) scaleY(1)",
    transformOrigin: "bottom right",
  },
  serendibLogoContainer: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  serendibLogoIcon: {
    marginBottom: "0px",
  },
  serendibLogoText: {
    color: "#ffffff",
    fontSize: "36px",
    fontWeight: "900",
    letterSpacing: "1px",
    margin: 0,
    lineHeight: 1.1,
    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  serendibLogoSubtext: {
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "4px",
    marginTop: "2px",
    opacity: 0.9,
  },
  serendibPhotoContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-50px",
    position: "relative",
    zIndex: 10,
  },
  serendibPhotoCircle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "white",
    padding: "6px",
    boxShadow: "0 8px 15px rgba(0,0,0,0.12)",
    border: "8px solid #2e7d32",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  serendibPhotoImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  serendibPhotoPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#f1f5f9",
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
    fontWeight: "900",
    color: "#000000",
    margin: "12px 0 0 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  serendibPositionText: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#2e7d32",
    margin: "6px 0 24px 0",
    textTransform: "uppercase",
    letterSpacing: "1px",
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
    bottom: 0,
    left: 0,
    width: "220px",
    height: "160px",
    background: "#4caf50",
    borderRadius: "0 100% 0 0",
    transform: "translate(-50px, 50px) rotate(-15deg)",
    zIndex: 1,
  },
  activeTemplateText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1d7c3d",
    padding: "8px 16px",
  },
};