import React, { useState } from "react";
import "./App.css";

const menuItems = [
    "Dashboard",
    "Profile",
    "Analytics",
    "Notifications",
    "Messages",
    "Calendar",
    "Projects",
    "Orders",
    "Support",
    "Reports",
    "Billing",
    "Team",
    "Careers",
    "Security",
    "Gallery",
    "Music",
    "Library",
    "Global",
    "Statistics",
    "Settings",
];

export default function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("Dashboard");

    return (
        <div className="app">
            {/* Sidebar */}
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                {/* Top */}
                <div className="sidebar-top">
                    {!collapsed && <h1 className="logo">NovaUI</h1>}

                    <button
                        className="menu-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        ☰
                    </button>
                </div>

                {/* Scrollable Menu */}
                <nav className="menu">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`menu-item ${active === item ? "active" : ""
                                }`}
                            onClick={() => setActive(item)}
                        >
                            <span className="icon">⬤</span>

                            {!collapsed && (
                                <span className="menu-text">{item}</span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="sidebar-bottom">
                    <button className="logout-btn">
                        <span className="icon">⎋</span>

                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="main-content">
                <div className="content-box">
                    <h2>{active}</h2>

                    <p>
                        This is the {active} page content with a modern
                        plain CSS sidebar.
                    </p>

                    <div className="cards">
                        {[1, 2, 3, 4, 5, 6].map((card) => (
                            <div className="card" key={card}>
                                <h3>Card {card}</h3>

                                <p>
                                    Example content section for the {active}
                                    page.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}