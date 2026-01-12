import React, { useState } from "react"
import "./Tab.css"
import { useLanguage } from '../../context/LanguageContext';

export default function Tab() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        { key: "tabEfficiencyGains", titleKey: "tabContent1Title", descKey: "tabContent1Desc", icon: "/Tab1.png" },
        { key: "tabBetterCX", titleKey: "tabContent2Title", descKey: "tabContent2Desc", icon: "/Tab2.png" },
        { key: "tabCostSavings", titleKey: "tabContent3Title", descKey: "tabContent3Desc", icon: "/Tab3.png" },
        { key: "tabHappierAgents", titleKey: "tabContent4Title", descKey: "tabContent4Desc", icon: "/Tab4.png" }
    ]

    return (
        <div className="container">
            <div className="heroCard">
                {/* Tabs */}
                <div className="tabContainer">
                    <div className="tabWrapper">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(index)}
                                className={`tab ${activeTab === index ? "tabActive" : ""}`}
                                style={{
                                    "--tab-index": index,
                                    "--total-tabs": tabs.length,
                                }}
                            >
                                {t(tab.key)}
                            </button>
                        ))}
                        <div
                            className="tabIndicator"
                            style={{
                                "--active-index": activeTab,
                                "--total-tabs": tabs.length,
                            }}
                        />
                    </div>
                </div>

                <div className="content">
                    {/* Left Content */}
                    <div className="leftContent">
                        <h1 className="title">{t(tabs[activeTab].titleKey)}</h1>
                        {/*<p className="description">{t(tabs[activeTab].descKey)}</p>*/}
                        <a href="mailto:david@syncallai.com"><button className="ctaButton">{t('contactSales')}</button></a>
                    </div>

                    {/* Right Content */}
                    <div className="rightContent">
                        <div className="iconContainer">
                            <img className="lightningIcon" src={tabs[activeTab].icon} alt="" width="460px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
