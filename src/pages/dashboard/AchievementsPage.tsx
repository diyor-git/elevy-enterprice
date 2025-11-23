import {useState} from 'react';
import {badges, leaderboard, userLevels} from '@/data/gamification.ts';
import {TrendingUp, Trophy, Zap} from 'lucide-react';

export default function AchievementsPage() {
    const [activeTab, setActiveTab] = useState('badges');
    const userLevel = 4;
    const userPoints = 3420;

    const currentLevel = userLevels[userLevel - 1];
    const nextLevel = userLevels[userLevel];
    const pointsToNextLevel = nextLevel ? nextLevel.requiredPoints - userPoints : 0;

    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Achievements & Rewards</h1>
                    <p className="text-muted-foreground">Track your progress and unlock badges as you advance</p>
                </div>

                {/* User Stats Card */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy className="w-8 h-8 text-primary"/>
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Level</p>
                                    <p className="text-3xl font-bold">{currentLevel.title}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-8 h-8 text-orange-500"/>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Points</p>
                                    <p className="text-3xl font-bold">{userPoints}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-8 h-8 text-green-500"/>
                                <div>
                                    <p className="text-sm text-muted-foreground">Badges Unlocked</p>
                                    <p className="text-3xl font-bold">{badges.filter(b => b.unlockedAt).length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between mb-2">
                            <p className="text-sm font-semibold">Progress to {nextLevel?.title}</p>
                            <p className="text-sm text-muted-foreground">{userPoints} / {nextLevel?.requiredPoints}</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                            <div
                                className="bg-primary h-3 rounded-full transition-all"
                                style={{width: `${(userPoints / nextLevel?.requiredPoints) * 100}%`}}
                            ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{pointsToNextLevel} points to next level</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-border mb-8">
                    {['badges', 'leaderboard'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 font-medium transition-colors capitalize ${
                                activeTab === tab
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            } cursor-pointer`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Badges Tab */}
                {activeTab === 'badges' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {badges.map(badge => (
                            <div
                                key={badge.id}
                                className={`border-2 rounded-lg p-6 transition-all ${
                                    badge.unlockedAt
                                        ? `border-primary bg-primary/5`
                                        : 'border-border bg-muted/30 opacity-60'
                                }`}
                            >
                                <div className="text-5xl mb-4">{badge.icon}</div>
                                <h3 className="text-lg font-semibold mb-1">{badge.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs bg-muted px-2 py-1 rounded">{badge.requirement}</span>
                                    {badge.unlockedAt && (
                                        <span className="text-xs text-green-600 font-semibold">Unlocked</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Leaderboard Tab */}
                {activeTab === 'leaderboard' && (
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h3 className="text-lg font-semibold">Top Contributors</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Rank</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Level</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Points</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaderboard.map(user => (
                                    <tr key={user.rank}
                                        className="border-b border-border hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-center">
                                                {user.rank === 1 && <span className="text-2xl">🥇</span>}
                                                {user.rank === 2 && <span className="text-2xl">🥈</span>}
                                                {user.rank === 3 && <span className="text-2xl">🥉</span>}
                                                {user.rank > 3 &&
                                                    <span className="font-semibold text-lg">#{user.rank}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar || "/placeholder.svg"} alt={user.name}
                                                     className="w-8 h-8 rounded-full"/>
                                                <span className="font-semibold">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          Level {user.level}
                        </span>
                                        </td>
                                        <td className="px-6 py-3 font-semibold">{user.points} pts</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
