import {Button} from '@/components/ui/button.tsx';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import type {User} from '@/types/startup.ts';

interface TeamMemberModalProps {
    member: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRemove?: (memberId: string) => void;
    isOwner?: boolean;
}

function TeamMemberModal({member, open, onOpenChange, onRemove, isOwner = false}: TeamMemberModalProps) {

    if (!member) return null;

    const handleSendMessage = () => {
        // Navigate to messages page with member as recipient
        // router.push(`/messages?recipient=${member.id}&name=${encodeURIComponent(member.name)}`);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Team Member Details</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6">
                    {/* Avatar */}
                    <div
                        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-6xl border-2 border-primary">
                        {member.avatar}
                    </div>

                    {/* Member Info */}
                    <div className="w-full text-center">
                        <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                        <p className="text-primary font-semibold mb-4">{member.role}</p>

                        <div className="bg-muted rounded-lg p-4 space-y-3 text-left">
                            {/* Email */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Email</p>
                                <a href={`mailto:${member.email}`}
                                   className="text-sm text-primary hover:underline cursor-pointer">
                                    {member.email}
                                </a>
                            </div>

                            {/* Location */}
                            {member.location && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                                    <p className="text-sm text-foreground">{member.location}</p>
                                </div>
                            )}

                            {/* Bio */}
                            {member.bio && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Bio</p>
                                    <p className="text-sm text-foreground">{member.bio}</p>
                                </div>
                            )}

                            {/* Joined Date */}
                            {member.joinedDate && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Joined</p>
                                    <p className="text-sm text-foreground">
                                        {new Date(member.joinedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            )}

                            {/* LinkedIn */}
                            {member.linkedIn && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">LinkedIn</p>
                                    <a
                                        href={member.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline cursor-pointer"
                                    >
                                        View Profile
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1 cursor-pointer"
                            onClick={handleSendMessage}
                        >
                            Send Message
                        </Button>

                        {isOwner && onRemove && (
                            <Button
                                variant="destructive"
                                className="flex-1 cursor-pointer"
                                onClick={() => {
                                    onRemove(member.id);
                                    onOpenChange(false);
                                }}
                            >
                                Remove
                            </Button>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full cursor-pointer"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TeamMemberModal;