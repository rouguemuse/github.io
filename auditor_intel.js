/**
 * CFA Intelligence Engine - auditor_intel.js
 * Specialized for Employment Law, Wage Theft, and Behavioral Analysis
 */

const CFA_Intel = {
    // 1. Core Discovery Clusters
    clusters: {
        "ABUSIVE_PATTERNS": {
            label: "Abusive/Manipulation Flags",
            color: "#ef4444", // Red
            keywords: [
                "crazy", "insane", "liar", "drama", "victim", "always you", "gaslight", "manipulate",
                "controlling", "isolated", "sorry", "forgive", "please", "never again", "my fault",
                "your fault", "you made me", "nobody likes", "everyone knows", "unstable"
            ],
            regex: /\b(you're the problem|not what happened|i have the text|look back at|you promised|if you loved me|stay away from)\b/i,
            description: "Scoping for cycles of psychological manipulation, isolation, and gaslighting."
        },
        "FINANCIAL_CONTROL": {
            label: "Financial Control & Coercion",
            color: "#6366f1", // Indigo
            keywords: [
                "zelle", "venmo", "cashapp", "bank account", "password", "access", "transfer", "give me",
                "send it back", "my money", "allowance", "owe me", "pay back", "authorized", "purchase",
                "card", "balance", "show me", "where is the"
            ],
            regex: /\b(why did you buy|don't spend|account access|give me the|send me the|pay me back)\b/i,
            description: "Monitoring for unauthorized access to funds or coercive financial directives."
        },
        "THREATS_INTIMIDATION": {
            label: "Threats & Intimidation",
            color: "#f59e0b", // Orange
            keywords: [
                "fire you", "quit", "stupid", "idiot", "worthless", "replacement", "threat", "regret",
                "warned", "termination", "disciplinary", "sue", "legal", "lawyer", "police", "arrest",
                "destroy", "never work", "regret it", "watch out"
            ],
            regex: /\b(you're fired|get out|never again|don't come in|disciplinary action|file a claim|i'll destroy)\b/i,
            description: "Catching direct threats of professional or personal retaliation."
        },
        "WAGE_LABOR_CLAIMS": {
            label: "Wage & Hour Evidence",
            color: "#10b981", // Green
            keywords: [
                "unpaid", "overtime", "paycheck", "cash", "off the books", "stolen", "late", "withhold",
                "deduction", "tips", "hours", "break", "clock", "working", "friday"
            ],
            regex: /\b(didn't get paid|where is my check|late pay|cut my pay|under the table|payroll)\b/i,
            description: "Compiling instances of wage theft, unpaid overtime, or labor violations."
        },
        "GENERAL_COMMITMENTS": {
            label: "Promises & Tasks",
            color: "#3b82f6", // Blue
            keywords: [
                "will do", "promise", "confirm", "agreement", "reminder", "deadline", "task", "handle it"
            ],
            regex: /\b(i'll have it|get back to you|let me check)\b/i,
            description: "Tracking personal and professional commitments made within the conversation."
        },
        "COMPLIMENTS_REINFORCEMENT": {
            label: "Compliments & Reinforcement",
            color: "#ec4899", // Pink
            keywords: [
                "amazing", "proud", "love", "best", "great", "wonderful", "special", "beautiful",
                "smart", "perfect", "talented", "appreciate", "thanks", "thank you", "kind",
                "sweet", "angel", "lucky", "blessed"
            ],
            regex: /\b(so proud of you|you're amazing|don't know what i'd do|you're the best|love you so much)\b/i,
            description: "Identifying instances of positive reinforcement, which can often be part of a 'love-bombing' cycle in forensic contexts."
        },
        "NARRATIVE_INCONSISTENCY": {
            label: "Inconsistency & Narrative Shifts",
            color: "#8b5cf6", // Purple
            keywords: [
                "never said", "actually", "wrong", "mistake", "deny", "denied", "remember", "forgot",
                "liar", "lying", "truth", "story", "changed", "contradict", "confused", "misled",
                "misunderstood", "fact", "proof", "records"
            ],
            regex: /\b(not what you said|changing your story|earlier you said|that's a lie|don't lie to me|since when|narrative shift)\b/i,
            description: "Highlighting moments where the story changes, previous statements are denied, or logic becomes inconsistent."
        }
    },

    // 2. Formatting & Parsing Logic
    utils: {
        /**
         * Parses iMazing / CSV exports
         * Expected columns: Date, Time, Sender, Message
         */
        parseMessages: (rawData, format = 'csv') => {
            if (format === 'csv') {
                return CFA_Intel.utils.parseCSV(rawData);
            }
            return CFA_Intel.utils.parseText(rawData);
        },

        parseCSV: (csv) => {
            const lines = csv.split('\n');
            const headers = lines[0].toLowerCase().split(',');
            const messages = [];

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;

                const currentLine = CFA_Intel.utils.splitCSVLine(lines[i]);
                const entry = {};

                headers.forEach((header, index) => {
                    entry[header.trim()] = currentLine[index] ? currentLine[index].replace(/^"|"$/g, '') : '';
                });

                // Standardize fields for internal use
                messages.push({
                    timestamp: entry.date || entry.timestamp || entry.time || '',
                    sender: entry.sender || entry['from'] || entry.author || 'Unknown',
                    text: entry.message || entry.body || entry.text || '',
                    raw: lines[i]
                });
            }
            return messages;
        },

        splitCSVLine: (line) => {
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                if (line[i] === '"') inQuotes = !inQuotes;
                else if (line[i] === ',' && !inQuotes) {
                    result.push(current);
                    current = '';
                } else {
                    current += line[i];
                }
            }
            result.push(current);
            return result;
        },

        parseText: (text) => {
            // Force a newline before every timestamp to break up "page blobs" from PDFs
            const timePattern = /\[?(\d{1,4}[\/\-\.](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{1,2})[\/\-\.]\d{1,4}\s*,?\s*\d{1,2}:\d{2}(?::\d{2})?\s?(?:AM|PM)?)\]?/gi;
            const normalizedText = text.replace(timePattern, (match) => "\n" + match);

            const lines = normalizedText.split('\n');
            const messages = [];
            const singleTimeRegex = /\[?(\d{1,4}[\/\-\.](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{1,2})[\/\-\.]\d{1,4}\s*,?\s*\d{1,2}:\d{2}(?::\d{2})?\s?(?:AM|PM)?)\]?/i;

            lines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) return;

                const timeMatch = trimmed.match(singleTimeRegex);
                if (timeMatch) {
                    const remainder = trimmed.replace(timeMatch[0], "").trim();
                    const senderMatch = remainder.match(/^([^:]+):/);
                    const sender = senderMatch ? senderMatch[1].trim() : "Unknown";
                    // Clean up the message text to remove the sender prefix if it exists
                    const messageText = remainder.replace(/^[^:]+:/, "").trim();

                    messages.push({
                        timestamp: timeMatch[1].trim(),
                        sender: sender,
                        text: messageText || remainder,
                        raw: line
                    });
                } else {
                    if (messages.length > 0) {
                        messages[messages.length - 1].text += " " + trimmed;
                    } else {
                        messages.push({
                            timestamp: "N/A",
                            sender: "System",
                            text: trimmed,
                            raw: line
                        });
                    }
                }
            });
            return messages;
        }
    },

    // 3. Auditor Logic
    auditor: {
        scan: (messages) => {
            return messages.map(msg => {
                const findings = [];
                const text = msg.text.toLowerCase();

                for (const [key, cluster] of Object.entries(CFA_Intel.clusters)) {
                    // Check Keywords
                    const matchedKeywords = cluster.keywords.filter(kw => text.includes(kw.toLowerCase()));

                    // Check Regex
                    const regexMatch = msg.text.match(cluster.regex);

                    if (matchedKeywords.length > 0 || regexMatch) {
                        findings.push({
                            clusterKey: key,
                            label: cluster.label,
                            color: cluster.color,
                            evidence: matchedKeywords.concat(regexMatch ? [regexMatch[0]] : [])
                        });
                    }
                }

                return { ...msg, findings };
            });
        },

        getStatistics: (scannedMessages) => {
            const stats = {};
            Object.keys(CFA_Intel.clusters).forEach(key => {
                stats[key] = scannedMessages.filter(m => m.findings.some(f => f.clusterKey === key)).length;
            });
            return stats;
        },

        getRelationshipStats: (scannedMessages, myId) => {
            const stats = {
                user: { totalFlags: 0, clusters: {} },
                target: { totalFlags: 0, clusters: {} }
            };

            const myIdLower = myId ? myId.toLowerCase() : "";

            scannedMessages.forEach(msg => {
                const isMe = myIdLower && msg.sender.toLowerCase().includes(myIdLower);
                const role = isMe ? 'user' : 'target';

                msg.findings.forEach(f => {
                    stats[role].totalFlags++;
                    stats[role].clusters[f.label] = (stats[role].clusters[f.label] || 0) + 1;
                });
            });

            return stats;
        }
    }
};

if (typeof module !== 'undefined') module.exports = CFA_Intel;
