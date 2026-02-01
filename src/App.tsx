import { useState, useEffect } from 'react'

const CodeRain = () => {
  const columns = 15
  const chars = ['>', '<', '/', '{', '}', '(', ')', ';', '=', '+', 'fn', 'if', '[]', '&&', '||']
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="code-rain absolute"
          style={{
            left: `${(i / columns) * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>{chars[Math.floor(Math.random() * chars.length)]}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

const AnimatedCounter = ({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [target])
  
  return (
    <div className="metric-card text-center p-6">
      <div className="metric-value">
        <div className="text-5xl md:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-green-400">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-gray-400 mt-2 text-sm uppercase tracking-widest">{label}</div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) => (
  <div 
    className="glass-card rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-5xl mb-6 feature-icon group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-3 font-display">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
)

const BuildCard = ({ title, author, type, time }: { title: string; author: string; type: string; time: string }) => (
  <div className="build-card glass-card rounded-xl p-6 border-l-4 border-l-cyan-400">
    <div className="flex items-start justify-between mb-4">
      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs font-mono">{type}</span>
      <span className="text-gray-500 text-sm">{time}</span>
    </div>
    <h4 className="text-white font-medium mb-2 line-clamp-2">{title}</h4>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-cyan-400"></div>
      <span className="text-gray-400 text-sm">@{author}</span>
    </div>
  </div>
)

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const TerminalWindow = () => {
  const [text, setText] = useState('')
  const fullText = '> clonkbot build "Create a landing page for my startup"\n\n✓ Parsing request...\n✓ Generating React components...\n✓ Applying Tailwind styles...\n✓ Building with Vite...\n\n🚀 App deployed! https://your-app.vercel.app'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden max-w-2xl mx-auto">
      <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-gray-500 text-sm font-mono">terminal</span>
      </div>
      <div className="p-6 font-mono text-sm md:text-base">
        <pre className="text-green-400 whitespace-pre-wrap terminal-text">
          {text}<span className="typing-cursor"></span>
        </pre>
      </div>
    </div>
  )
}

function App() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: '⚡', title: 'Tweet to App', description: 'Just reply to @clonkbot with your idea. We handle the rest — from parsing your request to deploying a fully functional web app.' },
    { icon: '🎨', title: 'Beautiful by Default', description: 'Every build comes with polished UI, responsive design, and thoughtful styling. No more boilerplate ugliness.' },
    { icon: '🚀', title: 'Instant Deploy', description: 'Your app goes live on Vercel automatically. Share the link immediately with your followers.' },
    { icon: '🧠', title: 'Claude-Powered', description: 'Built on Anthropic\'s Claude for intelligent code generation that actually works and makes sense.' },
    { icon: '🔧', title: 'Full Stack Ready', description: 'React, TypeScript, Tailwind CSS — modern tech stack that\'s production-ready from day one.' },
    { icon: '💬', title: 'Conversational', description: 'Iterate on your builds through natural conversation. Just reply with changes you want.' },
  ]

  const recentBuilds = [
    { title: 'Pomodoro Timer with Lo-fi Music', author: 'devlife_', type: 'Productivity', time: '2m ago' },
    { title: 'Gradient Generator Tool', author: 'css_wizard', type: 'Design Tool', time: '5m ago' },
    { title: 'Habit Tracker Dashboard', author: 'quantified', type: 'Dashboard', time: '12m ago' },
    { title: 'Recipe Cost Calculator', author: 'home_chef', type: 'Calculator', time: '18m ago' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Scan line effect */}
      <div className="scan-line"></div>
      
      {/* Code rain background */}
      <CodeRain />
      
      {/* Grid + hex pattern overlay */}
      <div className="fixed inset-0 grid-bg hex-pattern pointer-events-none z-0"></div>
      
      {/* Gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[200px] pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-pink-500 to-green-400 flex items-center justify-center text-xl animate-pulse-glow">
                🤖
              </div>
              <span className="font-display font-bold text-xl tracking-tight">ClonkBot</span>
            </div>
            <a
              href="https://twitter.com/clonkbot"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-medium hover:bg-cyan-400 transition-colors"
            >
              <TwitterIcon />
              <span className="hidden sm:inline">Follow</span>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
          <div 
            className={`text-center max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Building apps 24/7</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-[0.9]">
              <span className="block">Tweet your idea.</span>
              <span className="block glitch animate-shimmer" data-text="Get an app.">Get an app.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              ClonkBot transforms your tweets into fully functional web applications. 
              <span className="text-cyan-400"> Powered by AI. Deployed instantly.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://twitter.com/clonkbot"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-border cyber-btn group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black rounded-2xl font-semibold text-lg hover:shadow-[0_0_40px_rgba(0,245,255,0.5)] transition-all duration-300"
              >
                <TwitterIcon />
                <span>Follow @clonkbot</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="https://twitter.com/intent/tweet?text=@clonkbot%20build%20me%20"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn flex items-center gap-2 px-8 py-4 glass-card rounded-2xl font-semibold text-lg hover:bg-white/5 transition-all border border-white/10 hover:border-cyan-400/50"
              >
                <span>Try it now</span>
                <span className="text-cyan-400">✨</span>
              </a>
            </div>
            
            {/* Terminal demo */}
            <div className="animate-float">
              <TerminalWindow />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
          <div className="max-w-6xl mx-auto relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AnimatedCounter target={1247} label="Apps Built" />
              <AnimatedCounter target={892} label="Happy Users" />
              <AnimatedCounter target={99} label="Uptime" suffix="%" />
              <AnimatedCounter target={30} label="Avg Build Time" suffix="s" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                How it <span className="text-cyan-400">works</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From tweet to deployed app in seconds. No coding required.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Builds Section */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent"></div>
          <div className="max-w-6xl mx-auto relative">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                  Recent <span className="text-pink-400">builds</span>
                </h2>
                <p className="text-gray-400">See what others are creating</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-card rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-300">Live feed</span>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentBuilds.map((build, i) => (
                <BuildCard key={i} {...build} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Ready to <span className="animate-shimmer">build something?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                  Join the community of builders using ClonkBot to bring their ideas to life.
                </p>
                <a
                  href="https://twitter.com/clonkbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-border cyber-btn inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 text-white rounded-2xl font-semibold text-xl animate-pulse-glow"
                >
                  <TwitterIcon />
                  <span>Follow @clonkbot</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-sm">
                🤖
              </div>
              <span className="font-display font-bold">ClonkBot</span>
            </div>
            <p className="text-gray-500 text-sm">
              Requested by{' '}
              <a 
                href="https://twitter.com/RasmusLearns" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                @RasmusLearns
              </a>
              {' '}·{' '}
              Built by{' '}
              <a 
                href="https://twitter.com/clonkbot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                @clonkbot
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App