import React, { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { getCopilotResponse } from "../data/copilotResponses";

export default function AICopilot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "🛰️ **AgriSphere AI Online.** I've analyzed FARM_0127.\n\n🚨 **Alert:** 3 fields need immediate irrigation (Fields 3, 1, 6).\n\n💧 Water balance: **-12mm deficit** \n🌾 NDVI declining: 0.71 → 0.54 (4 weeks)\n\nAsk me: *'Analyze field 3'* or *'Should I irrigate today?'*"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const queryText = input;
    setInput("");
    setLoading(true);

    // Simulate a brief thinking delay so it feels alive, then answer offline
    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      const reply = getCopilotResponse(queryText);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, delay);
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00c896">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="color:#f5a623">$1</em>')
      .replace(/^- (.*)/gm, '<div style="padding:2px 0;padding-left:10px">• $1</div>')
      .replace(/\n/g, "<br/>");
  };

  const quickPrompts = [
    "Analyze field 3",
    "Should I irrigate today?",
    "NDVI trend analysis",
    "Drought risk forecast",
  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "rgba(7,21,32,0.95)",
      border: "1px solid rgba(0,200,150,0.2)",
      borderRadius: 10,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "10px 14px",
        borderBottom: "1px solid rgba(0,200,150,0.15)",
        background: "rgba(0,200,150,0.05)",
        display: "flex", alignItems: "center", gap: 8
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, #00c896, #1a7eff)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Bot size={14} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#00c896", fontFamily: "Orbitron" }}>AI COPILOT</div>
          <div style={{ fontSize: 9, color: "#7aa89a" }}>Satellite-aware · Offline mode</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: 9, color: "#22c55e" }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "85%",
              background: msg.role === "user"
                ? "linear-gradient(135deg, rgba(0,200,150,0.2), rgba(26,126,255,0.2))"
                : "rgba(5,15,24,0.8)",
              border: `1px solid ${msg.role === "user" ? "rgba(0,200,150,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: msg.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
              padding: "8px 11px",
              fontSize: 11,
              lineHeight: 1.5,
              color: "#e8f4f0",
            }} dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              background: "rgba(5,15,24,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px 10px 10px 2px",
              padding: "10px 14px",
              display: "flex", gap: 6, alignItems: "center"
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#00c896",
                  animation: `bounce 1.2s ${i * 0.15}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div style={{ padding: "6px 10px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 4, flexWrap: "wrap" }}>
        {quickPrompts.map(q => (
          <button key={q} onClick={() => setInput(q)} style={{
            background: "rgba(0,200,150,0.08)",
            border: "1px solid rgba(0,200,150,0.2)",
            borderRadius: 4, padding: "3px 8px",
            fontSize: 9, color: "#7aa89a",
            cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={e => e.target.style.color = "#00c896"}
            onMouseLeave={e => e.target.style.color = "#7aa89a"}
          >{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: "8px 10px",
        borderTop: "1px solid rgba(0,200,150,0.15)",
        display: "flex", gap: 6
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about crops, moisture, irrigation..."
          style={{
            flex: 1,
            background: "rgba(5,15,24,0.8)",
            border: "1px solid rgba(0,200,150,0.2)",
            borderRadius: 6,
            padding: "7px 10px",
            fontSize: 11,
            color: "#e8f4f0",
            outline: "none",
            fontFamily: "Inter",
          }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          width: 32, height: 32,
          background: input.trim() ? "linear-gradient(135deg, #00c896, #1a7eff)" : "rgba(0,200,150,0.1)",
          border: "none", borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: input.trim() ? "pointer" : "not-allowed",
          transition: "all 0.2s",
          flexShrink: 0
        }}>
          <Send size={13} color="#fff" />
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}