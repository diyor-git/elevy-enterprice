import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Calendar, FileText, Lock, X} from 'lucide-react';

interface NDAModalProps {
    startupName: string;
    onAccept: () => void;
    onClose: () => void;
}

function NdaModal({startupName, onAccept, onClose}: NDAModalProps) {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Lock className="w-6 h-6 text-primary"/>
                        Non-Disclosure Agreement
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-muted rounded">
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="bg-muted p-4 rounded-lg flex gap-4">
                        <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1"/>
                        <div>
                            <p className="font-semibold mb-1">Blockchain-Verified Agreement</p>
                            <p className="text-sm text-muted-foreground">
                                This NDA is timestamped on the blockchain for proof of receipt and authenticity.
                            </p>
                        </div>
                    </div>

                    <section>
                        <h3 className="font-bold text-lg mb-2">1. Confidential Information</h3>
                        <p className="text-muted-foreground">
                            The undersigned acknowledges that {startupName} has disclosed certain confidential and
                            proprietary information, including but not limited to business plans, financial projections,
                            product specifications, and strategic initiatives. This information is disclosed in
                            confidence and shall remain confidential.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">2. Term of Confidentiality</h3>
                        <p className="text-muted-foreground">
                            This agreement shall remain in effect for a period of 24 months from the date of signing.
                            After this period, any information previously held confidential may be disclosed only if
                            required by law.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">3. Permitted Use</h3>
                        <p className="text-muted-foreground">
                            The recipient agrees to use the confidential information solely for the purpose of
                            evaluating a potential opportunity with {startupName}. Redistribution or disclosure to third
                            parties without written consent is prohibited.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">4. Return or Destruction</h3>
                        <p className="text-muted-foreground">
                            Upon termination of discussions or at the request of {startupName}, the recipient agrees to
                            return or destroy all confidential information within 10 business days.
                        </p>
                    </section>

                    <div className="border-t border-border pt-6 bg-muted p-4 rounded-lg">
                        <div className="flex gap-3 mb-4">
                            <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1"/>
                            <div className="text-sm">
                                <p className="font-semibold">Agreement Details</p>
                                <p className="text-muted-foreground">Issued: November 18, 2025</p>
                                <p className="text-muted-foreground">Blockchain Hash: 0x3f2A9c8B...</p>
                            </div>
                        </div>
                    </div>

                    <label
                        className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition">
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="w-5 h-5 cursor-pointer"
                        />
                        <span>I have read and agree to this NDA</span>
                    </label>

                    <div className="flex gap-4">
                        <Button variant="outline" onClick={onClose} className="flex-1 cursor-pointer">
                            Decline
                        </Button>
                        <Button
                            onClick={onAccept}
                            disabled={!accepted}
                            className="flex-1 cursor-pointer"
                        >
                            Sign & Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default NdaModal;