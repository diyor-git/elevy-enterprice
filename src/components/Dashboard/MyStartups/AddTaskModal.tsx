import {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select.tsx';
import {Plus} from 'lucide-react';
import type {Task, TaskPriority, User} from '@/types/startup.ts';
import {useToast} from '@/hooks/use-toast.ts';

interface AddTaskModalProps {
    users: any;
    onAddTask: (task: Omit<Task, 'id' | 'status' | 'comments' | 'activity'>) => void;
}

function AddTaskModal({users, onAddTask}: AddTaskModalProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [assignee, setAssignee] = useState('');
    const [deadline, setDeadline] = useState('');
    const {toast} = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!title.trim() || !assignee) {
            toast({
                title: 'Missing Fields',
                description: 'Please fill in all required fields.',
                variant: 'destructive',
            });
            return;
        }

        onAddTask({
            title,
            description,
            priority,
            assignee,
            deadline: deadline ? new Date(deadline) : undefined,
        } as Omit<Task, 'id' | 'status' | 'comments' | 'activity'>);

        toast({
            title: 'Task Created',
            description: `"${title}" has been added to the board.`,
        });

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
        setAssignee('');
        setDeadline('');
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4"/>
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-foreground">Create New Task</DialogTitle>
                    <DialogDescription>Add a new task to your kanban board</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Task Title *</label>
                        <Input
                            placeholder="e.g., Design landing page"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-background"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Description</label>
                        <Textarea
                            placeholder="Add task details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="bg-background resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Priority</label>
                            <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
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
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Assignee *</label>
                            <Select value={assignee} onValueChange={setAssignee}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select user"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id} value={user.name}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Deadline</label>
                        <Input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="bg-background"
                        />
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90">
                            Create Task
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddTaskModal;