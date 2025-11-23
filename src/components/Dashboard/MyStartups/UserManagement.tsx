import {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Plus} from 'lucide-react';
import {TeamMemberModal} from '@/components/Dashboard/MyStartups/index.ts';
import {User} from '@/types/startup.ts';

interface UserManagementProps {
    users: User[];
    onAddUser: (name: string, email: string, role: string) => void;
    onRemoveUser: (userId: string) => void;
}

function UserManagement({users, onAddUser, onRemoveUser}: UserManagementProps) {
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [formData, setFormData] = useState({name: '', email: '', role: ''});
    const [selectedMember, setSelectedMember] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.role) {
            onAddUser(formData.name, formData.email, formData.role);
            setFormData({name: '', email: '', role: ''});
            setIsAddingUser(false);
        }
    };

    const handleMemberClick = (member: User) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Team Members</h2>
                    <p className="text-muted-foreground">Manage your startup team</p>
                </div>
                <Button onClick={() => setIsAddingUser(!isAddingUser)} className="gap-2">
                    <Plus className="w-4 h-4"/>
                    Add Member
                </Button>
            </div>

            {isAddingUser && (
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle>Add New Team Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                            <Input
                                placeholder="Role (e.g., CEO, Designer, Developer)"
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                required
                            />
                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1">
                                    Add Member
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setIsAddingUser(false)}
                                        className="flex-1">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleMemberClick(user)}
                    >
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="text-4xl flex-shrink-0">{user.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold truncate">{user.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{user.role}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <TeamMemberModal
                member={selectedMember}
                open={showModal}
                onOpenChange={setShowModal}
                onRemove={onRemoveUser}
                isOwner={true}
            />
        </div>
    );
}

export default UserManagement;