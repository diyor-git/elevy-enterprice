import {useEffect, useRef, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Send} from 'lucide-react';
import type {Message} from '@/types/startup.ts';

interface TeamChatProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
}

function TeamChat({messages, onSendMessage}: TeamChatProps) {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const handleSend = (): void => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <Card className="flex flex-col h-96 md:h-screen lg:h-96 xl:h-full">
            <CardHeader className="border-b border-border">
                <CardTitle className="text-foreground">Team Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 overflow-hidden py-4">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p className="text-sm">No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className="flex gap-3">
                                <div className="text-2xl flex-shrink-0">👤</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-semibold text-sm text-foreground">{msg.author}</span>
                                        <span
                                            className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                                    </div>
                                    <p className="text-sm text-foreground break-words">{msg.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef}/>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                    <Input
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 bg-background"
                    />
                    <Button onClick={handleSend} size="sm" className="gap-2">
                        <Send className="w-4 h-4"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default TeamChat;