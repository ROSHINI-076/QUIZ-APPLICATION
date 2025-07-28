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
    { name: 'John Doe', score: 8 },
    { name: 'Alice', score: 6 },
    { name: 'Bob', score: 9 },
  ]);

  // Simple admin authentication (Hardcoded for demo)
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
      <div style={cardStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.2rem' }}>Admin Panel</h1>

        <div style={{ marginBottom: '1rem' }}>
          <button style={buttonStyle} onClick={handleCreateSession}>+ Create Quiz Session</button>
          {quizSessions.length > 0 && (
            <select
              value={currentSessionId}
              onChange={(e) => setCurrentSessionId(e.target.value)}
              style={{ ...inputStyle, marginTop: '1rem' }}
            >
              <option value="">Select Session</option>
              {quizSessions.map((s) => (
                <option key={s.id} value={s.id}>{s.id}</option>
              ))}
            </select>
          )}
        </div>

        {currentSessionId && (
          <>
            <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Enter Question:</label>
            <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Type your question here" style={inputStyle} />
            <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Option A" style={inputStyle} />
            <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Option B" style={inputStyle} />
            <input type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Option C" style={inputStyle} />
            <input type="text" value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Option D" style={inputStyle} />

            <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Correct Option:</label>
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

            <h3 style={{ marginTop: '1.5rem' }}>Questions in: {currentSessionId}</h3>
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
          </>
        )}

        <h3 style={{ marginTop: '2rem' }}>📊 Student Marks</h3>
        <div>
          {studentMarks.map((s, i) => (
            <div key={i} style={{ fontSize: '1rem', padding: '5px 0' }}>
              {s.name}: <strong>{s.score}/10</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
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