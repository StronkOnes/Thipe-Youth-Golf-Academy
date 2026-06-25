
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { MOCK_CONVERSATIONS, MOCK_USER, MOCK_COACH, MOCK_USERS, MOCK_STUDENTS, MOCK_PACKAGES, MOCK_LESSONS, MOCK_SWING_ANALYSIS_REQUESTS } from '../constants';
import { Conversation, Message, User, UserRole, SwingAnalysisRequest, SwingAnalysisStatus, Student } from '../types';
import { generateAIMessage, analyzeSwing } from '../../services/geminiService';
import { PaperClipIcon, ArrowDownTrayIcon, SparklesIcon, SendIcon, TelegramIcon, WhatsAppIcon } from './icons';

// --- LOCAL ICONS (from former SwingAnalysisPage) ---
const VideoCameraIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const ClockIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;

// --- RICH LINK & INTEGRATED COMPONENTS ---

const StudentLink = ({ id }: { id: string }) => {
    const student = useMemo(() => MOCK_STUDENTS.find(s => s.id === id), [id]);
    if (!student) return <div className="my-1 text-xs text-red-500">[Invalid Student Link]</div>;
    return <div className="my-1 p-2 border rounded-lg bg-blue-50 dark:bg-blue-900/50 dark:border-blue-700 flex items-center gap-3 text-sm">
        <img src={student.photoUrl} alt={student.name} className="w-10 h-10 rounded-full" />
        <div>
            <p className="font-bold text-gray-800 dark:text-gray-100">{student.name}</p>
            <p className="text-gray-600 dark:text-gray-300">Age: {student.age}, Grade: {student.grade}</p>
        </div>
    </div>;
};

const LessonLink = ({ id }: { id: string }) => {
    const lesson = useMemo(() => MOCK_LESSONS.find(l => l.id === id), [id]);
    const student = useMemo(() => MOCK_STUDENTS.find(s => s.id === lesson?.studentId), [lesson]);
    if (!lesson || !student) return <div className="my-1 text-xs text-red-500">[Invalid Lesson Link]</div>;
    return <div className="my-1 p-2 border rounded-lg bg-green-50 dark:bg-green-900/50 dark:border-green-700 text-sm">
        <p className="font-bold text-gray-800 dark:text-gray-100">Lesson Details</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Student:</strong> {student.name}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Date:</strong> {new Date(lesson.date).toLocaleDateString()}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Time:</strong> {lesson.timeSlot}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> <span className={`font-semibold ${lesson.status === 'Approved' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{lesson.status}</span></p>
    </div>;
};

const SwingAnalysisLink = ({ id, onReview }: { id: string, onReview: (id: string) => void }) => {
    const [swingRequests, setSwingRequests] = useState(MOCK_SWING_ANALYSIS_REQUESTS); // We need local state view of requests
    const [isExpanded, setIsExpanded] = useState(false);
    const currentUser = MOCK_USER.role === UserRole.Parent ? MOCK_USER : MOCK_COACH;

    const request = swingRequests.find(r => r.id === id);
    const student = useMemo(() => MOCK_STUDENTS.find(s => s.id === request?.studentId), [request]);

    if (!request || !student) return <div className="my-1 text-xs text-red-500">[Invalid Swing Analysis Link]</div>;

    const isCoachView = currentUser.role === UserRole.Admin;

    return (
      <div className="my-1 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/50 dark:border-yellow-700 text-sm w-full text-gray-800 dark:text-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-base text-tyga-dark dark:text-white flex items-center gap-2">
                    {request.status === SwingAnalysisStatus.Pending ? <ClockIcon className="h-5 w-5 text-yellow-600"/> : <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                    Swing Analysis for {student.name}
                </p>
                <p className="italic text-gray-600 dark:text-gray-300 mt-1">"{request.studentNotes}"</p>
            </div>
             <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${request.status === SwingAnalysisStatus.Reviewed ? 'bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-300'}`}>{request.status}</span>
        </div>

        {isCoachView && request.status === SwingAnalysisStatus.Pending && (
            <button onClick={() => onReview(id)} className="w-full mt-3 bg-tyga-primary text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-800">
                Provide Feedback
            </button>
        )}
        
        {request.status === SwingAnalysisStatus.Reviewed && (
             <div className="mt-2">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-tyga-primary font-semibold text-sm">
                    {isExpanded ? 'Hide Feedback' : 'Show Feedback'}
                </button>
                {isExpanded && (
                     <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 prose prose-sm max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: request.coachFeedback?.replace(/\n/g, '<br />') || '' }} />
                )}
            </div>
        )}
      </div>
    );
};


const MessagingPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
  const [newMessage, setNewMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // --- Swing Analysis State ---
  const [swingRequests, setSwingRequests] = useState<SwingAnalysisRequest[]>(MOCK_SWING_ANALYSIS_REQUESTS);
  const [reviewingRequest, setReviewingRequest] = useState<SwingAnalysisRequest | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [selectedConversation?.messages, swingRequests]);
  
  const handleViewChange = (role: UserRole) => {
    const user = role === UserRole.Parent ? MOCK_USER : MOCK_COACH;
    setCurrentUser(user);
    const userConversations = MOCK_CONVERSATIONS.filter(c => 
        c.messages.some(m => m.senderId === user.id || m.recipientId === user.id) || c.contactId === user.id
    );
    setConversations(userConversations);
    setSelectedConversation(userConversations[0] || null);
  }
  
  const handleSendMessage = (content: string = newMessage) => {
    if (!content.trim() || !selectedConversation) return;
    
    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      recipientId: selectedConversation.contactId,
      timestamp: new Date().toISOString(),
      content: content,
      read: false,
    };

    const updatedConversations = conversations.map(convo => {
      if (convo.contactId === selectedConversation.contactId) {
        return { ...convo, messages: [...convo.messages, message] };
      }
      return convo;
    });

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.contactId === selectedConversation.contactId) || null);
    setNewMessage('');
  };

  const handleAiAssist = useCallback(async () => {
    if (!selectedConversation) return;
    setIsGenerating(true);
    try {
        const lastMessages = selectedConversation.messages.slice(-3).map(m => 
            `${m.senderId === currentUser.id ? 'Me' : selectedConversation.contactName}: ${m.content}`
        ).join('\n');
        const prompt = `Based on the last few messages in this conversation, draft a friendly and professional response from my perspective (${currentUser.name}). Keep the response concise. Conversation context:\n${lastMessages}\n---\nDraft a response:`;
        const aiResponse = await generateAIMessage(prompt);
        setNewMessage(aiResponse);
    } catch (error) {
        console.error("AI message generation failed:", error);
        setNewMessage("Sorry, I couldn't generate a message right now.");
    } finally {
        setIsGenerating(false);
    }
  }, [selectedConversation, currentUser]);

  const handleExportChat = () => {
      if (!selectedConversation) return;
      const { contactName, messages } = selectedConversation;
      const chatHistory = messages.map(msg => {
          const senderName = msg.senderId === currentUser.id ? currentUser.name : contactName;
          const timestamp = new Date(msg.timestamp).toLocaleString();
          return `[${timestamp}] ${senderName}:\n${msg.content.replace(/\[(student|lesson|swing):([\w\d]+)\]/g, `[Reference to ${'$1'} ${'$2'}]`)}\n`;
      }).join('\n');
      
      const content = `Chat history with ${contactName}\n\n${chatHistory}`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `chat_with_${contactName.replace(' ', '_')}.txt`;
      link.click();
  };

  const handleAddLink = () => {
    setNewMessage(prev => `${prev} Let's discuss this lesson: [lesson:les1]`);
  };
  
  // --- Swing Analysis Methods ---
  const handleRequestAnalysis = () => {
      const studentId = MOCK_STUDENTS.find(s => s.parentId === currentUser.id)?.id;
      if (!studentId) return;

      const studentNotes = prompt("Enter any notes for the coach about this swing:");
      if (!studentNotes) return;

      const newRequest: SwingAnalysisRequest = {
        id: `swing_${Date.now()}`,
        studentId,
        studentNotes,
        submissionDate: new Date().toISOString(),
        status: SwingAnalysisStatus.Pending,
      };
      setSwingRequests(prev => [...prev, newRequest]);
      handleSendMessage(`New swing analysis request submitted: [swing:${newRequest.id}]`);
  };
  
  const handleProvideFeedback = (requestId: string, coachFeedback: string, aiAnalysis: string) => {
      setSwingRequests(prev => prev.map(r => 
          r.id === requestId 
          ? { ...r, status: SwingAnalysisStatus.Reviewed, coachFeedback, aiAnalysis, reviewDate: new Date().toISOString() } 
          : r
      ));
      setReviewingRequest(null);
  };
  
   const renderMessageContent = (content: string) => {
    const linkRegex = /\[(student|lesson|swing):([\w\d]+)\]/g;
    const parts = content.split(linkRegex);

    return parts.map((part, index) => {
        if (index % 3 === 1) { // Matched type (student, lesson, swing)
            const type = part;
            const id = parts[index + 1];
            if (type === 'student') return <StudentLink key={index} id={id} />;
            if (type === 'lesson') return <LessonLink key={index} id={id} />;
            if (type === 'swing') return <SwingAnalysisLink key={index} id={id} onReview={(reqId) => setReviewingRequest(swingRequests.find(r => r.id === reqId) || null)} />;
        }
        if (index % 3 === 2 || (index % 3 === 0 && !content.match(linkRegex))) {
            return part;
        }
        return null;
    });
};

  return (
    <div className="py-12 bg-gray-100 dark:bg-black">
       <div className="container mx-auto px-6">
        {/* View Toggle */}
        <div className="flex justify-center mb-8">
            <div className="relative flex p-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                <button onClick={() => handleViewChange(UserRole.Parent)} className={`relative z-10 w-32 py-2 text-sm font-semibold rounded-full transition-colors ${currentUser.role === UserRole.Parent ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>Parent View</button>
                <button onClick={() => handleViewChange(UserRole.Admin)} className={`relative z-10 w-32 py-2 text-sm font-semibold rounded-full transition-colors ${currentUser.role === UserRole.Admin ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>Coach View</button>
                <span className={`absolute top-1 h-10 w-32 rounded-full bg-tyga-primary transition-transform duration-300 ${currentUser.role === UserRole.Parent ? 'transform translate-x-0' : 'transform translate-x-full'}`}/>
            </div>
        </div>
        
        { reviewingRequest && <ReviewModal request={reviewingRequest} onClose={() => setReviewingRequest(null)} onSubmit={handleProvideFeedback} /> }

        <div className="flex h-[80vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Thread list */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-tyga-dark dark:text-white">Chats</h2>
            </div>
            <ul className="overflow-y-auto flex-1 pb-20">
              {conversations.map(convo => (
                <li
                  key={convo.contactId}
                  onClick={() => setSelectedConversation(convo)}
                  className={`p-4 cursor-pointer hover:bg-tyga-light dark:hover:bg-gray-800 flex items-center space-x-4 ${selectedConversation?.contactId === convo.contactId ? 'bg-tyga-primary/10 dark:bg-tyga-primary/20' : ''}`}
                >
                    <img src={convo.contactAvatar} alt={convo.contactName} className="w-12 h-12 rounded-full"/>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-tyga-dark dark:text-gray-200">{convo.contactName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.messages[convo.messages.length - 1].content}</p>
                    </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat window */}
          <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center space-x-3">
                    <div className="flex items-center space-x-3">
                        <img src={selectedConversation.contactAvatar} alt={selectedConversation.contactName} className="w-10 h-10 rounded-full"/>
                        <h3 className="text-lg font-bold text-tyga-dark dark:text-white">{selectedConversation.contactName}</h3>
                    </div>
                    <button onClick={handleExportChat} title="Export Chat History" className="p-2 text-gray-500 dark:text-gray-400 hover:text-tyga-primary dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto space-y-2 bg-gray-50 dark:bg-black">
                  {selectedConversation.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xl p-3 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-tyga-primary text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-tyga-dark dark:text-gray-200 rounded-bl-none'}`}>
                            <div>{renderMessageContent(msg.content)}</div>
                            <div className="text-right text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </div>
                    ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t bg-white dark:bg-gray-900 dark:border-gray-700">
                    <div className="relative">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                            placeholder="Type a message..."
                            className="w-full p-3 pr-48 border rounded-lg focus:ring-2 focus:ring-tyga-primary transition bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            rows={2}
                            disabled={isGenerating}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                           {currentUser.role === UserRole.Parent && (
                           <button onClick={handleRequestAnalysis} title="Request Swing Analysis" className="p-2 text-gray-500 dark:text-gray-400 hover:text-tyga-primary dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                <VideoCameraIcon className="h-5 w-5"/>
                           </button>)}
                           <button onClick={handleAddLink} title="Link Details" className="p-2 text-gray-500 dark:text-gray-400 hover:text-tyga-primary dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                <PaperClipIcon className="h-5 w-5"/>
                           </button>
                           <button onClick={handleAiAssist} title="AI Assist" disabled={isGenerating} className="p-2 text-tyga-accent rounded-full hover:bg-tyga-accent/20 disabled:opacity-50 disabled:cursor-wait">
                                {isGenerating ? <svg className="animate-spin h-5 w-5 text-tyga-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <SparklesIcon className="h-5 w-5"/>}
                           </button>
                           <button onClick={() => handleSendMessage()} title="Send Message" className="p-2 bg-tyga-secondary text-white rounded-full hover:bg-green-500">
                               <SendIcon className="h-5 w-5"/>
                           </button>
                        </div>
                   </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <p>Select a conversation to start chatting.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MODAL COMPONENT for Swing Analysis Review ---
interface ReviewModalProps {
    request: SwingAnalysisRequest;
    onClose: () => void;
    onSubmit: (requestId: string, coachFeedback: string, aiAnalysis: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ request, onClose, onSubmit }) => {
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
            setCoachFeedback(`${analysis}\n\n--- \n**Coach's Notes:**\n`);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h4 className="text-xl font-bold text-tyga-dark dark:text-white mb-4">Reviewing Swing for {student?.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 className="font-semibold mb-2 dark:text-gray-200">Student's Video (Placeholder)</h5>
                        <div className="aspect-video bg-gray-900 dark:bg-black text-white flex items-center justify-center rounded-lg">
                            <VideoCameraIcon className="h-16 w-16 opacity-50"/>
                        </div>
                        <h5 className="font-semibold mt-4 mb-2 dark:text-gray-200">Student's Notes</h5>
                        <p className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-gray-600 dark:text-gray-300 italic">"{request.studentNotes}"</p>
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
                            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            placeholder="Provide your feedback here, or use the AI assistant to get started."
                        />
                        <div className="flex gap-4 mt-4">
                            <button type="submit" className="flex-1 bg-tyga-secondary hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Submit Feedback</button>
                            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MessagingPage;