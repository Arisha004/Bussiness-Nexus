
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

interface ChatPartner {
  id: string;
  name: string;
  role: 'investor' | 'entrepreneur';
  lastMessage?: string;
  lastMessageTimestamp?: string;
}

// Mock data
const mockChatPartners: ChatPartner[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'investor',
    lastMessage: 'Let me know if you have any questions about the investment opportunity.',
    lastMessageTimestamp: '2025-05-09T14:30:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'entrepreneur',
    lastMessage: 'Thanks for your interest! I\'d be happy to discuss our growth strategy.',
    lastMessageTimestamp: '2025-05-08T09:15:00Z'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'investor',
    lastMessage: 'I reviewed your pitch deck and would like to schedule a call.',
    lastMessageTimestamp: '2025-05-07T16:45:00Z'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      senderId: '1',
      receiverId: '123',
      text: 'Hello! I saw your profile and I\'m interested in your startup.',
      timestamp: '2025-05-09T10:30:00Z'
    },
    {
      id: '102',
      senderId: '123',
      receiverId: '1',
      text: 'Thanks for reaching out! I\'d be happy to tell you more about what we\'re building.',
      timestamp: '2025-05-09T11:15:00Z'
    },
    {
      id: '103',
      senderId: '1',
      receiverId: '123',
      text: 'Great! I\'m particularly interested in your approach to reducing carbon emissions. Can you share more details about your technology?',
      timestamp: '2025-05-09T13:20:00Z'
    },
    {
      id: '104',
      senderId: '123',
      receiverId: '1',
      text: 'Absolutely. Our technology combines IoT sensors with machine learning algorithms to optimize industrial processes for maximum efficiency.',
      timestamp: '2025-05-09T13:45:00Z'
    },
    {
      id: '105',
      senderId: '1',
      receiverId: '123',
      text: 'That sounds promising. Have you conducted any pilot projects yet?',
      timestamp: '2025-05-09T14:00:00Z'
    },
    {
      id: '106',
      senderId: '123',
      receiverId: '1',
      text: 'Yes, we\'ve completed two successful pilots with manufacturing companies, achieving a 30% reduction in energy consumption.',
      timestamp: '2025-05-09T14:15:00Z'
    },
    {
      id: '107',
      senderId: '1',
      receiverId: '123',
      text: 'Let me know if you have any questions about the investment opportunity.',
      timestamp: '2025-05-09T14:30:00Z'
    }
  ],
  '2': [
    {
      id: '201',
      senderId: '123',
      receiverId: '2',
      text: 'Hi Michael, I saw your HealthAI startup and I\'m impressed with your AI diagnostics approach.',
      timestamp: '2025-05-08T08:30:00Z'
    },
    {
      id: '202',
      senderId: '2',
      receiverId: '123',
      text: 'Thank you! We\'ve been working hard to improve our accuracy rates.',
      timestamp: '2025-05-08T08:45:00Z'
    },
    {
      id: '203',
      senderId: '123',
      receiverId: '2',
      text: 'I\'d be interested in learning more about your target market and growth plans.',
      timestamp: '2025-05-08T09:00:00Z'
    },
    {
      id: '204',
      senderId: '2',
      receiverId: '123',
      text: 'Thanks for your interest! I\'d be happy to discuss our growth strategy.',
      timestamp: '2025-05-08T09:15:00Z'
    }
  ],
  '3': [
    {
      id: '301',
      senderId: '3',
      receiverId: '123',
      text: 'I found your company through Business Nexus and I\'m interested in learning more.',
      timestamp: '2025-05-07T15:30:00Z'
    },
    {
      id: '302',
      senderId: '123',
      receiverId: '3',
      text: 'Hi Emily, thanks for reaching out! What aspects of our business are you most interested in?',
      timestamp: '2025-05-07T15:45:00Z'
    },
    {
      id: '303',
      senderId: '3',
      receiverId: '123',
      text: 'I\'m particularly interested in your market expansion plans and current traction.',
      timestamp: '2025-05-07T16:00:00Z'
    },
    {
      id: '304',
      senderId: '123',
      receiverId: '3',
      text: 'I\'d be happy to share that information. I\'ve attached our latest investor deck for your review.',
      timestamp: '2025-05-07T16:15:00Z'
    },
    {
      id: '305',
      senderId: '3',
      receiverId: '123',
      text: 'I reviewed your pitch deck and would like to schedule a call.',
      timestamp: '2025-05-07T16:45:00Z'
    }
  ]
};

const Messages: React.FC = () => {
  const { id: urlPartnerId } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const [chatPartners, setChatPartners] = useState<ChatPartner[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(urlPartnerId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const messageEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch chat partners
    const fetchChatPartners = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setChatPartners(mockChatPartners);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chat partners:', error);
        setIsLoading(false);
      }
    };
    
    fetchChatPartners();
  }, []);

  useEffect(() => {
    // Fetch messages when active chat changes
    const fetchMessages = async () => {
      if (!activeChat) return;
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 400));
        const chatMessages = mockMessages[activeChat] || [];
        setMessages(chatMessages);
        
        // Scroll to bottom after messages load
        setTimeout(() => {
          messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, [activeChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !user) return;
    
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      senderId: user.id,
      receiverId: activeChat,
      text: newMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    // Add to messages
    setMessages(prev => [...prev, newMsg]);
    
    // Update last message in chat partners
    setChatPartners(prev => 
      prev.map(partner => 
        partner.id === activeChat 
          ? { 
              ...partner, 
              lastMessage: newMessage.trim(),
              lastMessageTimestamp: new Date().toISOString() 
            } 
          : partner
      )
    );
    
    // Clear input
    setNewMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateForGroup = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-7rem)] flex overflow-hidden bg-white rounded-lg shadow">
        {/* Chat list */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 animate-pulse">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              chatPartners.map(partner => (
                <div
                  key={partner.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    activeChat === partner.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setActiveChat(partner.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-business-100 flex items-center justify-center text-business-600 font-bold">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium truncate">{partner.name}</h3>
                        {partner.lastMessageTimestamp && (
                          <span className="text-xs text-gray-500">
                            {new Date(partner.lastMessageTimestamp).toLocaleDateString(undefined, { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        )}
                      </div>
                      {partner.lastMessage && (
                        <p className="text-xs text-gray-500 truncate">{partner.lastMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Chat window */}
        <div className="hidden md:flex md:flex-col md:w-2/3 lg:w-3/4">
          {activeChat ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center">
                {chatPartners.find(p => p.id === activeChat) && (
                  <>
                    <div className="h-8 w-8 rounded-full bg-business-100 flex items-center justify-center text-business-600 font-bold mr-3">
                      {chatPartners.find(p => p.id === activeChat)?.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-medium">
                        {chatPartners.find(p => p.id === activeChat)?.name}
                      </h2>
                      <p className="text-xs text-gray-500 capitalize">
                        {chatPartners.find(p => p.id === activeChat)?.role}
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => {
                  const isCurrentUser = message.senderId === user?.id;
                  // Check if we need to show date separator
                  const showDateHeader = index === 0 || 
                    formatDateForGroup(messages[index-1].timestamp) !== formatDateForGroup(message.timestamp);
                  
                  return (
                    <React.Fragment key={message.id}>
                      {showDateHeader && (
                        <div className="flex justify-center my-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                            {formatDateForGroup(message.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${
                            isCurrentUser 
                              ? 'bg-business-500 text-white rounded-br-none' 
                              : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 text-right ${
                            isCurrentUser ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messageEndRef} />
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="form-input flex-1"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-2 bg-business-500 text-white rounded-md disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
