import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import './ChatWidget.css'

// Predefined responses for the chatbot
const botResponses = {
  greeting: "Hi there! I'm your Full Life Financial assistant. How can I help you today?",
  quote: "Great question! Getting a quote is easy and takes less than 2 minutes. You can click the 'Get Free Quote' button, or I can help you understand what coverage you might need. What's most important to you - affordability, coverage amount, or flexibility?",
  coverage: "Coverage needs vary by situation. A general rule is 10-12x your annual income. For a family with a mortgage and kids, $500K-$1M is common. Would you like me to help you estimate your needs?",
  price: "Term life insurance can start as low as $15/month for a healthy 30-year-old! Your actual rate depends on age, health, coverage amount, and term length. Want to get a personalized quote?",
  term: "Term Life Insurance provides coverage for a specific period (10, 20, or 30 years). It's the most affordable option and perfect for young families. The premiums stay fixed for the entire term.",
  whole: "Whole Life Insurance provides lifetime coverage and builds cash value over time. It's more expensive but offers guaranteed death benefit and can be part of your retirement planning.",
  universal: "Universal Life Insurance is flexible - you can adjust premiums and death benefits as your needs change. It also builds cash value with potential for higher returns.",
  final: "Final Expense Insurance (also called burial insurance) covers funeral costs and final expenses. It typically doesn't require a medical exam and is designed for seniors.",
  contact: "You can reach us at (800) 555-LIFE or email info@fulllifefinancial.com. Our licensed agents are available Monday-Friday 8am-8pm and Saturday 9am-5pm EST.",
  agent: "Our agents are licensed insurance professionals who live and work in your community. They'll take the time to understand your needs and find the best coverage for your budget.",
  default: "I'd be happy to help with that! For the most accurate information, I recommend speaking with one of our licensed agents. Would you like to get a free quote or call us at (800) 555-LIFE?"
}

const quickReplies = [
  { text: "Get a quote", key: "quote" },
  { text: "How much coverage?", key: "coverage" },
  { text: "What's the cost?", key: "price" },
  { text: "Contact info", key: "contact" }
]

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: botResponses.greeting, time: new Date() }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()

    if (msg.includes('quote') || msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
      if (msg.includes('quote')) return botResponses.quote
      return botResponses.price
    }
    if (msg.includes('coverage') || msg.includes('how much') || msg.includes('need')) {
      return botResponses.coverage
    }
    if (msg.includes('term life') || msg.includes('term insurance')) {
      return botResponses.term
    }
    if (msg.includes('whole life')) {
      return botResponses.whole
    }
    if (msg.includes('universal')) {
      return botResponses.universal
    }
    if (msg.includes('final expense') || msg.includes('burial') || msg.includes('funeral')) {
      return botResponses.final
    }
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('call') || msg.includes('email')) {
      return botResponses.contact
    }
    if (msg.includes('agent') || msg.includes('representative')) {
      return botResponses.agent
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return botResponses.greeting
    }

    return botResponses.default
  }

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = { type: 'user', text: text.trim(), time: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text)
      setMessages(prev => [...prev, { type: 'bot', text: botResponse, time: new Date() }])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }

  const handleQuickReply = (key) => {
    const reply = quickReplies.find(r => r.key === key)
    if (reply) {
      handleSend(reply.text)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <Bot size={20} />
            </div>
            <div className="chat-header-text">
              <span className="chat-title">Full Life Assistant</span>
              <span className="chat-status">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-avatar">
                {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="message-content typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="quick-replies">
          {quickReplies.map((reply) => (
            <button
              key={reply.key}
              className="quick-reply-btn"
              onClick={() => handleQuickReply(reply.key)}
            >
              {reply.text}
            </button>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="send-btn"
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="chat-badge">1</span>}
      </button>
    </div>
  )
}

export default ChatWidget
