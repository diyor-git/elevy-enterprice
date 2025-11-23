import {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {CheckCircle2, Eye, EyeOff, GraduationCap, Lock, Mail, User} from 'lucide-react';
import { Link } from 'react-router-dom';

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'student',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call to register user
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to email verification page with email as query param
            // router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);
        }, 1000);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-8 justify-center">
                    <GraduationCap className="h-8 w-8 text-primary"/>
                    <span>Elevy</span>
                </Link>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
                    <p className="text-muted-foreground text-center mb-8">
                        Join thousands discovering opportunities on Elevy
                    </p>

                    <form onSubmit={handleSignup} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"/>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"/>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>

                        {/* Account Type */}
                        <div className="space-y-2">
                            <Label htmlFor="accountType" className="text-sm font-medium">
                                Account Type
                            </Label>
                            <select
                                id="accountType"
                                name="accountType"
                                value={formData.accountType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="student">Student</option>
                                <option value="professional">Professional</option>
                                <option value="recruiter">Recruiter</option>
                            </select>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"/>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5"/>
                                    ) : (
                                        <Eye className="h-5 w-5"/>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"/>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5"/>
                                    ) : (
                                        <Eye className="h-5 w-5"/>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword &&
                                <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">Password requirements:</p>
                            <ul className="space-y-1 text-xs">
                                <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-primary' : 'text-muted-foreground'}`}>
                                    <CheckCircle2
                                        className={`h-4 w-4 ${formData.password.length >= 8 ? 'visible' : 'invisible'}`}/>
                                    At least 8 characters
                                </li>
                            </ul>
                        </div>

                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-semibold mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-border"/>
                        <span className="text-xs text-muted-foreground">or</span>
                        <div className="flex-1 h-px bg-border"/>
                    </div>

                    {/* Social Signup */}
                    <div className="space-y-3">
                        <Button variant="outline" className="w-full" disabled>
                            Sign up with Google
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                            Sign up with GitHub
                        </Button>
                    </div>

                    {/* Sign In Link */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{' '}
                        <Link to="/auth/login" className="text-primary font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-muted-foreground mt-8">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="hover:underline text-primary">
                        Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="hover:underline text-primary">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}


export default SignupPage;