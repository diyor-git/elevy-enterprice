import {useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Eye, EyeOff, GraduationCap, Lock, Mail} from 'lucide-react';
import {Link} from 'react-router-dom';

function LoginPage() {
//   const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you'd handle authentication here
            //   router.push('/');
        }, 1000);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-12 justify-center">
                    <GraduationCap className="h-8 w-8 text-primary"/>
                    <span>Elevy</span>
                </Link>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
                    <p className="text-muted-foreground text-center mb-8">
                        Sign in to access your Elevy dashboard
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
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
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"/>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                    required
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
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-border"/>
                        <span className="text-xs text-muted-foreground">or</span>
                        <div className="flex-1 h-px bg-border"/>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <Button variant="outline" className="w-full" disabled>
                            Continue with Google
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                            Continue with GitHub
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{' '}
                        <Link to="/auth/signup" className="text-primary font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-muted-foreground mt-8">
                    By signing in, you agree to our{' '}
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

export default LoginPage;