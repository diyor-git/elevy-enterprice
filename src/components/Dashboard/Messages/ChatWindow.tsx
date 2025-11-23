import {Send} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';

interface Message {
    id: number;
    conversationId: number;
    sender: string;
    senderAvatar: string;
    content: string;
    timestamp: string;
}

interface Conversation {
    id: number;
    name: string;
    avatar: string;
    messages: Message[];
}

interface ChatWindowProps {
    conversation: Conversation;
    newMessage: string;
    setNewMessage: (message: string) => void;
    onSendMessage: () => void;
}

function ChatWindow({
                        conversation,
                        newMessage,
                        setNewMessage,
                        onSendMessage,
                    }: ChatWindowProps) {
    return (
        <>
            {/* Header */}
            <div className="border-b border-border p-4 flex items-center gap-3">
                <img
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h2 className="font-semibold">{conversation.name}</h2>
                    <p className="text-xs text-muted-foreground">Active now</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.messages.map(message => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === 'You' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`flex gap-3 max-w-xs ${
                                message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'
                            }`}
                        >
                            <img
                                src={message.senderAvatar || "/placeholder.svg"}
                                alt={message.sender}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div>
                                <div
                                    className={`rounded-lg px-4 py-2 ${
                                        message.sender === 'You'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-muted text-foreground rounded-bl-none'
                                    }`}
                                >
                                    <p className="text-sm break-words">{message.content}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onSendMessage();
                            }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <Button
                        onClick={onSendMessage}
                        className="cursor-pointer gap-2"
                        disabled={!newMessage.trim()}
                    >
                        <Send className="w-4 h-4"/>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;