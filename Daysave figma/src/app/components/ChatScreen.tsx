import { Send, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

const examplePrompts = [
  'Show me times I was happy',
  'What was I doing last summer?',
  'Show me memories with Mom',
  'Find photos from the beach',
];

const mockResponses = [
  {
    id: 1,
    type: 'user',
    text: 'Show me times I was happy',
  },
  {
    id: 2,
    type: 'ai',
    text: "I found 12 happy memories for you! Here are some highlights:",
    memories: [
      {
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&h=200&fit=crop',
        caption: 'Baking with Emma',
        date: 'May 20, 2026',
      },
      {
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=200&h=200&fit=crop',
        caption: 'Sunday brunch',
        date: 'May 15, 2026',
      },
    ],
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(mockResponses);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6 flex flex-col">
      <div className="max-w-md mx-auto px-6 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-secondary to-primary p-3 rounded-2xl">
              <Sparkles size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-primary">Memory Chat</h1>
              <p className="text-muted-foreground text-base">
                Ask about your memories
              </p>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        {messages.length <= 2 && (
          <div className="mb-6 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(prompt)}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-2xl text-sm font-medium transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-5 py-3 rounded-3xl rounded-tr-lg max-w-[80%]">
                    <p className="text-base">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="space-y-3 max-w-[85%]">
                    <div className="bg-card border border-border px-5 py-3 rounded-3xl rounded-tl-lg">
                      <p className="text-base">{message.text}</p>
                    </div>
                    {message.memories && (
                      <div className="space-y-2">
                        {message.memories.map((memory, idx) => (
                          <div
                            key={idx}
                            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="flex gap-3 p-3">
                              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                  src={memory.image}
                                  alt={memory.caption}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-base mb-1">
                                  {memory.caption}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {memory.date}
                                </p>
                              </div>
                              <ImageIcon size={20} className="text-secondary flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 pt-3 pb-safe bg-background">
          <div className="bg-card border-2 border-border rounded-3xl p-2 flex items-center gap-2 shadow-sm">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your memories..."
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-lg"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-primary text-primary-foreground p-3 rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
