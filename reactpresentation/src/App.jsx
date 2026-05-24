//import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.css'


const MOCK_USER = "Rahul";
const MOCK_DATA = [
    { rollNo: "CS001", name: "Ananya Sharma", marks: 92 },
    { rollNo: "CS002", name: "Dev Patel", marks: 87 },
    { rollNo: "CS003", name: "Priya Nair", marks: 95 },
    { rollNo: "CS004", name: "Arjun Mehta", marks: 78 },
    { rollNo: "CS005", name: "Sneha Reddy", marks: 88 },
];

const App = () => {
    // ── in your real app read from sessionStorage ──────────────────────────
    // let token = sessionStorage.getItem('token');
    // let uname = sessionStorage.getItem('username');
    const [name] = useState(MOCK_USER);
    const [studentdata, setstudentdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortKey, setSortKey] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        // ── replace this block with your real fetch ────────────────────────
        // fetch('https://localhost:44380/api/Auth/Auth-point', {
        //   headers: { 'Authorization': 'bearer ' + token }
        // })
        //   .then(r => r.json())
        //   .then(resp => setstudentdata(resp.data))
        //   .finally(() => setLoading(false));

        setTimeout(() => {          // simulate network delay
            setstudentdata(MOCK_DATA);
            setLoading(false);
        }, 900);
    }, []);

    const Logout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        window.location.reload();
    };

    const handleSort = (key) => {
        if (sortKey === key) setSortAsc(a => !a);
        else { setSortKey(key); setSortAsc(true); }
    };

    const sorted = [...studentdata].sort((a, b) => {
        if (!sortKey) return 0;
        const va = a[sortKey], vb = b[sortKey];
        if (typeof va === 'number') return sortAsc ? va - vb : vb - va;
        return sortAsc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });

    const avg = studentdata.length
        ? Math.round(studentdata.reduce((s, d) => s + d.marks, 0) / studentdata.length)
        : 0;

    const SortIcon = ({ col }) => (
        <span style={{ marginLeft: 5, opacity: sortKey === col ? 1 : 0.3, fontSize: 10 }}>
            {sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}
        </span>
    );

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
 
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        body {
          background: #080b10;
          min-height: 100vh;
          font-family: 'Syne', sans-serif;
        }
 
        /* ── top nav ── */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          position: sticky; top: 0; z-index: 10;
        }
        .nav-brand {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px; letter-spacing: 3px; color: #4ade80; text-transform: uppercase;
        }
        .nav-user {
          display: flex; align-items: center; gap: 16px;
        }
        .avatar {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg,#4ade80,#22d3ee);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 15px; color: #080b10;
        }
        .welcome-text {
          font-size: 14px; color: rgba(255,255,255,0.55);
        }
        .welcome-text span { color: #fff; font-weight: 600; }
 
        /* ── logout btn ── */
        .btn-logout {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 8px 20px; border-radius: 8px; cursor: pointer;
          border: 1px solid rgba(74,222,128,0.4);
          background: transparent; color: #4ade80;
          transition: all 0.2s;
        }
        .btn-logout:hover { background: #4ade80; color: #080b10; }
 
        /* ── hero ── */
        .hero {
          padding: 64px 40px 40px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .hero-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 3px; color: #4ade80;
          text-transform: uppercase; opacity: 0.7;
        }
        .hero-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800; color: #fff;
          text-align: center; line-height: 1.1;
          letter-spacing: -1px;
        }
        .hero-title .accent { color: #4ade80; }
        .hero-sub {
          color: rgba(255,255,255,0.38); font-size: 15px;
          text-align: center; max-width: 480px; margin-top: 6px;
        }
 
        /* ── stats strip ── */
        .stats {
          display: flex; justify-content: center; gap: 24px;
          padding: 0 40px 40px; flex-wrap: wrap;
        }
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 18px 28px;
          display: flex; flex-direction: column; gap: 4px;
          min-width: 130px; text-align: center;
          animation: fadeUp 0.5s ease both;
        }
        .stat-value {
          font-size: 28px; font-weight: 800; color: #4ade80; line-height: 1;
        }
        .stat-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; letter-spacing: 2px;
          color: rgba(255,255,255,0.35); text-transform: uppercase;
        }
 
        /* ── table section ── */
        .section {
          padding: 0 40px 60px; max-width: 960px; margin: 0 auto;
        }
        .section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 22px; font-weight: 700; color: #fff;
          display: flex; align-items: center; gap: 10px;
        }
        .section-title::before {
          content: ''; display: inline-block;
          width: 4px; height: 22px; background: #4ade80; border-radius: 2px;
        }
        .count-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; background: rgba(74,222,128,0.12);
          color: #4ade80; padding: 3px 10px; border-radius: 20px;
          border: 1px solid rgba(74,222,128,0.2);
        }
 
        /* ── table ── */
        .table-wrap {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        table { width: 100%; border-collapse: collapse; }
        thead tr {
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        th {
          padding: 14px 20px; text-align: left;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; letter-spacing: 2px;
          color: rgba(255,255,255,0.4); text-transform: uppercase;
          cursor: pointer; user-select: none;
          transition: color 0.15s;
        }
        th:hover { color: #4ade80; }
        tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
          animation: fadeUp 0.4s ease both;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: rgba(74,222,128,0.05); }
        td {
          padding: 14px 20px;
          font-size: 14px; color: rgba(255,255,255,0.75);
        }
        td:first-child {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px; color: rgba(255,255,255,0.35);
          letter-spacing: 1px;
        }
        td:last-child { text-align: left; }
        .marks-pill {
          display: inline-block;
          padding: 3px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;
        }
        .marks-hi  { background: rgba(74,222,128,0.15); color: #4ade80; }
        .marks-mid { background: rgba(251,191,36,0.12); color: #fbbf24; }
        .marks-lo  { background: rgba(248,113,113,0.12); color: #f87171; }
 
        /* ── loading skeleton ── */
        .skeleton-row td { padding: 16px 20px; }
        .skeleton-bar {
          height: 14px; border-radius: 6px;
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
 
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* NAV */}
            <nav className="nav">
                <div className="nav-brand">◈ EduPortal</div>
                <div className="nav-user">
                    <div className="avatar">{name?.[0]?.toUpperCase()}</div>
                    <span className="welcome-text">Hello, <span>{name}</span></span>
                    <button className="btn-logout" onClick={Logout}>Logout</button>
                </div>
            </nav>

            {/* HERO */}
            <div className="hero">
                <div className="hero-label">Dashboard</div>
                <h1 className="hero-title">
                    Welcome back, <span className="accent">{name}</span>
                </h1>
                <p className="hero-sub">Here's a live overview of all student records pulled from the API.</p>
            </div>

            {/* STATS */}
            {!loading && (
                <div className="stats">
                    {[
                        { value: studentdata.length, label: "Total Students" },
                        { value: avg + "%", label: "Avg Marks" },
                        { value: studentdata.filter(d => d.marks >= 90).length, label: "Top Scorers" },
                    ].map((s, i) => (
                        <div className="stat-card" key={i} style={{ animationDelay: i * 0.1 + "s" }}>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* TABLE */}
            <div className="section">
                <div className="section-header">
                    <div className="section-title">Student Details</div>
                    {!loading && <span className="count-badge">{studentdata.length} records</span>}
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('rollNo')}>Roll No <SortIcon col="rollNo" /></th>
                                <th onClick={() => handleSort('name')}>Name <SortIcon col="name" /></th>
                                <th onClick={() => handleSort('marks')}>Marks <SortIcon col="marks" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? Array.from({ length: 5 }).map((_, i) => (
                                    <tr className="skeleton-row" key={i}>
                                        {[70, 140, 50].map((w, j) => (
                                            <td key={j}><div className="skeleton-bar" style={{ width: w }} /></td>
                                        ))}
                                    </tr>
                                ))
                                : sorted.map((data, index) => {
                                    const cls = data.marks >= 90 ? "marks-hi" : data.marks >= 75 ? "marks-mid" : "marks-lo";
                                    return (
                                        <tr key={index} style={{ animationDelay: index * 0.06 + "s" }}>
                                            <td>{data.rollNo}</td>
                                            <td style={{ color: "#fff", fontWeight: 600 }}>{data.name}</td>
                                            <td><span className={`marks-pill ${cls}`}>{data.marks}</span></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default App;

// function App() {
//     const [count, setCount] = useState(0)

//     return (
//         <>
//             <h1>Hi</h1>
//         </>
//     )
// }

// export default App
