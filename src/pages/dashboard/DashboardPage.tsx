import { TrendingUp, Users, Rocket, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Active Internships',
      value: '24',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-primary',
    },
    {
      title: 'Community Members',
      value: '1,429',
      change: '+8%',
      icon: Users,
      color: 'text-secondary',
    },
    {
      title: 'Startups Launched',
      value: '67',
      change: '+23%',
      icon: Rocket,
      color: 'text-accent',
    },
    {
      title: 'Achievements Earned',
      value: '156',
      change: '+15%',
      icon: Award,
      color: 'text-primary',
    },
  ];

  const recentActivity = [
    {
      title: 'New internship at TechCorp',
      description: 'Frontend Developer position',
      time: '2 hours ago',
    },
    {
      title: 'StartupX joined the platform',
      description: 'AI-powered healthcare solutions',
      time: '5 hours ago',
    },
    {
      title: 'Team meeting scheduled',
      description: 'Project Alpha - Daily standup',
      time: '1 day ago',
    },
    {
      title: 'Achievement unlocked',
      description: 'Completed 10 projects',
      time: '2 days ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 last:pb-0 border-b last:border-0 border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => {}}
              >
                <div className="text-left">
                  <div className="font-semibold">Create a Startup</div>
                  <div className="text-sm text-muted-foreground">
                    Launch your next big idea
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => {}}
              >
                <div className="text-left">
                  <div className="font-semibold">Find Internships</div>
                  <div className="text-sm text-muted-foreground">
                    Explore available opportunities
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => {}}
              >
                <div className="text-left">
                  <div className="font-semibold">Join the Forum</div>
                  <div className="text-sm text-muted-foreground">
                    Connect with the community
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => {}}
              >
                <div className="text-left">
                  <div className="font-semibold">Try AI Zone</div>
                  <div className="text-sm text-muted-foreground">
                    Get AI-powered assistance
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-semibold">Ready to launch your startup?</h3>
              <p className="text-sm text-muted-foreground">
                Join hundreds of entrepreneurs building the future with Elevy
              </p>
            </div>
            <Button className="shrink-0">Get Started</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
