import React, { useState } from 'react';
import { Terminal, User, UserPlus, Home, LogOut } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addTerminalLog = (message) => {
    setTerminalLogs(prev => [...prev, { id: Date.now(), message }]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setEmail('');
    setPassword('');
    addTerminalLog('User logged out');
  };

  const simulateLogin = (e) => {
    e.preventDefault();
    const randomIP = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    
    addTerminalLog(`IP ${randomIP} inserted email ${email} password ${'*'.repeat(password.length)}`);
    addTerminalLog('Checking against database...');
    
    setTimeout(() => {
      // Simulate successful login for demo purposes
      if (email.includes('@') && password.length >= 6) {
        addTerminalLog('Login successful');
        setIsAuthenticated(true);
        setCurrentPage('home');
      } else {
        addTerminalLog('No match found -> prompting to create account');
        setCurrentPage('register');
      }
    }, 2000);
  };

  const simulateRegister = (e) => {
    e.preventDefault();
    const randomIP = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    
    addTerminalLog(`IP ${randomIP} creating new account with email ${email}`);
    addTerminalLog('Validating input...');
    
    setTimeout(() => {
      addTerminalLog('Account created successfully');
      setIsAuthenticated(true);
      setCurrentPage('home');
    }, 2000);
  };

  // Prevent unauthorized access to home page
  const navigateToPage = (page) => {
    if (page === 'home' && !isAuthenticated) {
      addTerminalLog('Access denied: Please log in first');
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Social Media UI (1/3 width) */}
      <div className="w-1/3 bg-white shadow-lg overflow-hidden">
        {/* Navigation */}
        <nav className="bg-indigo-600 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-xl font-bold">Global Village</h1>
            <div className="flex space-x-4">
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => navigateToPage('login')}
                    className={`p-2 rounded ${currentPage === 'login' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  >
                    <User className="text-white" size={20} />
                  </button>
                  <button
                    onClick={() => navigateToPage('register')}
                    className={`p-2 rounded ${currentPage === 'register' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  >
                    <UserPlus className="text-white" size={20} />
                  </button>
                </>
              )}
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => navigateToPage('home')}
                    className={`p-2 rounded ${currentPage === 'home' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  >
                    <Home className="text-white" size={20} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded hover:bg-indigo-700"
                  >
                    <LogOut className="text-white" size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="p-6">
          {currentPage === 'login' && (
            <form onSubmit={simulateLogin} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
              >
                Log In
              </button>
            </form>
          )}

          {currentPage === 'register' && (
            <form onSubmit={simulateRegister} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
              >
                Register
              </button>
            </form>
          )}

          {isAuthenticated && currentPage === 'home' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">For You</h2>
              {/* Dummy posts */}
              {[1, 2, 3].map((post) => (
                <div key={post} className="bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold">User{post}</div>
                      <div className="text-sm text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-200 rounded mb-4"></div>
                  <p className="text-gray-700">
                    This is a sample post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Terminal (2/3 width) */}
      <div className="w-2/3 bg-gray-900 p-6 overflow-auto">
        <div className="flex items-center space-x-2 mb-4">
          <Terminal className="text-green-400" size={24} />
          <h2 className="text-xl font-mono text-green-400">System Logs</h2>
        </div>
        <div className="font-mono text-sm">
          {terminalLogs.map((log) => (
            <div key={log.id} className="text-green-400 mb-2">
              &gt; {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;