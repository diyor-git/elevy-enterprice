import {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select.tsx';
import {AlertCircle, Calendar, Check, Clock, MessageSquare, X} from 'lucide-react';
import type {Activity, Comment, Task} from '@/types/startup.ts';
import {cn} from '@/lib/utils.ts';
import {useToast} from '@/hooks/use-toast.ts';

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onUpdateTask?: (updates: Partial<Task>) => void;
}

function TaskDetailModal({isOpen, onClose, task, onUpdateTask}: TaskDetailModalProps) {
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Comment[]>(task.comments || []);
    const [activity, setActivity] = useState<Activity[]>(task.activity || []);
    const {toast} = useToast();

    const getPriorityColor = (priority?: string): string => {
        const colorMap: Record<string, string> = {
            'critical': 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30',
            'high': 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30',
            'medium': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
            'low': 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
        };
        return colorMap[priority || ''] || 'bg-gray-500/20 text-gray-700';
    };

    const getStatusColor = (status: string): string => {
        const colorMap: Record<string, string> = {
            'todo': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
            'in-progress': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
            'done': 'bg-green-500/20 text-green-700 dark:text-green-400',
        };
        return colorMap[status] || 'bg-gray-500/20';
    };

    const handleAddComment = (): void => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: Math.random().toString(),
                author: 'Current User',
                text: newComment,
                timestamp: new Date(),
            };
            setComments([...comments, comment]);
            setActivity([
                ...activity,
                {
                    id: Math.random().toString(),
                    author: 'Current User',
                    action: 'added a comment',
                    timestamp: new Date(),
                },
            ]);
            toast({
                title: 'Comment Added',
                description: 'Your comment has been posted.',
            });
            setNewComment('');
        }
    };

    const handleSaveChanges = (): void => {
        onUpdateTask?.(editedTask);
        toast({
            title: 'Task Updated',
            description: 'Changes have been saved successfully.',
        });
        setEditMode(false);
    };

    const formatDate = (date?: Date): string => {
        if (!date) return 'Not set';
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    };

    const formatTime = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-96 md:max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex items-start justify-between pr-4">
                    <div className="flex-1">
                        <DialogTitle className="text-2xl mb-2 text-foreground">{editedTask.title}</DialogTitle>
                        <div className="flex gap-2">
                            <Badge variant="outline" className={getStatusColor(editedTask.status)}>
                                {editedTask.status.replace('-', ' ')}
                            </Badge>
                            {editedTask.priority && (
                                <Badge className={getPriorityColor(editedTask.priority)}>
                                    {editedTask.priority}
                                </Badge>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <MessageSquare className="w-4 h-4"/>
                                Description
                            </h3>
                            {editMode ? (
                                <Textarea
                                    value={editedTask.description || ''}
                                    onChange={(e) =>
                                        setEditedTask({...editedTask, description: e.target.value})
                                    }
                                    placeholder="Add a description..."
                                    className="min-h-24 bg-background resize-none"
                                />
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    {editedTask.description || 'No description provided'}
                                </p>
                            )}
                        </div>

                        {/* Comments Section */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <MessageSquare className="w-4 h-4"/>
                                Comments ({comments.length})
                            </h3>

                            <div className="space-y-3 max-h-40 overflow-y-auto">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="bg-muted/50 rounded-lg p-3">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span
                                                className="font-semibold text-sm text-foreground">{comment.author}</span>
                                            <span className="text-xs text-muted-foreground">
                        {formatTime(comment.timestamp)}
                      </span>
                                        </div>
                                        <p className="text-sm text-foreground">{comment.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleAddComment();
                                        }
                                    }}
                                    className="flex-1 bg-background"
                                />
                                <Button onClick={handleAddComment} size="sm">
                                    <Check className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>

                        {/* Activity Log */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <Clock className="w-4 h-4"/>
                                Activity
                            </h3>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {activity.length === 0 ? (
                                    <p className="text-xs text-muted-foreground">No activity yet</p>
                                ) : (
                                    activity.map((item) => (
                                        <div key={item.id} className="text-xs text-muted-foreground flex gap-2">
                                            <span className="font-medium text-foreground">{item.author}</span>
                                            <span>{item.action}</span>
                                            <span>{formatTime(item.timestamp)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground block">Status</label>
                            {editMode ? (
                                <Select
                                    value={editedTask.status}
                                    onValueChange={(value: any) =>
                                        setEditedTask({
                                            ...editedTask,
                                            status: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">To Do</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Badge
                                    className={cn('w-full text-center justify-center', getStatusColor(editedTask.status))}>
                                    {editedTask.status.replace('-', ' ')}
                                </Badge>
                            )}
                        </div>

                        {/* Priority */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground block flex items-center gap-2">
                                <AlertCircle className="w-4 h-4"/>
                                Priority
                            </label>
                            {editMode ? (
                                <Select
                                    value={editedTask.priority || 'medium'}
                                    onValueChange={(value: any) =>
                                        setEditedTask({
                                            ...editedTask,
                                            priority: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="critical">Critical</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Badge className={getPriorityColor(editedTask.priority)}>
                                    {editedTask.priority || 'medium'}
                                </Badge>
                            )}
                        </div>

                        {/* Assignee */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground block">Assignee</label>
                            {editMode ? (
                                <Input
                                    value={editedTask.assignee}
                                    onChange={(e) => setEditedTask({...editedTask, assignee: e.target.value})}
                                    placeholder="Assign to..."
                                    className="bg-background"
                                />
                            ) : (
                                <Badge variant="outline">{editedTask.assignee}</Badge>
                            )}
                        </div>

                        {/* Deadline */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground block flex items-center gap-2">
                                <Calendar className="w-4 h-4"/>
                                Deadline
                            </label>
                            {editMode ? (
                                <Input
                                    type="date"
                                    value={
                                        editedTask.deadline
                                            ? new Date(editedTask.deadline).toISOString().split('T')[0]
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setEditedTask({
                                            ...editedTask,
                                            deadline: e.target.value ? new Date(e.target.value) : undefined,
                                        })
                                    }
                                    className="bg-background"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">{formatDate(editedTask.deadline)}</p>
                            )}
                        </div>

                        {/* Edit Button */}
                        <div className="pt-4 border-t border-border space-y-2">
                            {editMode ? (
                                <>
                                    <Button onClick={handleSaveChanges}
                                            className="w-full bg-primary hover:bg-primary/90">
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setEditedTask(task);
                                            setEditMode(false);
                                        }}
                                        className="w-full"
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setEditMode(true)} variant="outline" className="w-full">
                                    Edit Task
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TaskDetailModal;