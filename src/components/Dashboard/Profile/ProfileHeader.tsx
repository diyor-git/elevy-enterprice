import {Mail, MapPin, Share2} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string;
    location: string;
    avatar: string;
}

interface ProfileHeaderProps {
    user: User;
}

function ProfileHeader({user}: ProfileHeaderProps) {
    return (
        <div className="">
            <div className="max-w-7xl mx-auto pb-5">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-24 h-24 rounded-full border-4 border-primary"
                    />
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                        <p className="text-lg text-primary font-medium mb-2 capitalize">{user.role}</p>
                        <p className="text-muted-foreground mb-4">{user.bio}</p>
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4"/>
                                {user.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4"/>
                                {user.location}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Share2 className="w-4 h-4 mr-2"/>
                            Share Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
;