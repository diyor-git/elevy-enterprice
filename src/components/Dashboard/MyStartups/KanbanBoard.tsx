import {useState} from 'react';
import {GripVertical} from 'lucide-react';
import AddTaskModal from './AddTaskModal.tsx';
import {cn} from '@/lib/utils.ts';
import {Task} from '@/types/startup.ts';
import {Badge} from '@/components/ui/badge.tsx';
import {TaskDetailModal} from "@/components/Dashboard/MyStartups/index.ts";

interface KanbanBoardProps {
    users: Array<{ id: string; name: string; email: string; role: string; avatar: string }>;
    tasks: Task[];
    onUpdateTask: (taskId: string, newStatus: string) => void;
    onAddTask: (task: Omit<Task, 'id' | 'status'> & {
        deadline?: Date;
        description?: string;
        comments?: never;
        activity?: never
    }) => void;
}

interface Column {
    id: string;
    title: string;
    colorClass: string;
}

function KanbanBoard({users, tasks, onUpdateTask, onAddTask}: KanbanBoardProps) {
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns: Column[] = [
        {id: 'todo', title: 'To Do', colorClass: 'bg-blue-500/10 border-blue-500/30'},
        {id: 'in-progress', title: 'In Progress', colorClass: 'bg-yellow-500/10 border-yellow-500/30'},
        {id: 'done', title: 'Done', colorClass: 'bg-green-500/10 border-green-500/30'},
    ];

    const getStatusColor = (status: string): string => {
        const colorMap: Record<string, string> = {
            'todo': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
            'in-progress': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
            'done': 'bg-green-500/20 text-green-700 dark:text-green-400',
        };
        return colorMap[status] || 'bg-gray-500/20';
    };

    const getPriorityColor = (priority?: string): string => {
        const colorMap: Record<string, string> = {
            'critical': 'bg-red-500/20 text-red-700 dark:text-red-400',
            'high': 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
            'medium': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
            'low': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
        };
        return colorMap[priority || ''] || 'bg-gray-500/20';
    };

    const handleDragStart = (task: Task): void => {
        setDraggedTask(task);
    };

    const handleDragOver = (e: React.DragEvent): void => {
        e.preventDefault();
    };

    const handleDrop = (columnId: string): void => {
        if (draggedTask) {
            onUpdateTask(draggedTask.id, columnId);
            setDraggedTask(null);
        }
    };

    const handleTaskClick = (task: Task): void => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Task Board</h2>
                    <p className="text-muted-foreground text-sm">Drag and drop cards to update task status, click to
                        view details</p>
                </div>
                <AddTaskModal users={users} onAddTask={onAddTask}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(column.id)}
                        className={cn(
                            'min-h-96 p-4 rounded-lg border-2 border-dashed',
                            column.colorClass
                        )}
                    >
                        <h3 className="font-semibold mb-4 text-lg text-foreground">{column.title}</h3>
                        <div className="space-y-3">
                            {tasks
                                .filter((task) => task.status === column.id)
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        draggable
                                        onDragStart={() => handleDragStart(task)}
                                        onClick={() => handleTaskClick(task)}
                                        className="bg-card border border-border rounded-lg p-4 cursor-move hover:shadow-md transition-shadow active:opacity-50"
                                    >
                                        <div className="flex gap-3">
                                            <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1"/>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-foreground mb-2">{task.title}</p>
                                                <div className="space-y-2">
                                                    {task.priority && (
                                                        <Badge
                                                            className={cn('text-xs', getPriorityColor(task.priority))}>
                                                            {task.priority}
                                                        </Badge>
                                                    )}
                                                    <div className="flex items-center justify-between gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {task.assignee}
                                                        </Badge>
                                                        <Badge className={cn('text-xs', getStatusColor(task.status))}>
                                                            {task.status.replace('-', ' ')}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedTask && (
                <TaskDetailModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedTask(null);
                    }}
                    task={selectedTask}
                    onUpdateTask={(updates) => {
                        console.log('[v0] Task updated:', updates);
                    }}
                />
            )}
        </div>
    );
}


export default KanbanBoard;