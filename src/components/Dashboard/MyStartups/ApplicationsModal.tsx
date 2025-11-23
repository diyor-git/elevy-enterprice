import {useState} from 'react';
import {CheckCircle, Clock, Download, Mail, X, XCircle} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import type {JobApplicant} from '@/types/startup.ts';

interface ApplicationsModalProps {
    jobTitle: string;
    applicants: JobApplicant[];
    onClose: () => void;
    onUpdateStatus: (applicantId: string, status: 'pending' | 'reviewing' | 'accepted' | 'rejected') => void;
}

function ApplicationsModal({
                               jobTitle,
                               applicants,
                               onClose,
                               onUpdateStatus,
                           }: ApplicationsModalProps) {
    const [selectedApplicant, setSelectedApplicant] = useState<JobApplicant | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'reviewing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted':
                return <CheckCircle className="w-4 h-4"/>;
            case 'rejected':
                return <XCircle className="w-4 h-4"/>;
            case 'reviewing':
                return <Clock className="w-4 h-4"/>;
            default:
                return <Clock className="w-4 h-4"/>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Applications</h2>
                        <p className="text-muted-foreground text-sm">{jobTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Applicants List */}
                    <div className="w-full md:w-1/3 border-r border-border overflow-y-auto">
                        {applicants.length === 0 ? (
                            <div className="p-6 text-center text-muted-foreground">
                                <p>No applications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border">
                                {applicants.map((applicant) => (
                                    <button
                                        key={applicant.id}
                                        onClick={() => setSelectedApplicant(applicant)}
                                        className={`w-full text-left p-4 hover:bg-muted transition-colors cursor-pointer ${
                                            selectedApplicant?.id === applicant.id ? 'bg-muted' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg flex-shrink-0">
                                                {applicant.avatar || '👤'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-foreground truncate">{applicant.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{applicant.email}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge
                                                        className={`text-xs ${getStatusColor(applicant.status)}`}
                                                    >
                                                        {applicant.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Applicant Details */}
                    <div className="w-full md:w-2/3 overflow-y-auto">
                        {selectedApplicant ? (
                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div
                                        className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl flex-shrink-0">
                                        {selectedApplicant.avatar || '👤'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-foreground">{selectedApplicant.name}</h3>
                                        <p className="text-muted-foreground">{selectedApplicant.email}</p>
                                        <p className="text-sm text-muted-foreground mt-1">Applied {selectedApplicant.appliedDate.toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {selectedApplicant.bio && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-foreground mb-2">Bio</h4>
                                        <p className="text-muted-foreground text-sm">{selectedApplicant.bio}</p>
                                    </div>
                                )}

                                {selectedApplicant.experience && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-foreground mb-2">Experience</h4>
                                        <p className="text-muted-foreground text-sm">{selectedApplicant.experience}</p>
                                    </div>
                                )}

                                {selectedApplicant.skills && selectedApplicant.skills.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-foreground mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedApplicant.skills.map((skill) => (
                                                <Badge key={skill} variant="secondary">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-border pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-semibold text-foreground">Status</span>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(selectedApplicant.status)}
                                            <Badge className={getStatusColor(selectedApplicant.status)}>
                                                {selectedApplicant.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <Button
                                            variant={selectedApplicant.status === 'accepted' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => onUpdateStatus(selectedApplicant.id, 'accepted')}
                                            className="cursor-pointer"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1"/>
                                            Accept
                                        </Button>
                                        <Button
                                            variant={selectedApplicant.status === 'rejected' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => onUpdateStatus(selectedApplicant.id, 'rejected')}
                                            className="cursor-pointer"
                                        >
                                            <XCircle className="w-4 h-4 mr-1"/>
                                            Reject
                                        </Button>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 cursor-pointer"
                                        >
                                            <Mail className="w-4 h-4 mr-1"/>
                                            Email
                                        </Button>
                                        {selectedApplicant.resume && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 cursor-pointer"
                                            >
                                                <Download className="w-4 h-4 mr-1"/>
                                                Resume
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                <p>Select an applicant to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationsModal;