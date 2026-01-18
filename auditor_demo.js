const CFA_Demo = [
    {
        timestamp: "2026-01-10 09:00 AM",
        sender: "Auditor_User",
        text: "I really need my paycheck for the last two weeks. It's Friday and I haven't seen the direct deposit.",
        findings: [
            { clusterKey: "WAGE_LABOR_CLAIMS", label: "Wage & Hour Evidence", color: "#10b981", evidence: ["paycheck", "friday"] },
            { clusterKey: "GENERAL_COMMITMENTS", label: "Promises & Tasks", color: "#3b82f6", evidence: ["paycheck"] }
        ]
    },
    {
        timestamp: "2026-01-10 09:15 AM",
        sender: "Blake_Instigator",
        text: "Why are you obsessing over money? After everything I've done for you? You're being so manipulative right now.",
        findings: [
            { clusterKey: "ABUSIVE_PATTERNS", label: "Abusive/Manipulation Flags", color: "#ef4444", evidence: ["manipulative", "after everything i've done"] },
            { clusterKey: "NARRATIVE_INCONSISTENCY", label: "Inconsistency & Narrative Shifts", color: "#8b5cf6", evidence: ["manipulative"] }
        ]
    },
    {
        timestamp: "2026-01-10 09:17 AM",
        sender: "Auditor_User",
        text: "I'm not obsessing, I just strictly mean that my rent is due. You promised it would be in by today.",
        findings: [
            { clusterKey: "GENERAL_COMMITMENTS", label: "Promises & Tasks", color: "#3b82f6", evidence: ["promised", "today"] }
        ]
    },
    {
        timestamp: "2026-01-10 09:30 AM",
        sender: "Blake_Instigator",
        text: "If you keep pushing me on this, I'll just have to find someone else who isn't so difficult to work with. There are plenty of people who want your job.",
        findings: [
            { clusterKey: "THREATS_INTIMIDATION", label: "Threats & Intimidation", color: "#f59e0b", evidence: ["find someone else", "want your job"] }
        ]
    },
    {
        timestamp: "2026-01-10 09:45 AM",
        sender: "Blake_Instigator",
        text: "I never said the money would be there today. You're crazy and you're imagining things again.",
        findings: [
            { clusterKey: "NARRATIVE_INCONSISTENCY", label: "Inconsistency & Narrative Shifts", color: "#8b5cf6", evidence: ["never said", "crazy"] },
            { clusterKey: "ABUSIVE_PATTERNS", label: "Abusive/Manipulation Flags", color: "#ef4444", evidence: ["crazy"] }
        ]
    },
    {
        timestamp: "2026-01-10 10:00 AM",
        sender: "Auditor_User",
        text: "I have the text from Monday where you said Friday definitely. I'm just trying to pay my bills.",
        findings: [
            { clusterKey: "NARRATIVE_INCONSISTENCY", label: "Inconsistency & Narrative Shifts", color: "#8b5cf6", evidence: ["have the text", "said friday"] }
        ]
    }
];
