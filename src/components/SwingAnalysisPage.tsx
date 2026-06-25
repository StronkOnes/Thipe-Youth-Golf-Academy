import React, { useState, useMemo } from 'react';
import { MOCK_SWING_ANALYSIS_REQUESTS, MOCK_USER, MOCK_STUDENTS, MOCK_COACH } from '../constants';
import { SwingAnalysisRequest, SwingAnalysisStatus, UserRole, Student } from '../types';
import { analyzeSwing } from '../../services/geminiService';

const VideoCameraIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const ClockIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const SparklesIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10.868 2.884c.321.176.515.564.438 1.002l-.513 2.693.205.205c.27.27.27.708 0 .978l-1.06 1.06c-.27.27-.708.27-.979 0l-.205-.205-2.693.513c-.438.077-.826-.117-1.002-.438a8.5 8.5 0 0 1 5.753-5.753ZM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" clipRule="evenodd" /><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM.464 10.464c.206.206.206.541 0 .747l-.354.354a.5.5 0 0 1-.707 0l-.354-.354a.5.5 0 0 1 0-.707l.354-.354a.5.5 0 0 1 .707 0l.354.354ZM18.232 8.232c.206.206.541.206.747 0l.354-.354a.5.5 0 0 0 0-.707l-.354-.354a.5.5 0 0 0-.707 0l-.354.354a.5.5 0 0 0 0 .747l.354.354Zm-5.657 5.657c.206.206.541.206.747 0l.354-.354a.5.5 0 0 0 0-.707l-.354-.354a.5.5 0 0 0-.707 0l-.354.354a.5.5 0 0 0 0 .747l.354.354Z" /></svg>;
const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>;


interface ReviewFormProps {
    request: SwingAnalysisRequest;
    onClose: () => void;
    onSubmit: (requestId: string, coachFeedback: string, aiAnalysis: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ request, onClose, onSubmit }) => {
    const [coachFeedback, setCoachFeedback] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const student = useMemo(() => MOCK_STUDENTS.find(s => s.id === request.studentId), [request.studentId]);

    const handleGenerateAI = async () => {
        if (!student) return;
        setIsGenerating(true);
        try {
            const analysis = await analyzeSwing(request.studentNotes, student.name, student.age);
            setAiAnalysis(analysis);
            setCoachFeedback(prev => `${analysis}\n\n--- \n**Coach's Notes:**\n${prev}`);
        } catch (error) {
            console.error(error);
            setCoachFeedback("Error generating AI analysis. Please provide manual feedback.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(request.id, coachFeedback, aiAnalysis);
    };

    return (
        <div className="mt-4 p-6 bg-tyga-primary/5 dark:bg-tyga-primary/10 rounded-lg">
            <h4 className="text-xl font-bold text-tyga-dark dark:text-white mb-4">Reviewing Swing for {student?.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-semibold mb-2 dark:text-gray-200">Student's Video</h5>
                    <div className="aspect-video bg-gray-900 dark:bg-black text-white flex items-center justify-center rounded-lg">
                        <VideoCameraIcon className="h-16 w-16 opacity-50"/>
                        <p className="absolute bottom-2 text-sm">Video placeholder</p>
                    </div>
                    <h5 className="font-semibold mt-4 mb-2 dark:text-gray-200">Student's Notes</h5>
                    <p className="bg-white dark:bg-gray-800 p-3 rounded-md text-gray-600 dark:text-gray-300 italic">"{request.studentNotes}"</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="font-semibold dark:text-gray-200">Coach's Feedback</h5>
                        <button type="button" onClick={handleGenerateAI} disabled={isGenerating} className="flex items-center gap-2 text-sm bg-tyga-accent/20 text-tyga-accent font-semibold py-1 px-3 rounded-full hover:bg-tyga-accent/30 disabled:opacity-50 disabled:cursor-wait">
                            {isGenerating ? 'Generating...' : <><SparklesIcon className="h-4 w-4" /> Analyze with AI</>}
                        </button>
                    </div>
                    <textarea 
                        value={coachFeedback}
                        onChange={e => setCoachFeedback(e.target.value)}
                        rows={12}
                        className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        placeholder="Provide your feedback here, or use the AI assistant to get started."
                    />
                    <div className="flex gap-4 mt-4">
                        <button type="submit" className="flex-1 bg-tyga-secondary hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Submit Feedback</button>
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const SwingAnalysisPage: React.FC = () => {
    const [viewAs, setViewAs] = useState<UserRole>(UserRole.Parent);
    const [requests, setRequests] = useState<SwingAnalysisRequest[]>(MOCK_SWING_ANALYSIS_REQUESTS);
    const [expandedRequests, setExpandedRequests] = useState<Set<string>>(new Set());
    const [reviewingRequestId, setReviewingRequestId] = useState<string | null>(null);

    const toggleRequestExpansion = (id: string) => {
        setExpandedRequests(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };
    
    const handleProvideFeedback = (requestId: string, coachFeedback: string, aiAnalysis: string) => {
        setRequests(prev => prev.map(r => 
            r.id === requestId 
            ? { ...r, status: SwingAnalysisStatus.Reviewed, coachFeedback, aiAnalysis, reviewDate: new Date().toISOString() } 
            : r
        ));
        setReviewingRequestId(null);
    };

    const parentStudents = useMemo(() => MOCK_STUDENTS.filter(s => s.parentId === MOCK_USER.id), []);
    const studentIds = useMemo(() => parentStudents.map(s => s.id), [parentStudents]);
    const parentRequests = useMemo(() => requests.filter(r => studentIds.includes(r.studentId)).sort((a,b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()), [requests, studentIds]);
    
    const coachPendingRequests = useMemo(() => requests.filter(r => r.status === SwingAnalysisStatus.Pending).sort((a,b) => new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()), [requests]);
    const coachReviewedRequests = useMemo(() => requests.filter(r => r.status === SwingAnalysisStatus.Reviewed).sort((a,b) => new Date(b.reviewDate!).getTime() - new Date(a.reviewDate!).getTime()), [requests]);

    const getStudentName = (studentId: string) => MOCK_STUDENTS.find(s => s.id === studentId)?.name || 'Unknown Student';

    return (
        <div className="py-16 bg-tyga-light dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-tyga-dark dark:text-white sm:text-5xl">Swing Analysis</h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Get personalized feedback to perfect your game.</p>
                </div>
                
                {/* View Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="relative flex p-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                        <button onClick={() => setViewAs(UserRole.Parent)} className={`relative z-10 w-32 py-2 text-sm font-semibold rounded-full transition-colors ${viewAs === UserRole.Parent ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>Parent View</button>
                        <button onClick={() => setViewAs(UserRole.Admin)} className={`relative z-10 w-32 py-2 text-sm font-semibold rounded-full transition-colors ${viewAs === UserRole.Admin ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>Coach View</button>
                        <span className={`absolute top-1 h-10 w-32 rounded-full bg-tyga-primary transition-transform duration-300 ${viewAs === UserRole.Parent ? 'transform translate-x-0' : 'transform translate-x-full'}`}/>
                    </div>
                </div>

                {viewAs === UserRole.Parent && (
                    <div>
                        <div className="max-w-4xl mx-auto">
                           <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mb-8">
                                <h2 className="text-2xl font-bold text-tyga-dark dark:text-white mb-4">Submit a New Swing for Review</h2>
                                <form className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="md:col-span-2">
                                        <label htmlFor="studentNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes for the Coach</label>
                                        <textarea id="studentNotes" rows={2} className="mt-1 block w-full border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md shadow-sm p-2" placeholder="e.g., 'I'm struggling with my slice.'"></textarea>
                                    </div>
                                    <button type="button" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-tyga-primary hover:bg-blue-800">
                                        <VideoCameraIcon className="h-6 w-6"/> Upload
                                    </button>
                                </form>
                            </div>
                            <h2 className="text-2xl font-bold text-tyga-dark dark:text-white mb-4 text-center">My Submissions</h2>
                            <div className="space-y-4">
                                {parentRequests.map(req => (
                                    <div key={req.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                                        <button onClick={() => toggleRequestExpansion(req.id)} className="w-full p-4 text-left flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                {req.status === SwingAnalysisStatus.Reviewed ? <CheckCircleIcon className="h-8 w-8 text-tyga-secondary" /> : <ClockIcon className="h-8 w-8 text-tyga-accent" />}
                                                <div>
                                                    <p className="font-bold dark:text-white">{getStudentName(req.studentId)} - {new Date(req.submissionDate).toLocaleDateString()}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{req.studentNotes}"</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${req.status === SwingAnalysisStatus.Reviewed ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>{req.status}</span>
                                                <ChevronDownIcon className={`h-5 w-5 dark:text-white transition-transform ${expandedRequests.has(req.id) ? 'rotate-180' : ''}`} />
                                            </div>
                                        </button>
                                        {expandedRequests.has(req.id) && req.status === SwingAnalysisStatus.Reviewed && (
                                            <div className="p-6 border-t bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
                                                <h4 className="font-bold text-tyga-dark dark:text-white mb-2">Coach's Feedback ({new Date(req.reviewDate!).toLocaleDateString()})</h4>
                                                <div className="prose prose-sm max-w-none p-4 bg-white dark:bg-gray-900 rounded-md prose-invert" dangerouslySetInnerHTML={{ __html: req.coachFeedback?.replace(/\n/g, '<br />') || '' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {viewAs === UserRole.Admin && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-tyga-dark dark:text-white mb-4">Pending Review ({coachPendingRequests.length})</h2>
                            <div className="space-y-4">
                                {coachPendingRequests.map(req => (
                                    <div key={req.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
                                        {reviewingRequestId === req.id ? (
                                            <ReviewForm request={req} onClose={() => setReviewingRequestId(null)} onSubmit={handleProvideFeedback} />
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold dark:text-white">{getStudentName(req.studentId)}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(req.submissionDate).toLocaleString()}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 italic">"{req.studentNotes}"</p>
                                                </div>
                                                <button onClick={() => setReviewingRequestId(req.id)} className="bg-tyga-primary text-white font-bold py-2 px-4 rounded-lg">Review</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-tyga-dark dark:text-white mb-4">Reviewed ({coachReviewedRequests.length})</h2>
                           <div className="space-y-4">
                               {coachReviewedRequests.map(req => (
                                    <div key={req.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 opacity-70">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold dark:text-gray-300">{getStudentName(req.studentId)}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Reviewed on: {new Date(req.reviewDate!).toLocaleDateString()}</p>
                                            </div>
                                            <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1"><CheckCircleIcon className="h-5 w-5"/> Complete</span>
                                        </div>
                                    </div>
                               ))}
                           </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SwingAnalysisPage;