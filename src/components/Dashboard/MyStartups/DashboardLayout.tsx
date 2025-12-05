import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
    Briefcase,
    Building2,
    ChartNoAxesGantt,
    ChevronDown,
    ChevronRight,
    FolderDot,
    Menu,
    MessageSquare,
    Plus,
    Rocket,
    Send,
    Sparkles,
    Target,
    Trophy,
    UserPen,
    X,
} from 'lucide-react';
import {cn} from '@/lib/utils.ts';
import {Button} from '@/components/ui/button.tsx';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    children?: {
        title: string;
        href: string;
        icon: React.ElementType;
    }[];
}

const navItems: NavItem[] = [
    {
        title: 'Internships',
        href: '/internships',
        icon: Briefcase,
        children: [
             {
                title: 'Internships',
                href: '/internships',
                icon: ChartNoAxesGantt,
            },
            // {
            //     title: 'Create',
            //     href: '/internships/create',
            //     icon: Plus,
            // },
        ]
    },
    {
        title: 'Startups',
        href: '/startups',
        icon: FolderDot,
    },
    {
        title: 'My Startups',
        href: '/my-startups',
        icon: Rocket,
        children: [
            {
                title: 'Create Startup',
                href: '/my-startups/create',
                icon: Plus,
            },
            {
                title: 'Projects',
                href: '/my-startups/',
                icon: Target,
            },
            // {
            //     title: 'Team',
            //     href: '/MyStartups/team',
            //     icon: Users,
            // },
            // {
            //     title: 'Chat',
            //     href: '/MyStartups/chat',
            //     icon: MessageCircle,
            // },
            // {
            //     title: 'Tasks',
            //     href: '/MyStartups/tasks',
            //     icon: ListTodo,
            // },
        ],
    },
    // {
    //     title: 'Companies',
    //     href: '/companies',
    //     icon: Building2,
    // },
    // {
    //     title: 'Forum',
    //     href: '/forum',
    //     icon: MessageSquare,
    // },
    // {
    //     title: 'AI Zone',
    //     href: '/ai-zone',
    //     icon: Sparkles,
    // },
    {
        title: 'Achievements',
        href: '/achievements',
        icon: Trophy,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: UserPen,
    },
    // {
    //     title: 'Messages',
    //     href: '/messages',
    //     icon: Send,
    // },
];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>(['My Startups']);
    const location = useLocation();

    const toggleExpanded = (title: string) => {
        setExpandedItems((prev) =>
            prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
        );
    };

    const isActive = (href: string) => {
        return location.pathname === href || location.pathname.startsWith(href + '/');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
                <Link to="/" className="flex items-center gap-2 group">
                    <div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform group-hover:scale-110">
                        <Rocket className="w-5 h-5 text-white"/>
                    </div>
                    {isSidebarOpen && (
                        <span
                            className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Elevy
            </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isExpanded = expandedItems.includes(item.title);
                        const hasChildren = item.children && item.children.length > 0;
                        const isItemActive = isActive(item.href);

                        return (
                            <li key={item.title}>
                                <div className="flex flex-col">
                                    {hasChildren ? (
                                        <button
                                            onClick={() => toggleExpanded(item.title)}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full group',
                                                isItemActive
                                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                            )}
                                        >
                                            <item.icon className="w-5 h-5 shrink-0"/>
                                            {isSidebarOpen && (
                                                <>
                          <span className="flex-1 text-left text-sm font-medium">
                            {item.title}
                          </span>
                                                    {isExpanded ? (
                                                        <ChevronDown className="w-4 h-4 shrink-0"/>
                                                    ) : (
                                                        <ChevronRight className="w-4 h-4 shrink-0"/>
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                                                isItemActive
                                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                            )}
                                        >
                                            <item.icon className="w-5 h-5 shrink-0"/>
                                            {isSidebarOpen && (
                                                <span className="text-sm font-medium">{item.title}</span>
                                            )}
                                        </Link>
                                    )}

                                    {/* Children */}
                                    {hasChildren && isExpanded && isSidebarOpen && (
                                        <ul className="ml-8 mt-1 space-y-1">
                                            {item.children?.map((child) => {
                                                const isChildActive = isActive(child.href);
                                                return (
                                                    <li key={child.href}>
                                                        <Link
                                                            to={child.href}
                                                            className={cn(
                                                                'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm',
                                                                isChildActive
                                                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                                                    : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                                                            )}
                                                        >
                                                            <child.icon className="w-4 h-4 shrink-0"/>
                                                            <span>{child.title}</span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            <div className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold text-sm">JD</span>
                    </div>
                    {isSidebarOpen && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">John Doe</p>
                            <p className="text-xs text-muted-foreground truncate">john@elevy.com</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    'hidden lg:flex flex-col bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out',
                    isSidebarOpen ? 'w-64' : 'w-20'
                )}
            >
                <SidebarContent/>
            </aside>

            {/* Mobile Sidebar */}
            {isMobileSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                    <aside
                        className="fixed inset-y-0 left-0 w-64 bg-sidebar-background border-r border-sidebar-border z-50 lg:hidden">
                        <SidebarContent/>
                    </aside>
                </>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-border bg-card sticky top-0 z-30 backdrop-blur-sm bg-card/80">
                    <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                            >
                                {isMobileSidebarOpen ? (
                                    <X className="w-5 h-5"/>
                                ) : (
                                    <Menu className="w-5 h-5"/>
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden lg:flex"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <Menu className="w-5 h-5"/>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <MessageSquare className="w-5 h-5"/>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"/>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="container max-w-7xl mx-auto p-4 lg:p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
