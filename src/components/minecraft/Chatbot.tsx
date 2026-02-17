import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Minus, Square, Bot, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AI_CONFIG } from "@/data/portfolio-kb";

interface Message {
    role: "user" | "assistant";
    content: string;
    reasoning_details?: string;
    showReasoning?: boolean;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Add a placeholder assistant message for streaming
        const assistantMessageIdx = messages.length + 1;
        setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            reasoning_details: "",
            showReasoning: false
        }]);

        try {
            const apiMessages = [
                { role: "system", content: AI_CONFIG.SYSTEM_PROMPT },
                ...messages,
                userMessage
            ].map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AI_CONFIG.API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "Mithun's Portfolio"
                },
                body: JSON.stringify({
                    model: AI_CONFIG.MODEL,
                    messages: apiMessages,
                    max_tokens: AI_CONFIG.MAX_TOKENS,
                    stream: true // Enable streaming!
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Failed to get response");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error("No reader available");

            let fullContent = "";
            let reasoning = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const dataStr = line.replace("data: ", "").trim();
                        if (dataStr === "[DONE]") continue;

                        try {
                            const data = JSON.parse(dataStr);
                            const delta = data.choices[0].delta;

                            if (delta.content) {
                                fullContent += delta.content;
                            }
                            if (delta.reasoning) {
                                reasoning += delta.reasoning;
                            }

                            // Update the last message with the new content
                            setMessages(prev => {
                                const newMessages = [...prev];
                                const lastIdx = newMessages.length - 1;
                                newMessages[lastIdx] = {
                                    ...newMessages[lastIdx],
                                    content: fullContent,
                                    reasoning_details: reasoning
                                };
                                return newMessages;
                            });
                        } catch (e) {
                            // Ignore parsing errors for partial chunks
                        }
                    }
                }
            }
        } catch (error: any) {
            console.error("Chatbot Error:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastIdx = newMessages.length - 1;
                newMessages[lastIdx] = {
                    ...newMessages[lastIdx],
                    content: `**Error:** ${error.message || "My redstone connection is weak! Please try again."}`
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleReasoning = (index: number) => {
        setMessages(prev => prev.map((msg, i) =>
            i === index ? { ...msg, showReasoning: !msg.showReasoning } : msg
        ));
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-minecraft text-sm">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="chat-toggle"
                        initial={{ scale: 0, rotate: -20, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 20, opacity: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center text-white border-4 border-emerald-700 cursor-pointer pointer-events-auto"
                        onClick={() => setIsOpen(true)}
                    >
                        <MessageSquare className="w-8 h-8" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="chat-window"
                        initial={{ opacity: 0, y: 50, scale: 0.9, originX: "100%", originY: "100%" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`w-[350px] sm:w-[450px] bg-[#2d2d2d] border-4 border-[#1e1e1e] rounded-lg shadow-2xl flex flex-col overflow-hidden ${isMinimized ? 'h-14' : 'h-[600px]'} absolute bottom-0 right-0`}
                    >
                        {/* Header */}
                        <div className="bg-[#1e1e1e] p-3 flex items-center justify-between border-b-2 border-[#121212]">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-emerald-500 rounded border-2 border-emerald-700 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white text-sm tracking-widest uppercase">Steve AI</span>
                                <div className="flex gap-1 ml-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white transition-colors">
                                    {isMinimized ? <Square className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages Area */}
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#212121] scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent"
                                >
                                    {messages.length === 0 && (
                                        <div className="text-center py-10 space-y-4">
                                            <Sparkles className="w-10 h-10 text-emerald-400/50 mx-auto animate-pulse" />
                                            <p className="text-gray-400 text-sm italic px-6">
                                                Ask me anything about Mithun's projects, skills, or experience!
                                            </p>
                                        </div>
                                    )}

                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className="flex gap-2 max-w-[90%]">
                                                {msg.role === 'assistant' && (
                                                    <div className="w-8 h-8 bg-emerald-500 rounded flex-shrink-0 border-2 border-emerald-700 flex items-center justify-center">
                                                        <Bot className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                                <div className="space-y-2 overflow-hidden flex-1">
                                                    {msg.reasoning_details && (
                                                        <div className="border border-emerald-500/20 rounded bg-black/30 overflow-hidden">
                                                            <button
                                                                onClick={() => toggleReasoning(i)}
                                                                className="w-full flex items-center justify-between p-2 text-[10px] text-emerald-500/70 hover:bg-emerald-500/5 transition-colors"
                                                            >
                                                                <span className="flex items-center gap-1">
                                                                    <Sparkles className="w-3 h-3" />
                                                                    Steve's Thinking Process
                                                                </span>
                                                                {msg.showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                            </button>
                                                            <AnimatePresence>
                                                                {msg.showReasoning && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="p-2 pt-0 text-[10px] text-gray-500 italic border-t border-emerald-500/10 leading-relaxed max-h-40 overflow-y-auto"
                                                                    >
                                                                        {msg.reasoning_details}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    )}
                                                    <div className={`p-3 rounded-lg text-sm leading-relaxed prose prose-invert prose-emerald max-w-none ${msg.role === 'user'
                                                        ? 'bg-emerald-600 text-white border-b-4 border-emerald-800'
                                                        : 'bg-[#3d3d3d] text-gray-200 border-b-4 border-[#1e1e1e]'
                                                        }`}>
                                                        {msg.content ? (
                                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                                {msg.content}
                                                            </ReactMarkdown>
                                                        ) : (
                                                            <div className="flex gap-1 py-1">
                                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {msg.role === 'user' && (
                                                    <div className="w-8 h-8 bg-blue-500 rounded flex-shrink-0 border-2 border-blue-700 flex items-center justify-center font-minecraft text-xs text-white">
                                                        M
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-[#1e1e1e] border-t-2 border-[#121212]">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-[#2d2d2d] border-2 border-[#1e1e1e] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={isLoading || !input.trim()}
                                            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded px-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export { Chatbot };
