# CFA | Conversational Forensic Auditor

A high-performance, client-side intelligence tool for analyzing massive conversation exports (iMazing, PDF, CSV). Surface conflicts, financial coercion, and behavioral patterns with a "Forensic Dark" UI.

## 🚀 GitHub Pages Deployment

To host this tool and send a pre-configured link to a participant:

1.  **Create a New Repo**: Push `index.html`, `auditor.css`, `auditor_intel.js`, and `auditor_demo.js` to a new GitHub repository.
2.  **Enable Pages**: Go to `Settings > Pages` and set the source to `Main branch / (root)`.
3.  **Generate Your Link**: Your tool will be at `https://USERNAME.github.io/REPO_NAME/`.

## 📡 The Forensic Relay (How to get data back)

To receive the audit data from a participant without them needing to configure anything:

1.  **Get a Webhook**: Create a Discord Webhook (or any JSON endpoint).
2.  **Send the "Special Link"**: Append your webhook URL to the link using a `#` (hash).
    - Example: `https://username.github.io/cfa/#https://discord.com/api/webhooks/12345/abcde`
3.  **What Happens**: 
    - The tool automatically detects your webhook from the URL.
    - When they finish their scan, the **"Sync with Auditor"** button becomes active.
    - Clicking it sends the **Relationship Dynamic** report directly to your Discord channel.

## 🔐 Privacy Notice
This tool is **Zero-Persistence**. No conversation data is ever uploaded or stored. Only the high-level **Behavioral Profile** (flag counts and symmetry) is transmitted when the user explicitly clicks the "Sync" button.
