import {useState} from 'react';
import {ProfileHeader, ProfileTabs} from "@/components/Dashboard/Profile";


export default function ProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'student',
        bio: 'Passionate about tech and entrepreneurship',
        location: 'Tashkent, Uzbekistan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        skills: ['React', 'Node.js', 'Python', 'Product Management'],
        resume: null,
        applications: 3,
        savedInternships: 5,
    });

    const [activeTab, setActiveTab] = useState('overview');

    if (!isLoggedIn) {
        return <div>Not logged in</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            {/*<Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>*/}
            <div>
                <ProfileHeader user={user}/>
                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} user={user} setUser={setUser}/>
            </div>
        </div>
    );
}
