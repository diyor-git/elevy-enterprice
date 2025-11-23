import {Badge} from '@/components/ui/badge.tsx';

interface Conversation {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}

interface MessagesListProps {
    conversations: Conversation[];
    selectedConversation: number;
    onSelectConversation: (id: number) => void;
    searchQuery: string;
}

function MessagesList({
                          conversations,
                          selectedConversation,
                          onSelectConversation,
                          searchQuery,
                      }: MessagesListProps) {
    const filtered = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto">
            {filtered.map(conversation => (
                <button
                    key={conversation.id}
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`w-full text-left p-4 border-b border-border hover:bg-muted transition cursor-pointer ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                    }`}
                >
                    <div className="flex gap-3">
                        <img
                            src={conversation.avatar || "/placeholder.svg"}
                            alt={conversation.name}
                            className="w-12 h-12 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-semibold truncate">{conversation.name}</h3>
                                {conversation.unread > 0 && (
                                    <Badge className="text-xs flex-shrink-0">{conversation.unread}</Badge>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {conversation.lastMessageTime}
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}

export default MessagesList;