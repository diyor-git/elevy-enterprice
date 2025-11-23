import {useState} from 'react';
import {Search} from 'lucide-react';
import {ChatWindow, MessagesList} from "@/components/Dashboard/Messages";


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
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
    messages: Message[];
}

export default function MessagesPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConversation, setSelectedConversation] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: 1,
            name: 'Rashid (TechCorp)',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rashid',
            lastMessage: 'Great, see you tomorrow at the interview!',
            lastMessageTime: '2 hours ago',
            unread: 2,
            messages: [
                {
                    id: 1,
                    conversationId: 1,
                    sender: 'Rashid',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rashid',
                    content: 'Hi Alex! Thanks for applying to our engineering position.',
                    timestamp: '11:30 AM',
                },
                {
                    id: 2,
                    conversationId: 1,
                    sender: 'You',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                    content: 'Thank you! I am very interested in the role.',
                    timestamp: '11:35 AM',
                },
                {
                    id: 3,
                    conversationId: 1,
                    sender: 'Rashid',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rashid',
                    content: 'We would like to schedule an interview for tomorrow at 3 PM. Does that work?',
                    timestamp: '11:45 AM',
                },
                {
                    id: 4,
                    conversationId: 1,
                    sender: 'You',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                    content: 'Perfect! I will be there.',
                    timestamp: '11:50 AM',
                },
                {
                    id: 5,
                    conversationId: 1,
                    sender: 'Rashid',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rashid',
                    content: 'Great, see you tomorrow at the interview!',
                    timestamp: '2 hours ago',
                },
            ],
        },
        {
            id: 2,
            name: 'Amina (AI Platform)',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
            lastMessage: 'Would love to have you on the team!',
            lastMessageTime: '1 day ago',
            unread: 0,
            messages: [
                {
                    id: 1,
                    conversationId: 2,
                    sender: 'Amina',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
                    content: 'Hello! I saw your profile on Elevy and love your background.',
                    timestamp: '10:15 AM',
                },
                {
                    id: 2,
                    conversationId: 2,
                    sender: 'You',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                    content: 'Thank you! I am very interested in your AI platform startup.',
                    timestamp: '10:30 AM',
                },
                {
                    id: 3,
                    conversationId: 2,
                    sender: 'Amina',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
                    content: 'Would love to have you on the team!',
                    timestamp: '1 day ago',
                },
            ],
        },
        {
            id: 3,
            name: 'Karim (AgriTech)',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
            lastMessage: 'Let me know your thoughts on the idea.',
            lastMessageTime: '3 days ago',
            unread: 0,
            messages: [
                {
                    id: 1,
                    conversationId: 3,
                    sender: 'Karim',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
                    content: 'Hi! Interested in joining our agriculture supply chain startup?',
                    timestamp: '9:00 AM',
                },
                {
                    id: 2,
                    conversationId: 3,
                    sender: 'You',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                    content: 'That sounds really interesting! Tell me more about it.',
                    timestamp: '9:15 AM',
                },
                {
                    id: 3,
                    conversationId: 3,
                    sender: 'Karim',
                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
                    content: 'Let me know your thoughts on the idea.',
                    timestamp: '3 days ago',
                },
            ],
        },
    ]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setConversations(
                conversations.map(conv => {
                    if (conv.id === selectedConversation) {
                        return {
                            ...conv,
                            messages: [
                                ...conv.messages,
                                {
                                    id: conv.messages.length + 1,
                                    conversationId: conv.id,
                                    sender: 'You',
                                    senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                                    content: newMessage,
                                    timestamp: 'now',
                                },
                            ],
                            lastMessage: newMessage,
                            lastMessageTime: 'now',
                        };
                    }
                    return conv;
                })
            );
            setNewMessage('');
        }
    };

    if (!isLoggedIn) {
        return <div>Not logged in</div>;
    }

    const currentConversation = conversations.find(c => c.id === selectedConversation);

    return (
        <div className="min-h-screen bg-background">
            <main className="pt-18 h-[90vh] flex flex-col">
                <div className="max-w-7xl mx-auto w-full flex-1 flex gap-6">
                    {/* Conversations List */}
                    <div
                        className="w-full md:w-80 flex flex-col border border-border rounded-lg bg-card overflow-hidden">
                        <div className="p-4 border-b border-border">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                            </div>
                        </div>
                        <MessagesList
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            onSelectConversation={setSelectedConversation}
                            searchQuery={searchQuery}
                        />
                    </div>

                    {/* Chat Window */}
                    {currentConversation && (
                        <div
                            className="flex-1 hidden md:flex flex-col border border-border rounded-lg bg-card overflow-hidden">
                            <ChatWindow
                                conversation={currentConversation}
                                newMessage={newMessage}
                                setNewMessage={setNewMessage}
                                onSendMessage={handleSendMessage}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
