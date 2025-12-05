// import {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import {DevvAI} from '@devvai/devv-code-backend';
// import {Button} from '@/components/ui/button.tsx';
// import {Input} from '@/components/ui/input.tsx';
// import {Textarea} from '@/components/ui/textarea.tsx';
// import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.tsx';
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx';
// import {Label} from '@/components/ui/label.tsx';
// import {Checkbox} from '@/components/ui/checkbox.tsx';
// import {useToast} from '@/hooks/use-toast.ts';
// import {ArrowLeft, CheckCircle2, Sparkles} from 'lucide-react';
// import {INDUSTRIES} from '@/data/startup-data.ts';
//
// const ai = new DevvAI();
//
// const STAGES = ['idea', 'mvp', 'launched', 'growth'];
//
// export default function CreateStartupPage() {
//     const navigate = useNavigate();
//     const {toast} = useToast();
//     // const {createStartup, isLoading} = useStartupStore();
//
//     const [name, setName] = useState('');
//     const [tagline, setTagline] = useState('');
//     const [description, setDescription] = useState('');
//     const [stage, setStage] = useState<string>('idea');
//     const [industry, setIndustry] = useState<string>('Tech');
//     const [lookingFor, setLookingFor] = useState<string[]>([]);
//     const [ndaAccepted, setNdaAccepted] = useState(false);
//
//     // AI Assistant state
//     const [aiHelp, setAiHelp] = useState('');
//     const [isAiThinking, setIsAiThinking] = useState(false);
//     const [aiSuggestion, setAiSuggestion] = useState('');
//
//     const handleAiHelp = async () => {
//         if (!aiHelp.trim()) return;
//
//         setIsAiThinking(true);
//         setAiSuggestion('');
//
//         try {
//             const stream = await ai.chat.completions.create({
//                 model: 'default',
//                 messages: [
//                     {
//                         role: 'system',
//                         content: 'You are a startup mentor helping entrepreneurs refine their ideas. Provide concise, actionable advice on business model, target audience, MVP features, and pitch. Keep responses under 200 words.'
//                     },
//                     {
//                         role: 'user',
//                         content: `Help me with my startup idea:\n\nName: ${name || 'Not set'}\nIdea: ${aiHelp}\n\nProvide brief advice on: 1) Is this idea viable? 2) Who is the target audience? 3) What should be the MVP? 4) Key pitch points.`
//                     }
//                 ],
//                 stream: true,
//                 max_tokens: 500,
//                 temperature: 0.7
//             });
//
//             let fullResponse = '';
//             for await (const chunk of stream) {
//                 const content = chunk.choices[0]?.delta?.content || '';
//                 if (content) {
//                     fullResponse += content;
//                     setAiSuggestion(fullResponse);
//                 }
//             }
//
//             setIsAiThinking(false);
//         } catch (error: any) {
//             toast({
//                 title: 'AI Assistant Error',
//                 description: error.message,
//                 variant: 'destructive'
//             });
//             setIsAiThinking(false);
//         }
//     };
//
//     const handleRoleToggle = (role: string) => {
//         setLookingFor(prev =>
//             prev.includes(role)
//                 ? prev.filter(r => r !== role)
//                 : [...prev, role]
//         );
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//
//         if (!ndaAccepted) {
//             toast({
//                 title: 'NDA Required',
//                 description: 'You must accept the NDA to create a startup',
//                 variant: 'destructive'
//             });
//             return;
//         }
//
//         // const result = await createStartup({
//         //     name,
//         //     tagline,
//         //     description,
//         //     stage: stage as any,
//         //     industry,
//         //     looking_for: lookingFor.join(', '),
//         //     status: 'active'
//         // });
//
//         // if (result) {
//         //     toast({
//         //         title: 'Startup Created!',
//         //         description: 'Your startup has been created successfully with NDA protection.'
//         //     });
//         //     navigate(`/startups/${result._id}`);
//         // } else {
//         //     toast({
//         //         title: 'Error',
//         //         description: 'Failed to create startup. Please try again.',
//         //         variant: 'destructive'
//         //     });
//         // }
//     };
//
//     return (
//         <div className="min-h-screen">
//             <div className="max-w-6xl mx-auto">
//                 <Button
//                     onClick={() => navigate('/startups')}
//                     className="mb-6"
//                 >
//                     <ArrowLeft className="w-4 h-4 mr-2"/>
//                     Back to Startups
//                 </Button>
//
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Main Form */}
//                     <div className="lg:col-span-2">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Create Your Startup</CardTitle>
//                                 <CardDescription>
//                                     Share your idea with NDA protection. Find co-founders and build together.
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <form onSubmit={handleSubmit} className="space-y-6">
//                                     {/* Basic Info */}
//                                     <div className="space-y-4">
//                                         <div>
//                                             <Label htmlFor="name">Startup Name *</Label>
//                                             <Input
//                                                 id="name"
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 placeholder="Enter your startup name"
//                                                 required
//                                             />
//                                         </div>
//
//                                         <div>
//                                             <Label htmlFor="tagline">Tagline *</Label>
//                                             <Input
//                                                 id="tagline"
//                                                 value={tagline}
//                                                 onChange={(e) => setTagline(e.target.value)}
//                                                 placeholder="One-line description of your startup"
//                                                 required
//                                             />
//                                         </div>
//
//                                         <div>
//                                             <Label htmlFor="description">Description *</Label>
//                                             <Textarea
//                                                 id="description"
//                                                 value={description}
//                                                 onChange={(e) => setDescription(e.target.value)}
//                                                 placeholder="Describe your startup idea, problem, solution, and vision..."
//                                                 rows={6}
//                                                 required
//                                             />
//                                         </div>
//
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <Label htmlFor="stage">Current Stage *</Label>
//                                                 <Select value={stage} onValueChange={setStage}>
//                                                     <SelectTrigger id="stage">
//                                                         <SelectValue/>
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         {STAGES.map(s => (
//                                                             <SelectItem key={s} value={s}>
//                                                                 {s.charAt(0).toUpperCase() + s.slice(1)}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>
//
//                                             <div>
//                                                 <Label htmlFor="industry">Industry *</Label>
//                                                 <Select value={industry} onValueChange={setIndustry}>
//                                                     <SelectTrigger id="industry">
//                                                         <SelectValue/>
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         {INDUSTRIES.map(ind => (
//                                                             <SelectItem key={ind} value={ind}>
//                                                                 {ind}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     {/* NDA Agreement */}
//                                     <Card className="border-blue-200 bg-blue-50/50">
//                                         <CardContent className="pt-6">
//                                             <div className="flex items-start space-x-3">
//                                                 <Checkbox
//                                                     id="nda"
//                                                     checked={ndaAccepted}
//                                                     onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
//                                                     required
//                                                 />
//                                                 <div className="flex-1">
//                                                     <Label htmlFor="nda" className="font-semibold cursor-pointer">
//                                                         I accept the Non-Disclosure Agreement (NDA)
//                                                     </Label>
//                                                     <p className="text-sm text-muted-foreground mt-1">
//                                                         By checking this box, you agree that all information shared in
//                                                         this startup
//                                                         is confidential and protected. All team members must sign NDA
//                                                         before accessing
//                                                         full details.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//
//                                     <div className="flex gap-3">
//                                         <Button
//                                             type="button"
//                                             variant="outline"
//                                             onClick={() => navigate('/startups')}
//                                             // disabled={isLoading}
//                                         >
//                                             Cancel
//                                         </Button>
//                                         <Button type="submit" className="flex-1">
//                                             {/* {isLoading ? (
//                                                 <>
//                                                     <div
//                                                         className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                                                     Creating...
//                                                 </>
//                                             ) : ( */}
//                                             <>
//                                                 <CheckCircle2 className="w-4 h-4 mr-2"/>
//                                                 Create Startup
//                                             </>
//                                             {/* )} */}
//                                         </Button>
//                                     </div>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </div>
//
//                     {/* AI Assistant Sidebar */}
//                     <div className="lg:col-span-1">
//                         <Card className="sticky top-6">
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <Sparkles className="w-5 h-5 text-purple-600"/>
//                                     AI Startup Advisor
//                                 </CardTitle>
//                                 <CardDescription>
//                                     Get instant feedback on your idea
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div>
//                                     <Label htmlFor="ai-help">Describe your idea</Label>
//                                     <Textarea
//                                         id="ai-help"
//                                         value={aiHelp}
//                                         onChange={(e) => setAiHelp(e.target.value)}
//                                         placeholder="Tell me about your startup idea, and I'll help you refine it..."
//                                         rows={4}
//                                     />
//                                 </div>
//
//                                 <Button
//                                     type="button"
//                                     onClick={handleAiHelp}
//                                     disabled={isAiThinking || !aiHelp.trim()}
//                                     className="w-full"
//                                     variant="secondary"
//                                 >
//                                     {isAiThinking ? (
//                                         <>
//                                             <div
//                                                 className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
//                                             AI is thinking...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Sparkles className="w-4 h-4 mr-2"/>
//                                             Get AI Feedback
//                                         </>
//                                     )}
//                                 </Button>
//
//                                 {aiSuggestion && (
//                                     <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//                                         <p className="text-sm text-slate-700 whitespace-pre-wrap">
//                                             {aiSuggestion}
//                                             {isAiThinking && <span className="animate-pulse">▋</span>}
//                                         </p>
//                                     </div>
//                                 )}
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, X, Plus, ArrowLeft, FileText } from 'lucide-react';

const CATEGORIES = [
    'Web Development',
    'Mobile Development',
    'AI/ML',
    'Design',
    'Marketing',
    'Data Science',
    'Blockchain',
    'Other',
];

const SUGGESTED_SKILLS = [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'UI/UX Design',
    'Product Management',
    'Marketing',
    'Sales',
    'Data Science',
    'Machine Learning',
    'Mobile Development',
    'DevOps',
];
const STAGES = ['Idea', 'Mvp', 'Launched', 'Growth'];

export default function CreateProjectPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    // const { user } = useAuthStore();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stage, setStage] = useState('');
    const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
    const [customSkill, setCustomSkill] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('5');
    const [hasNda, setHasNda] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // if (!user || user.role !== 'owner') {
    //     navigate('/');
    //     return null;
    // }

    const handleAddSkill = (skill: string) => {
        const trimmedSkill = skill.trim();
        if (trimmedSkill && !requiredSkills.includes(trimmedSkill) && requiredSkills.length < 10) {
            setRequiredSkills([...requiredSkills, trimmedSkill]);
            setCustomSkill('');
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setRequiredSkills(requiredSkills.filter((s) => s !== skill));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title.trim()) {
            toast({
                title: 'Title required',
                description: 'Please enter a project title',
                variant: 'destructive',
            });
            return;
        }

        if (!description.trim() || description.trim().length < 50) {
            toast({
                title: 'Description too short',
                description: 'Please provide at least 50 characters describing your project',
                variant: 'destructive',
            });
            return;
        }

        if (!category) {
            toast({
                title: 'Category required',
                description: 'Please select a project category',
                variant: 'destructive',
            });
            return;
        }

        if (requiredSkills.length === 0) {
            toast({
                title: 'Skills required',
                description: 'Please add at least one required skill',
                variant: 'destructive',
            });
            return;
        }

        const maxPart = parseInt(maxParticipants);
        if (isNaN(maxPart) || maxPart < 1 || maxPart > 50) {
            toast({
                title: 'Invalid participant count',
                description: 'Please enter a number between 1 and 50',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        try {
            // await projectApi.create({
            //     _uid: user._uid,
            //     owner_uid: user._uid,
            //     title: title.trim(),
            //     description: description.trim(),
            //     category,
            //     required_skills: requiredSkills,
            //     max_participants: maxPart,
            //     has_nda: hasNda ? 'yes' : 'no',
            // } as Partial<Project>);

            toast({
                title: 'Project created!',
                description: 'Your project has been published successfully',
            });

            navigate('/');
        } catch (error) {
            console.error('Create project error:', error);
            toast({
                title: 'Failed to create project',
                description: 'Please try again later',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
                {/* Back Button */}
                <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to projects
                </Button>

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Create New Project</h1>
                    <p className="text-muted-foreground">
                        Share your project idea and find the perfect team members
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>
                            Provide clear information to attract the right participants
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., AI-powered Task Manager"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isLoading}
                                    required
                                    maxLength={100}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description * (Markdown supported)
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your project, goals, timeline, and what you're looking for in team members..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={isLoading}
                                    required
                                    rows={8}
                                    className="resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    {description.length} characters (minimum 50)
                                </p>
                            </div>

                            {/* Category and STAGE */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={category} onValueChange={setCategory} disabled={isLoading}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stage">Stage *</Label>
                                    <Select value={stage} onValueChange={setStage} disabled={isLoading}>
                                        <SelectTrigger id="stage">
                                            <SelectValue placeholder="Select a stage" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STAGES.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Required Skills */}
                            <div className="space-y-2">
                                <Label>Required Skills * (At least 1, max 10)</Label>

                                {/* Selected Skills */}
                                {requiredSkills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                                        {requiredSkills.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="gap-1">
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="ml-1 hover:bg-destructive/20 rounded-full"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Suggested Skills */}
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Suggested skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SUGGESTED_SKILLS.filter((s) => !requiredSkills.includes(s))
                                            .slice(0, 8)
                                            .map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                                    onClick={() => handleAddSkill(skill)}
                                                >
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    {skill}
                                                </Badge>
                                            ))}
                                    </div>
                                </div>

                                {/* Custom Skill */}
                                {requiredSkills.length < 10 && (
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add custom skill..."
                                            value={customSkill}
                                            onChange={(e) => setCustomSkill(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddSkill(customSkill);
                                                }
                                            }}
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleAddSkill(customSkill)}
                                            disabled={!customSkill.trim() || isLoading}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Max Participants */}
                            <div className="space-y-2">
                                <Label htmlFor="maxParticipants">Maximum Participants *</Label>
                                <Input
                                    id="maxParticipants"
                                    type="number"
                                    min="1"
                                    max="50"
                                    placeholder="5"
                                    value={maxParticipants}
                                    onChange={(e) => setMaxParticipants(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    How many team members do you need? (1-50)
                                </p>
                            </div>

                            {/* NDA Checkbox */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="nda"
                                    checked={hasNda}
                                    onCheckedChange={(checked) => setHasNda(checked as boolean)}
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="nda"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Require NDA from participants
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/')}
                                    disabled={isLoading}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading} className="flex-1">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Project'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
