import React, {useState} from 'react';
import {Brain, Briefcase, ChevronRight, FileText, Lightbulb, MessageSquare, Users, Zap} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Badge} from '@/components/ui/badge.tsx';

interface AITool {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    category: string;
}

const aiTools: AITool[] = [
    {
        id: 'learning-mentor',
        title: 'AI-наставник по обучению',
        description: 'Объясняет сложные темы простым языком, помогает с домашними заданиями',
        icon: <Brain className="w-6 h-6"/>,
        color: 'bg-blue-500',
        category: 'Обучение'
    },
    {
        id: 'career-consultant',
        title: 'AI-консультант по карьере',
        description: 'Подбирает стажировки, даёт советы по развитию карьеры',
        icon: <Briefcase className="w-6 h-6"/>,
        color: 'bg-purple-500',
        category: 'Карьера'
    },
    {
        id: 'startup-mentor',
        title: 'AI-ментор стартапов',
        description: 'Оценивает бизнес-идеи, помогает с питчами и стратегией',
        icon: <Lightbulb className="w-6 h-6"/>,
        color: 'bg-yellow-500',
        category: 'Стартапы'
    },
    {
        id: 'resume-builder',
        title: 'AI-конструктор резюме',
        description: 'Создаёт профессиональное резюме под конкретную вакансию',
        icon: <FileText className="w-6 h-6"/>,
        color: 'bg-green-500',
        category: 'Карьера'
    },
    {
        id: 'soft-skills',
        title: 'AI-тренер soft skills',
        description: 'Помогает развивать коммуникацию, лидерство и эмоциональный интеллект',
        icon: <Users className="w-6 h-6"/>,
        color: 'bg-pink-500',
        category: 'Развитие'
    },
    {
        id: 'chat-assistant',
        title: 'Общий AI-ассистент',
        description: 'Отвечает на любые вопросы, помогает с задачами',
        icon: <MessageSquare className="w-6 h-6"/>,
        color: 'bg-cyan-500',
        category: 'Общее'
    }
];

export default function AIZonePage() {
    const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState('');

    const handleToolSelect = (tool: AITool) => {
        setSelectedTool(tool);
        setConversation([]);
        setUserInput('');
        setStreamingMessage('');
    };

    const handleSendMessage = async () => {
        if (!userInput.trim() || !selectedTool || isStreaming) return;

        const userMessage = {role: 'user', content: userInput};
        const updatedConversation = [...conversation, userMessage];
        setConversation(updatedConversation);
        setUserInput('');
        setIsStreaming(true);
        setStreamingMessage('');

        try {
            let fullResponse = '';


            setConversation([...updatedConversation, {role: 'assistant', content: fullResponse}]);
            setStreamingMessage('');
            setIsStreaming(false);
        } catch (error) {
            console.error('AI Error:', error);
            setConversation([
                ...updatedConversation,
                {role: 'assistant', content: 'Извините, произошла ошибка. Пожалуйста, попробуйте снова.'}
            ]);
            setIsStreaming(false);
            setStreamingMessage('');
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="container-custom pb-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                        AI-зона <span className="gradient-text">Elevy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Умные инструменты для обучения, карьеры и развития стартапов
                    </p>
                </div>
            </section>

            {/* AI Tools Grid */}
            <section className="container-custom pb-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiTools.map((tool, index) => (
                        <Card
                            key={tool.id}
                            className="card-hover cursor-pointer group"
                            style={{animationDelay: `${index * 100}ms`}}
                            onClick={() => handleToolSelect(tool)}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className={`${tool.color} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        {tool.icon}
                                    </div>
                                    <Badge variant="secondary">{tool.category}</Badge>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors">
                                    {tool.title}
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    {tool.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between transition-colors"
                                    onClick={() => handleToolSelect(tool)}
                                >
                                    Попробовать
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* AI Chat Interface */}
            {selectedTool && (
                <section className="container-custom pb-16">
                    <Card className="max-w-4xl mx-auto shadow-xl">
                        <CardHeader className="border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`${selectedTool.color} p-2 rounded-lg text-white`}>
                                        {selectedTool.icon}
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">{selectedTool.title}</CardTitle>
                                        <CardDescription>{selectedTool.description}</CardDescription>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedTool(null)}
                                >
                                    Закрыть
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            {/* Conversation */}
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {conversation.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Zap className="w-12 h-12 mx-auto mb-3 text-blue-500"/>
                                        <p>Начните диалог с AI-помощником</p>
                                    </div>
                                )}

                                {conversation.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-4 rounded-2xl ${
                                                msg.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                            }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Streaming Message */}
                                {isStreaming && streamingMessage && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="max-w-[80%] p-4 rounded-2xl bg-muted">
                                            <p className="text-sm whitespace-pre-wrap">
                                                {streamingMessage}
                                                <span
                                                    className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse">▋</span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="flex gap-3">
                                <Textarea
                                    placeholder="Задайте вопрос AI-помощнику..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    className="min-h-[60px] resize-none"
                                    disabled={isStreaming}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!userInput.trim() || isStreaming}
                                    className="h-[60px] px-6"
                                >
                                    <MessageSquare className="w-5 h-5"/>
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                Enter для отправки, Shift+Enter для новой строки
                            </p>
                        </CardContent>
                    </Card>
                </section>
            )}
        </div>
    );
}
