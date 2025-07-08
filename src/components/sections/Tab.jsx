import React, { useState } from "react"
import "./Tab.css"

export default function Tab() {
    const [activeTab, setActiveTab] = useState("Efficiency Gains")

    const tabs = ["Efficiency Gains", "Better CX", "Cost Savings", "Happier Agents"]

    const tabContent = {
        "Efficiency Gains": {
            title: "AI saves agents up to 3h per day by handling routine tasks",
            description: "Automate repetitive workflows and let your team focus on high-value interactions",
            icon: "/Tab1.png"
        },
        "Better CX": {
            title: "Deliver personalized experiences at scale with AI-powered insights",
            description: "Understand customer needs instantly and provide tailored solutions every time",
            icon: "/Tab2.png"
        },
        "Cost Savings": {
            title: "Reduce operational costs by 40% while improving service quality",
            description: "Smart automation cuts overhead while maintaining exceptional customer satisfaction",
            icon: "/Tab3.png"
        },
        "Happier Agents": {
            title: "Empower your team with AI tools that eliminate frustration",
            description: "Remove mundane tasks and give agents the tools they need to succeed",
            icon: "/Tab4.png"
        },
    }

    return (
        <div className="container">
            <div className="heroCard">
                {/* Tabs */}
                <div className="tabContainer">
                    <div className="tabWrapper">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`tab ${activeTab === tab ? "tabActive" : ""}`}
                                style={{
                                    "--tab-index": index,
                                    "--total-tabs": tabs.length,
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                        <div
                            className="tabIndicator"
                            style={{
                                "--active-index": tabs.indexOf(activeTab),
                                "--total-tabs": tabs.length,
                            }}
                        />
                    </div>
                </div>

                <div className="content">
                    {/* Left Content */}
                    <div className="leftContent">
                        <h1 className="title">{tabContent[activeTab].title}</h1>
                        {/*<p className="description">{tabContent[activeTab].description}</p>*/}
                        <button className="ctaButton">Contact sales</button>
                    </div>

                    {/* Right Content */}
                    <div className="rightContent">
                        <div className="iconContainer">
                            <img className="lightningIcon" src={tabContent[activeTab].icon} alt="" width="460px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
