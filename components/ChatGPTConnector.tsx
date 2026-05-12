'use client';

import { useState } from 'react';

const MCP_URL = 'https://boulder-mcp-demo.vercel.app/mcp';

export default function ChatGPTConnector() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(MCP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="border border-green-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="bg-green-50 px-5 py-4 border-b border-green-100">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🤖</span> Connect to ChatGPT
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Requires ChatGPT with Developer Mode enabled. Opens the ChatGPT connectors page — add a new custom MCP connector and paste the URL below.
        </p>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* MCP URL */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            MCP Endpoint
          </label>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={MCP_URL}
              className="flex-1 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors shrink-0 ${
                copied
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Button */}
        <a
          href="https://chatgpt.com/?model=auto"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          Open ChatGPT →
        </a>

        {/* Manual steps */}
        <details className="group">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer select-none list-none flex items-center gap-1">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            How to connect — step by step
          </summary>
          <ol className="mt-3 space-y-1.5 text-sm text-gray-600 list-decimal list-inside pl-1">
            <li>Open ChatGPT and go to <strong>Settings</strong>.</li>
            <li>Go to <strong>Connectors</strong> (or Apps &amp; Connectors).</li>
            <li>Enable <strong>Developer Mode</strong> if it is not already on.</li>
            <li>Click <strong>Add custom connector</strong>.</li>
            <li>Paste the MCP URL above into the endpoint field.</li>
            <li>Name it <strong>Boulder MCP Demo</strong>.</li>
            <li>Set authentication to <strong>None</strong>.</li>
            <li>Save the connector.</li>
            <li>Start a new chat and enable the Boulder MCP Demo connector.</li>
            <li>Ask: <em>&quot;What is the best bouldering centre for Fred?&quot;</em></li>
          </ol>
        </details>
      </div>
    </div>
  );
}
