import React, { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [quizSessions, setQuizSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const [studentMarks, setStudentMarks] = useState([
    { name: 'John Doe', score: 8, sessionId: 'quiz1' },
    { name: 'Alice', score: 6, sessionId: 'quiz1' },
    { name: 'Bob', score: 9, sessionId: 'quiz2' },
  ]);

  const [activeSection, setActiveSection] = useState(null);
  const [resultSessionCode, setResultSessionCode] = useState('');

  const handleLogin = () => {
    if (adminCode === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin code!');
    }
  };

  const handleCreateSession = () => {
    const sessionId = prompt('Enter Quiz Session Name:');
    if (sessionId) {
      const newSession = { id: sessionId, questions: [] };
      setQuizSessions([...quizSessions, newSession]);
      setCurrentSessionId(sessionId);
      setActiveSection('create');
    }
  };

  const handleAddQuestion = () => {
    if (questionText && optionA && optionB && optionC && optionD && correctOption && currentSessionId) {
      const newQuestion = {
        question: questionText,
        options: { a: optionA, b: optionB, c: optionC, d: optionD },
        correct: correctOption,
      };
      setQuizSessions(prevSessions =>
        prevSessions.map(session =>
          session.id === currentSessionId
            ? { ...session, questions: [...session.questions, newQuestion] }
            : session
        )
      );
      setQuestionText('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectOption('');
    }
  };

  const handleStartQuiz = () => {
    alert('Quiz Started for session: ' + currentSessionId);
  };

  const handleEndQuiz = () => {
    alert('Quiz Ended for session: ' + currentSessionId);
  };

  const handleGenerateLink = () => {
    alert(`Link generated: https://your-quiz-app.com/quiz/${currentSessionId}`);
  };

 const renderDashboard = () => (
  <div style={cardStyle}>
    <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>Admin Panel</h1>
    
    {/* First row: Create & View */}
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
      <div style={{ ...questionCardStyle, width: '260px', textAlign: 'center' }}>
        <img src="https://cdn-icons-png.flaticon.com/512/4105/4105441.png" alt="Create" width="80" />
        <h3>Create Quiz</h3>
        <button style={buttonStyle} onClick={handleCreateSession}>Create</button>
      </div>
      <div style={{ ...questionCardStyle, width: '260px', textAlign: 'center' }}>
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Results" width="80" />
        <h3>View Results</h3>
        <button style={buttonStyle} onClick={() => setActiveSection('results')}>View</button>
      </div>
    </div>

    {/* Second row: Profile centered */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div style={{ ...questionCardStyle, width: '260px', textAlign: 'center' }}>
        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Profile" width="80" />
        <h3>Profile</h3>
        <button style={buttonStyle} onClick={() => setActiveSection('profile')}>View</button>
      </div>
    </div>
  </div>
);


  const renderCreateQuiz = () => (
    <div style={cardStyle}>
      <button style={{ ...buttonStyle, marginBottom: '1rem' }} onClick={() => setActiveSection(null)}>← Back</button>
      <h2>Create Quiz: {currentSessionId}</h2>
      <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Type your question here" style={inputStyle} />
      <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Option A" style={inputStyle} />
      <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Option B" style={inputStyle} />
      <input type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Option C" style={inputStyle} />
      <input type="text" value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Option D" style={inputStyle} />

      <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} style={inputStyle}>
        <option value="">Select Correct Option</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
        <option value="D">Option D</option>
      </select>

      <div style={buttonGroupStyle}>
        <button style={buttonStyle} onClick={handleAddQuestion}>Add Question</button>
        <button style={buttonStyle} onClick={handleGenerateLink}>Generate Link</button>
        <button style={buttonStyle} onClick={handleStartQuiz}>Start Quiz</button>
        <button style={buttonStyle} onClick={handleEndQuiz}>End Quiz</button>
      </div>

      <h3 style={{ marginTop: '1.5rem' }}>Questions:</h3>
      {quizSessions.find(s => s.id === currentSessionId)?.questions.map((q, index) => (
        <div key={index} style={questionCardStyle}>
          <strong>Q{index + 1}:</strong> {q.question}<br />
          A) {q.options.a}<br />
          B) {q.options.b}<br />
          C) {q.options.c}<br />
          D) {q.options.d}<br />
          <strong>Correct:</strong> {q.correct}
        </div>
      ))}
    </div>
  );

  const renderResults = () => (
    <div style={cardStyle}>
      <button style={{ ...buttonStyle, marginBottom: '1rem' }} onClick={() => setActiveSection(null)}>← Back</button>
      <h2>View Results</h2>
      <input
        type="text"
        placeholder="Enter quiz join code"
        value={resultSessionCode}
        onChange={(e) => setResultSessionCode(e.target.value)}
        style={inputStyle}
      />
      <div style={{ marginTop: '1rem' }}>
        {studentMarks.filter(s => s.sessionId === resultSessionCode).length > 0 ? (
          studentMarks
            .filter(s => s.sessionId === resultSessionCode)
            .map((s, i) => (
              <div key={i} style={{ fontSize: '1rem', padding: '5px 0' }}>
                {s.name}: <strong>{s.score}/10</strong>
              </div>
            ))
        ) : (
          resultSessionCode && <p>No results found for this code.</p>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div style={cardStyle}>
      <button style={{ ...buttonStyle, marginBottom: '1rem' }} onClick={() => setActiveSection(null)}>← Back</button>
      <h2>Admin Profile</h2>
      <p><strong>Name:</strong> Admin User</p>
      <p><strong>Role:</strong> Quiz Manager</p>
      <p><strong>Email:</strong> admin@example.com</p>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div style={outerContainerStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            style={inputStyle}
          />
          <button style={buttonStyle} onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={outerContainerStyle}>
      {activeSection === 'create' && renderCreateQuiz()}
      {activeSection === 'results' && renderResults()}
      {activeSection === 'profile' && renderProfile()}
      {!activeSection && renderDashboard()}
    </div>
  );
};

// Existing CSS (unchanged)
const outerContainerStyle = {
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.5rem',
};

const cardStyle = {
  width: '60%',
  maxWidth: '850px',
  background: '#fff',
  borderRadius: '1.5rem',
  padding: '2.5rem',
  boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '14px',
  marginTop: '10px',
  marginBottom: '10px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  background: 'linear-gradient(to right, #9b00e8, #ff00c8)',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '25px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '15px',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.8rem',
  marginTop: '1.5rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const questionCardStyle = {
  background: '#f9f9f9',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '1rem',
  borderLeft: '5px solid purple',
  fontSize: '1rem',
};

export default App;
