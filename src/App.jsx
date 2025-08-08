import { useState, useEffect } from 'react'
import { Wallet, Users, PiggyBank, Star, Settings, Home, ArrowLeft, User, Shield, Trophy, Gift, CreditCard, Plus, X } from 'lucide-react'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'child' | 'parent'
  const [showPinEntry, setShowPinEntry] = useState(false)
  const [selectedChild, setSelectedChild] = useState(null)
  const [pin, setPin] = useState('')
  const [currentScreen, setCurrentScreen] = useState('login') // 'login' | 'dashboard' | 'goals' | 'requests' | 'new-goal' | 'new-request' | etc.
  const [newGoal, setNewGoal] = useState({ name: '', target: '', emoji: '🎯' })
  const [newRequest, setNewRequest] = useState({ item: '', price: '' })

  // Kids data with PINs
  const [kidsData, setKidsData] = useState({
    rafael: {
      name: 'Rafael',
      pin: '1234',
      balance: 150.50,
      level: 3,
      points: 245,
      goals: [
        { id: 1, name: 'Nintendo Switch', target: 500, current: 120, emoji: '🎮' },
        { id: 2, name: 'Bicicleta Nova', target: 300, current: 85, emoji: '🚲' }
      ],
      requests: [
        { id: 1, item: 'Pokémon Cards', price: 25.00, status: 'pending', date: 'Hoje' }
      ],
      transactions: [
        { id: 1, type: 'income', description: 'Mesada', amount: 50.00, date: 'Hoje' },
        { id: 2, type: 'request', description: 'Pedido: Brinquedo', amount: -45.00, date: 'Ontem', status: 'pending' }
      ]
    },
    gabriel: {
      name: 'Gabriel',
      pin: '5678',
      balance: 89.30,
      level: 2,
      points: 156,
      goals: [
        { id: 1, name: 'Tablet', target: 400, current: 89, emoji: '📱' },
        { id: 2, name: 'Kit Lego', target: 150, current: 45, emoji: '🧱' }
      ],
      requests: [
        { id: 1, item: 'Chocolate', price: 8.50, status: 'approved', date: 'Ontem' }
      ],
      transactions: [
        { id: 1, type: 'income', description: 'Mesada', amount: 40.00, date: 'Hoje' },
        { id: 2, type: 'expense', description: 'Doce aprovado', amount: -8.50, date: 'Ontem' }
      ]
    }
  })

  // Pending requests for parents
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, child: 'Rafael', item: 'Pokémon Cards', price: 25.00, date: 'Hoje' },
    { id: 2, child: 'Gabriel', item: 'Revista em Quadrinhos', price: 12.00, date: 'Ontem' }
  ])

  const handleChildSelection = (childKey) => {
    setSelectedChild(childKey)
    setShowPinEntry(true)
  }

  const handlePinEntry = (digit) => {
    const newPin = pin + digit
    setPin(newPin)
    
    if (newPin.length === 4) {
      const childData = kidsData[selectedChild]
      if (newPin === childData.pin) {
        setCurrentUser(selectedChild)
        setUserType('child')
        setCurrentScreen('dashboard')
        setShowPinEntry(false)
        setPin('')
      } else {
        // Wrong PIN - shake effect and reset
        setPin('')
        setTimeout(() => {
          alert('PIN incorreto! Tente novamente.')
        }, 100)
      }
    }
  }

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const handleParentLogin = () => {
    setUserType('parent')
    setCurrentUser('parent')
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setUserType(null)
    setCurrentScreen('login')
    setShowPinEntry(false)
    setSelectedChild(null)
    setPin('')
  }

  const handleApproveRequest = (requestId) => {
    const request = pendingRequests.find(req => req.id === requestId)
    if (request) {
      // Find which child made the request
      const childKey = Object.keys(kidsData).find(key => 
        kidsData[key].name === request.child
      )
      
      if (childKey) {
        // Update child's balance and add transaction
        setKidsData(prev => ({
          ...prev,
          [childKey]: {
            ...prev[childKey],
            balance: prev[childKey].balance - request.price,
            transactions: [
              {
                id: Date.now(),
                type: 'expense',
                description: `Compra: ${request.item}`,
                amount: -request.price,
                date: 'Agora'
              },
              ...prev[childKey].transactions
            ],
            requests: prev[childKey].requests.map(req => 
              req.id === requestId ? { ...req, status: 'approved' } : req
            )
          }
        }))
      }
    }
    
    // Remove from pending requests
    setPendingRequests(prev => prev.filter(req => req.id !== requestId))
  }

  const handleRejectRequest = (requestId) => {
    const request = pendingRequests.find(req => req.id === requestId)
    if (request) {
      // Find which child made the request
      const childKey = Object.keys(kidsData).find(key => 
        kidsData[key].name === request.child
      )
      
      if (childKey) {
        // Update child's request status
        setKidsData(prev => ({
          ...prev,
          [childKey]: {
            ...prev[childKey],
            requests: prev[childKey].requests.map(req => 
              req.id === requestId ? { ...req, status: 'rejected' } : req
            )
          }
        }))
      }
    }
    
    // Remove from pending requests
    setPendingRequests(prev => prev.filter(req => req.id !== requestId))
  }

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target) {
      const goal = {
        id: Date.now(),
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        current: 0,
        emoji: newGoal.emoji
      }
      
      setKidsData(prev => ({
        ...prev,
        [currentUser]: {
          ...prev[currentUser],
          goals: [...prev[currentUser].goals, goal]
        }
      }))
      
      setNewGoal({ name: '', target: '', emoji: '🎯' })
      setCurrentScreen('goals')
    }
  }

  const handleAddRequest = () => {
    if (newRequest.item && newRequest.price) {
      const request = {
        id: Date.now(),
        item: newRequest.item,
        price: parseFloat(newRequest.price),
        status: 'pending',
        date: 'Agora'
      }
      
      // Add to child's requests
      setKidsData(prev => ({
        ...prev,
        [currentUser]: {
          ...prev[currentUser],
          requests: [...prev[currentUser].requests, request]
        }
      }))
      
      // Add to pending requests for parents
      setPendingRequests(prev => [...prev, {
        id: request.id,
        child: kidsData[currentUser].name,
        item: request.item,
        price: request.price,
        date: request.date
      }])
      
      setNewRequest({ item: '', price: '' })
      setCurrentScreen('requests')
    }
  }

  const PinEntryView = () => {
    const childData = kidsData[selectedChild]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {childData.name[0]}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Olá, {childData.name}!</h1>
            <p className="text-gray-600">Digite seu PIN de 4 dígitos</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center space-x-4 mb-8">
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 ${
                  index < pin.length ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handlePinEntry(num.toString())}
                className="w-16 h-16 bg-gray-100 rounded-full text-2xl font-semibold text-gray-800 hover:bg-gray-200 transition-colors mx-auto"
              >
                {num}
              </button>
            ))}
            <div></div>
            <button
              onClick={() => handlePinEntry('0')}
              className="w-16 h-16 bg-gray-100 rounded-full text-2xl font-semibold text-gray-800 hover:bg-gray-200 transition-colors mx-auto"
            >
              0
            </button>
            <button
              onClick={handlePinDelete}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors mx-auto"
            >
              <X size={24} />
            </button>
          </div>

          <button
            onClick={() => {
              setShowPinEntry(false)
              setPin('')
            }}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  const KidsView = () => {
    const childData = kidsData[currentUser]
    
    if (currentScreen === 'new-goal') {
      const emojis = ['🎮', '🚲', '📱', '🧱', '🎯', '⚽', '🎸', '📚', '🎨', '🏀']
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentScreen('goals')}
                className="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">Novo Sonho</h1>
              <div className="w-12"></div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é o seu sonho?
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  placeholder="Ex: Nintendo Switch, Bicicleta..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quanto custa?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">R$</span>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    placeholder="0,00"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Escolha um emoji:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setNewGoal({ ...newGoal, emoji })}
                      className={`p-3 rounded-xl text-2xl transition-colors ${
                        newGoal.emoji === emoji 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setNewGoal({ name: '', target: '', emoji: '🎯' })
                    setCurrentScreen('goals')
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddGoal}
                  disabled={!newGoal.name || !newGoal.target}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    newGoal.name && newGoal.target
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Criar Sonho
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    if (currentScreen === 'new-request') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-red-500 p-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentScreen('requests')}
                className="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">Novo Pedido</h1>
              <div className="w-12"></div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  O que você quer comprar?
                </label>
                <input
                  type="text"
                  value={newRequest.item}
                  onChange={(e) => setNewRequest({ ...newRequest, item: e.target.value })}
                  placeholder="Ex: Chocolate, Brinquedo, Livro..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quanto custa?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">R$</span>
                  <input
                    type="number"
                    value={newRequest.price}
                    onChange={(e) => setNewRequest({ ...newRequest, price: e.target.value })}
                    placeholder="0,00"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-0.5">💡</span>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Seu saldo atual: R$ {childData.balance.toFixed(2)}
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      Os pais vão aprovar ou rejeitar seu pedido
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setNewRequest({ item: '', price: '' })
                    setCurrentScreen('requests')
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddRequest}
                  disabled={!newRequest.item || !newRequest.price}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    newRequest.item && newRequest.price
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Fazer Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (currentScreen === 'goals') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">Meus Sonhos</h1>
              <div className="w-12"></div>
            </div>

            {/* Goals */}
            <div className="space-y-4">
              {childData.goals.map(goal => (
                <div key={goal.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{goal.emoji}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{goal.name}</h3>
                        <p className="text-gray-600">R$ {goal.current.toFixed(2)} de R$ {goal.target.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{Math.round((goal.current / goal.target) * 100)}% completo</span>
                    <span>Faltam R$ {(goal.target - goal.current).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => setCurrentScreen('new-goal')}
                className="w-full bg-white/20 border-2 border-dashed border-white/40 text-white py-6 rounded-2xl font-semibold hover:bg-white/30 transition-colors"
              >
                + Adicionar Novo Sonho
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentScreen === 'requests') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 p-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">Meus Pedidos</h1>
              <div className="w-12"></div>
            </div>

            {/* Requests */}
            <div className="space-y-4 mb-6">
              {childData.requests.map(request => (
                <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{request.item}</h3>
                      <p className="text-gray-600">R$ {request.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{request.date}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'pending' ? 'Aguardando' :
                       request.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setCurrentScreen('new-request')}
              className="w-full bg-white text-purple-600 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              + Fazer Novo Pedido
            </button>
          </div>
        </div>
      )
    }
    
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Olá, {childData.name}! 👋</h1>
              <p className="text-gray-600">Nível {childData.level} • {childData.points} pontos</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={handleLogout}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Balance */}
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-4 text-white">
            <p className="text-sm opacity-80">Seu saldo</p>
            <p className="text-3xl font-bold">R$ {childData.balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCurrentScreen('goals')}
            className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <PiggyBank className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Metas</h3>
            <p className="text-sm text-gray-600">{childData.goals.length} sonhos ativos</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('requests')}
            className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Wallet className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Pedidos</h3>
            <p className="text-sm text-gray-600">{childData.requests.length} pendente</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {childData.transactions.slice(0, 3).map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 
                    transaction.type === 'expense' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <span className={`text-sm ${
                      transaction.type === 'income' ? 'text-green-600' : 
                      transaction.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : 
                       transaction.type === 'expense' ? '-' : '?'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 
                  transaction.type === 'expense' ? 'text-red-600' : 'text-orange-500'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  {transaction.status && transaction.status === 'pending' && (
                    <span className="text-orange-500 text-sm ml-1">(Pendente)</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }

  const ParentsView = () => {
    const totalBalance = Object.values(kidsData).reduce((sum, child) => sum + child.balance, 0)
    
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard dos Pais</h1>
              <p className="text-gray-600">Controle financeiro familiar</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total da família</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalBalance.toFixed(2)}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pedidos Pendentes ({pendingRequests.length})
            </h3>
            <div className="space-y-4">
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum pedido pendente</p>
              ) : (
                pendingRequests.map(request => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{request.item}</h4>
                      <span className="text-lg font-semibold text-blue-600">R$ {request.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Solicitado por {request.child}</p>
                    <p className="text-xs text-gray-500 mb-3">{request.date}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApproveRequest(request.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Aprovar
                      </button>
                      <button 
                        onClick={() => handleRejectRequest(request.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Rejeitar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Family Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Visão da Família</h3>
            <div className="space-y-4">
              {Object.entries(kidsData).map(([key, child]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {child.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{child.name}</p>
                      <p className="text-sm text-gray-600">Nível {child.level} • {child.points} pontos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">R$ {child.balance.toFixed(2)}</p>
                    <p className="text-sm text-green-600">PIN: {child.pin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  const LoginView = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏦 Banco da Família</h1>
          <p className="text-gray-600">Educação financeira para toda a família</p>
        </div>

        <div className="space-y-4">
          {/* Kids Login Options */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 text-center">Entrar como:</h3>
            
            <button
              onClick={() => handleChildSelection('rafael')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <User size={24} />
              <span>Rafael</span>
            </button>
            
            <button
              onClick={() => handleChildSelection('gabriel')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <User size={24} />
              <span>Gabriel</span>
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          {/* Parents Login */}
          <button
            onClick={handleParentLogin}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <Shield size={24} />
            <span>Entrar como Pais</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Ensine seus filhos sobre dinheiro de forma divertida!
          </p>
        </div>
      </div>
    </div>
  )

  // Show PIN entry if child selected
  if (showPinEntry) {
    return <PinEntryView />
  }

  // Show login if no user logged in
  if (!currentUser) {
    return <LoginView />
  }

  // Show appropriate dashboard
  return userType === 'child' ? <KidsView /> : <ParentsView />
}

export default App