import {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx';
import {useToast} from '@/hooks/use-toast.ts';
import {Startup} from '@/types/startup.ts';

interface ProjectSettingsModalProps {
    startup: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedStartup: Startup) => void;
}

function ProjectSettingsModal({
                                  startup,
                                  open,
                                  onOpenChange,
                                  onSave,
                              }: ProjectSettingsModalProps) {
    const [formData, setFormData] = useState({
        name: startup.name,
        description: startup.description,
        stage: startup.stage,
        teamSize: startup.teamSize,
    });
    const {toast} = useToast();

    const handleSave = () => {
        if (!formData.name.trim()) {
            toast({
                title: 'Error',
                description: 'Project name is required',
                variant: 'destructive',
            });
            return;
        }

        onSave({
            ...startup,
            name: formData.name,
            description: formData.description,
            stage: formData.stage as any,
            teamSize: formData.teamSize,
        });

        toast({
            title: 'Success',
            description: 'Project settings updated successfully',
        });

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Project Settings</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Project Name */}
                    <div>
                        <Label htmlFor="project-name" className="text-base font-semibold mb-2 block">
                            Project Name
                        </Label>
                        <Input
                            id="project-name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Enter project name"
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-base font-semibold mb-2 block">
                            Bio / Description
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Enter project description"
                            rows={4}
                            className="cursor-pointer resize-none"
                        />
                    </div>

                    {/* Stage */}
                    <div>
                        <Label htmlFor="stage" className="text-base font-semibold mb-2 block">
                            Stage
                        </Label>
                        <Select value={formData.stage}
                                onValueChange={(value) => setFormData({...formData, stage: value})}>
                            <SelectTrigger id="stage" className="cursor-pointer">
                                <SelectValue placeholder="Select stage"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="idea">Idea</SelectItem>
                                <SelectItem value="mvp">MVP</SelectItem>
                                <SelectItem value="early-stage">Early Stage</SelectItem>
                                <SelectItem value="growth">Growth</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Team Size */}
                    <div>
                        <Label htmlFor="team-size" className="text-base font-semibold mb-2 block">
                            Team Size
                        </Label>
                        <Input
                            id="team-size"
                            type="number"
                            min="1"
                            value={formData.teamSize}
                            onChange={(e) => setFormData({...formData, teamSize: parseInt(e.target.value) || 1})}
                            placeholder="Enter team size"
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end pt-4 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="cursor-pointer"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProjectSettingsModal;