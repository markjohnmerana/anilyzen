import { useState, useRef, useEffect } from 'react'
import { chatWithAnilyzen } from '../api/gemini'
import { useSensorData }    from '../hooks/useSensorData'
import { useSensor } from '../context/SensorContext'

const SUGGESTED = [
  'Is my pond healthy right now?',
  'What does my pH level mean?',
  'How can I improve oxygen levels?',
  'Is my pond ready for harvesting?',
]

function ChatWidget() {
  const { latest }                      = useSensor()
  const [open, setOpen]                 = useState(false)
  const [messages, setMessages]         = useState([
    {
      role:    'assistant',
      content: 'Hi! I am Anilyzen AI. I can see your live pond data. Ask me anything about your crayfish pond!',
    }
  ])
  const [input, setInput]               = useState('')
  const [loading, setLoading]           = useState(false)
  const messagesEndRef                  = useRef(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const newMessages = [
      ...messages,
      { role: 'user', content: userText }
    ]

    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await chatWithAnilyzen(newMessages, latest)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: reply }
      ])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I could not process that. Please try again.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const styles = {
    // Floating button
    fab: {
      position:     'fixed',
      bottom:       '72px',
      right:        '16px',
      width:        '48px',
      height:       '48px',
      borderRadius: '50%',
      background:   '#00c896',
      border:       'none',
      cursor:       'pointer',
      display:      'flex',
      alignItems:   'center',
      justifyContent: 'center',
      zIndex:       200,
      boxShadow:    '0 4px 12px #00c89644',
      transition:   'transform 0.2s',
    },
    // Chat window
    window: {
      position:      'fixed',
      bottom:        '130px',
      right:         '16px',
      width:         '340px',
      height:        '480px',
      background:    '#1a1f2e',
      border:        '1px solid #2a3040',
      borderRadius:  '16px',
      display:       'flex',
      flexDirection: 'column',
      zIndex:        200,
      overflow:      'hidden',
      boxShadow:     '0 8px 32px #00000066',
    },
    // Header
    header: {
      padding:        '1rem',
      borderBottom:   '1px solid #2a3040',
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
      background:     '#141820',
    },
    headerLeft: {
      display:    'flex',
      alignItems: 'center',
      gap:        '0.5rem',
    },
    headerDot: {
      width:        '8px',
      height:       '8px',
      borderRadius: '50%',
      background:   '#00c896',
      animation:    'pulse 2s infinite',
    },
    headerTitle: {
      fontSize:   '0.88rem',
      fontWeight: '600',
      color:      '#e2e8f0',
    },
    headerSub: {
      fontSize: '0.7rem',
      color:    '#8892a4',
    },
    closeBtn: {
      background: 'none',
      border:     'none',
      color:      '#8892a4',
      cursor:     'pointer',
      fontSize:   '1.1rem',
      padding:    '0 4px',
    },
    // Messages
    messages: {
      flex:       1,
      overflowY:  'auto',
      padding:    '1rem',
      display:    'flex',
      flexDirection: 'column',
      gap:        '0.75rem',
    },
    // Suggested questions
    suggested: {
      padding:    '0 1rem 0.75rem',
      display:    'flex',
      flexWrap:   'wrap',
      gap:        '0.4rem',
    },
    chip: {
      background:   '#2a3040',
      color:        '#8892a4',
      border:       '1px solid #3a4050',
      borderRadius: '99px',
      padding:      '3px 10px',
      fontSize:     '0.7rem',
      cursor:       'pointer',
      transition:   'all 0.15s',
    },
    // Message bubble
    bubble: (role) => ({
      maxWidth:     '85%',
      padding:      '0.6rem 0.9rem',
      borderRadius: role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
      background:   role === 'user' ? '#00c896' : '#2a3040',
      color:        role === 'user' ? '#0f1117' : '#e2e8f0',
      fontSize:     '0.82rem',
      lineHeight:   1.5,
      alignSelf:    role === 'user' ? 'flex-end' : 'flex-start',
      whiteSpace:   'pre-wrap',
    }),
    // Input area
    inputArea: {
      padding:     '0.75rem',
      borderTop:   '1px solid #2a3040',
      display:     'flex',
      gap:         '0.5rem',
      alignItems:  'flex-end',
      background:  '#141820',
    },
    input: {
      flex:        1,
      background:  '#2a3040',
      border:      '1px solid #3a4050',
      borderRadius: '10px',
      padding:     '0.6rem 0.75rem',
      color:       '#e2e8f0',
      fontSize:    '0.82rem',
      resize:      'none',
      outline:     'none',
      fontFamily:  'inherit',
      maxHeight:   '80px',
    },
    sendBtn: {
      background:   loading ? '#2a3040' : '#00c896',
      border:       'none',
      borderRadius: '10px',
      width:        '36px',
      height:       '36px',
      cursor:       loading ? 'not-allowed' : 'pointer',
      display:      'flex',
      alignItems:   'center',
      justifyContent: 'center',
      flexShrink:   0,
      transition:   'background 0.2s',
    },
  }

  const showSuggested = messages.length === 1

  return (
    <>
      {/* Floating button */}
      <button style={styles.fab} onClick={() => setOpen(o => !o)}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1117" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f1117" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={styles.window}>

          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.headerDot}></div>
              <div>
                <div style={styles.headerTitle}>Anilyzen AI</div>
                <div style={styles.headerSub}>
                  {latest ? 'Live pond data connected' : 'No sensor data'}
                </div>
              </div>
            </div>
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={styles.bubble(msg.role)}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={styles.bubble('assistant')}>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {showSuggested && (
            <div style={styles.suggested}>
              {SUGGESTED.map((q, i) => (
                <span
                  key={i}
                  style={styles.chip}
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </span>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={styles.inputArea}>
            <textarea
              style={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your pond..."
              rows={1}
            />
            <button style={styles.sendBtn} onClick={() => sendMessage()} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={loading ? '#8892a4' : '#0f1117'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  )
}

export default ChatWidget