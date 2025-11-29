import { useState, useRef, useEffect } from 'react';
import './App.css';
import { 
  Search, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Mic, 
  Smile, 
  CheckCheck,
  ChevronDown,
  CornerUpRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

// --- RICH MOCK DATA ---
const MOCK_CHATS = {
  // BOT (Pinned Top)
  0: {
    id: 0,
    name: "FactSaathi Bot",
    // Normal Robot Avatar
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Robot123", 
    type: "bot",
    time: "Now",
    messages: [
      { id: 100, text: "Namaste! 🙏 I am **FactSaathi**.\n\nI verify news and rumors instantly. Forward me any message to check.", sender: "them", time: "Now" }
    ]
  },
  // REALISTIC FRIENDS (All Male Avatars)
  1: {
    id: 1,
    name: "Amr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amr",
    type: "private",
    time: "10:45 AM",
    messages: [
      { id: 1, text: "Bro, are we going for the movie?", sender: "me", time: "10:00 AM" },
      { id: 2, text: "Yeah, getting tickets.", sender: "them", time: "10:05 AM" },
      { id: 3, text: "Btw, just saw this. UNESCO has declared our National Anthem as the best in the world again! 🇮🇳", sender: "them", time: "10:45 AM" }
    ]
  },
  2: {
    id: 2,
    name: "Abd",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abd1",
    type: "private",
    time: "9:30 AM",
    messages: [
      { id: 1, text: "Gym today?", sender: "them", time: "9:00 AM" },
      { id: 2, text: "Leg day 💀", sender: "me", time: "9:10 AM" },
      { id: 3, text: "Heard that drinking hot water with lemon cures all viruses instantly. Mom sent this.", sender: "them", time: "9:30 AM" }
    ]
  },
  3: {
    id: 3,
    name: "Talha",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talha",
    type: "private",
    time: "Yesterday",
    messages: [
      { id: 1, text: "Assignment submission date extended?", sender: "them", time: "Yesterday" },
      { id: 2, text: "I wish lol.", sender: "me", time: "Yesterday" },
      { id: 3, text: "Check this link, government giving free laptops to all students.", sender: "them", time: "Yesterday" }
    ]
  },
  4: {
    id: 4,
    name: "Uzair",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Uzair",
    type: "private",
    time: "Yesterday",
    messages: [
      { id: 1, text: "Coming to turf?", sender: "me", time: "Yesterday" },
      { id: 2, text: "Yeah 5 mins.", sender: "them", time: "Yesterday" },
      { id: 3, text: "Dude, RBI is banning 2000 rupee notes again? Saw on Twitter.", sender: "them", time: "Yesterday" }
    ]
  },
  5: {
    id: 5,
    name: "Ansh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ansh",
    type: "private",
    time: "Tuesday",
    messages: [
      { id: 1, text: "Happy Birthday bro! 🎂", sender: "them", time: "Tuesday" },
      { id: 2, text: "Thanks man!", sender: "me", time: "Tuesday" },
      { id: 3, text: "Did you hear? NASA found a new planet that supports life.", sender: "them", time: "Tuesday" }
    ]
  },
  6: {
    id: 6,
    name: "Fawzaan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fawzaan",
    type: "private",
    time: "Monday",
    messages: [
      { id: 1, text: "Project looks good.", sender: "me", time: "Monday" },
      { id: 2, text: "Just needs some UI polish.", sender: "them", time: "Monday" },
      { id: 3, text: "Yo, WhatsApp is going to start charging money from next week?", sender: "them", time: "Monday" }
    ]
  },
  7: {
    id: 7,
    name: "Bilal",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal",
    type: "private",
    time: "Sunday",
    messages: [
      { id: 1, text: "Biryani was 10/10.", sender: "them", time: "Sunday" },
      { id: 2, text: "Agreed.", sender: "me", time: "Sunday" },
      { id: 3, text: "Look at this, Eating 3 dates a day cures cancer?", sender: "them", time: "Sunday" }
    ]
  },
  8: {
    id: 8,
    name: "Faraaz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faraaz",
    type: "private",
    time: "Saturday",
    messages: [
      { id: 1, text: "Valorant tonight?", sender: "me", time: "Saturday" },
      { id: 2, text: "Can't, family dinner.", sender: "them", time: "Saturday" },
      { id: 3, text: "Is it true that Earth's rotation is slowing down drastically?", sender: "them", time: "Saturday" }
    ]
  },
  9: {
    id: 9,
    name: "Arham",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arham",
    type: "private",
    time: "Friday",
    messages: [
      { id: 1, text: "Notes bhej de.", sender: "them", time: "Friday" },
      { id: 2, text: "Sent.", sender: "me", time: "Friday" },
      { id: 3, text: "Bro, free Netflix subscription for 1 year if you click this. Real?", sender: "them", time: "Friday" }
    ]
  },
  10: {
    id: 10,
    name: "Rehan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rehan",
    type: "private",
    time: "Thursday",
    messages: [
      { id: 1, text: "Where are you?", sender: "them", time: "Thursday" },
      { id: 2, text: "Traffic.", sender: "me", time: "Thursday" },
      { id: 3, text: "Read this: New virus spreading through chicken?", sender: "them", time: "Thursday" }
    ]
  }
};

// (No external avatar libraries in use — avatars will be initial-based SVGs)

// Replace avatars with simple initial-based SVGs for all users (deterministic colors)
function hashToColor(s) {
  const colors = ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#03a9f4", "#009688", "#4caf50", "#8bc34a", "#ffc107", "#ff9800", "#795548"];
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return colors[Math.abs(h) % colors.length];
}

function makeInitialSvg(name, size = 96) {
  const initial = (name && String(name).trim()[0]) ? String(name).trim()[0].toUpperCase() : '?';
  const bg = hashToColor(name || initial);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" rx="${Math.floor(size*0.16)}" fill="${bg}"/>` +
    `<text x="50%" y="52%" font-family="Arial, Helvetica, sans-serif" font-size="${Math.floor(size*0.45)}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff">${initial}</text>` +
    `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Header user avatar: use initial 'U' for user
const HEADER_USER_AVATAR = makeInitialSvg('User');

// Apply initials to all chats (including bot)
Object.values(MOCK_CHATS).forEach((chat) => {
  chat.avatar = makeInitialSvg(chat.name || String(chat.id));
});

// Ensure the bot has a robot emoji avatar (override initial)
const botChat = Object.values(MOCK_CHATS).find(c => c.type === 'bot' || c.id === 0);
if (botChat) {
  const robotSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
    <rect width="96" height="96" rx="16" fill="#eceff1"/>
    <text x="50%" y="52%" font-size="48" text-anchor="middle" dominant-baseline="middle">🤖</text>
    <text x="48" y="88" font-size="10" text-anchor="middle" fill="#263238">FactSaathi Bot</text>
  </svg>`;
  botChat.avatar = 'data:image/svg+xml;utf8,' + encodeURIComponent(robotSvg);
}

function App() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState(MOCK_CHATS);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chats, activeChatId, isLoading]);

  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleForward = (text) => {
    setActiveChatId(0); // Switch to FactSaathi
    setMenuOpenId(null); // Close menu
    // Directly send the forwarded text to FactSaathi (chat id 0)
    sendMessageText(text, 0);
  };

  const formatText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  // Generic function to send a message to a specific chat id. Used by both send and forward.
  const sendMessageText = async (text, chatId) => {
    if (!text || !String(text).trim()) return;

    const userMsg = {
      id: Date.now(),
      text: text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedChats = { ...chats };
    // Ensure target chat exists
    if (!updatedChats[chatId]) return;
    updatedChats[chatId].messages.push(userMsg);
    setChats(updatedChats);
    // Clear input box if we're sending from the UI
    setInputText("");

    // If sending to the bot (FactSaathi) trigger bot verification flow
    if (chatId === 0) {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userMsg.text }),
        });

        const data = await response.json();
        const botMsg = {
          id: Date.now() + 1,
          text: data.verdict || "Unable to verify at this moment.",
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        updatedChats[0].messages.push(botMsg);
        setChats({ ...updatedChats });

      } catch (error) {
        const botMsg = {
          id: Date.now() + 1,
          text: "**Verdict:** Connection Error ⚠️\n\nPlease ensure the **FactSaathi** backend is running.",
          sender: "them",
          time: "Now"
        };
        updatedChats[0].messages.push(botMsg);
        setChats({ ...updatedChats });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSend = async () => {
    // send message to currently active chat
    await sendMessageText(inputText, activeChatId);
  };

  const activeChat = activeChatId !== null ? chats[activeChatId] : null;

  return (
    <div className="app-container">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="header">
          <div className="user-avatar">
            {/* USER AVATAR - initial-based SVG */}
            <img src={HEADER_USER_AVATAR} alt="Me" />
          </div>
          <div className="header-icons">
            <div className="icon-btn"><MoreVertical size={20} /></div>
          </div>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input placeholder="Search or start new chat" />
          </div>
        </div>

        <div className="chat-list">
          {Object.values(chats).map((chat) => (
            <div 
              key={chat.id} 
              className={`chat-item ${activeChatId === chat.id ? 'active' : ''} ${chat.id === 0 ? 'pinned-chat' : ''}`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <div className="chat-avatar">
                <img src={chat.avatar} alt={chat.name} />
              </div>
              <div className="chat-details">
                <div className="chat-row-top">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-date">{chat.time}</span>
                </div>
                <div className="chat-row-bottom">
                  <span className="chat-preview">
                    {/* Typing Logic for Sidebar */}
                    {isLoading && chat.id === 0 ? (
                      <span className="typing-text-preview">typing...</span>
                    ) : (
                      <>
                        {chat.type === 'bot' && <span className="bot-tag">Bot</span>}
                        {chat.messages[chat.messages.length-1].text.replace(/\*\*/g, '').substring(0, 35)}...
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT WINDOW OR WELCOME SCREEN */}
      {activeChatId === null ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            <div className="welcome-img">
              <ShieldCheck size={80} color="#e9edef" fill="#00a884" />
            </div>
            <h1>Welcome to FactSaathi Demo</h1>
            <p>Send and verify news instantly without leaving your chat.</p>
            <div className="welcome-divider"></div>
            <p className="welcome-hint"><Smartphone size={14} style={{display:'inline', marginRight:5}} /> Select a chat to start messaging</p>
          </div>
        </div>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">
              <img src={activeChat.avatar} alt={activeChat.name} />
            </div>
            <div className="chat-header-info">
              <h3>{activeChat.name}</h3>
              <p className={isLoading && activeChat.type === 'bot' ? 'status-typing' : ''}>
                {isLoading && activeChat.type === 'bot' 
                  ? 'typing...' 
                  : (activeChat.type === 'bot' ? 'Fact Check Agent • Online' : 'click here for contact info')
                }
              </p>
            </div>
            <div className="header-icons">
              <div className="icon-btn"><Search size={20} /></div>
              <div className="icon-btn"><MoreVertical size={20} /></div>
            </div>
          </div>

          <div className="messages-area">
            <div className="encryption-notice">
              🔒 Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
            </div>

            {activeChat.messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                <div className="message-bubble group-hover-trigger">
                  
                  <div className="message-text" style={{whiteSpace: 'pre-wrap'}}>
                    {formatText(msg.text)}
                  </div>
                  
                  <div className="message-meta">
                    <span className="time">{msg.time}</span>
                    {msg.sender === 'me' && <span className="ticks"><CheckCheck size={14} /></span>}
                  </div>

                  {/* DROPDOWN TRIGGER */}
                  <div 
                    className={`dropdown-arrow ${menuOpenId === msg.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === msg.id ? null : msg.id);
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>

                  {/* DROPDOWN MENU */}
                  {menuOpenId === msg.id && (
                    <div className="dropdown-menu">
                      <div className="menu-item">Reply</div>
                      <div 
                        className="menu-item forward-item" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleForward(msg.text);
                        }}
                      >
                        <CornerUpRight size={16} style={{marginRight:'8px'}} /> Forward to FactSaathi
                      </div>
                      <div className="menu-item">Star message</div>
                      <div className="menu-item">Delete message</div>
                    </div>
                  )}

                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message-row them">
                <div className="message-bubble typing-bubble">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <div className="icon-btn"><Smile size={24} /></div>
            <div className="icon-btn"><Paperclip size={24} /></div>
            
            <div className="input-box">
              <input 
                type="text" 
                placeholder="Type a message" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
            </div>

            {inputText ? (
              <div className="icon-btn send-btn" onClick={handleSend}><Send size={24} /></div>
            ) : (
              <div className="icon-btn"><Mic size={24} /></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;