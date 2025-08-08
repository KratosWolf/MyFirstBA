import { useState } from 'react'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [pin, setPin] = useState('')
  const [showPinEntry, setShowPinEntry] = useState(false)
  const [selectedChild, setSelectedChild] = useState(null)
  const [currentTab, setCurrentTab] = useState('inicio') // 'inicio', 'sonhos', 'gastos', 'regras'
  const [newRequest, setNewRequest] = useState({ item: '', price: '', category: 'Jogos Online', comments: '' })
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [newGoal, setNewGoal] = useState({ name: '', target: '', emoji: '🎯' })
  const [parentTab, setParentTab] = useState('resumo') // 'resumo', 'pedidos', 'limites', 'categorias', 'criancas', 'relatorios'
  const [selectedPeriod, setSelectedPeriod] = useState('month') // 'month', 'quarter', 'year'
  const [newCategory, setNewCategory] = useState({ name: '', monthlyLimit: '', quarterlyLimit: '' })
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [categories, setCategories] = useState(['Jogos Online', 'Alimentação', 'Brinquedos', 'Roupas', 'Livros'])
  const [gastosSelectedPeriod, setGastosSelectedPeriod] = useState('month')
  const [showGoalFundForm, setShowGoalFundForm] = useState(null) // goalId when showing form
  const [goalFundAmount, setGoalFundAmount] = useState('')
  
  // Child management states
  const [showAddChildForm, setShowAddChildForm] = useState(false)
  const [showEditChildForm, setShowEditChildForm] = useState(null) // childKey when editing
  const [newChild, setNewChild] = useState({ name: '', pin: '' })
  const [editingChild, setEditingChild] = useState({ name: '', pin: '' })
  
  // Savings settings
  const [savingsSettings, setSavingsSettings] = useState({
    monthlyInterestRate: 0.03, // 3% ao mês
    minimumBalance: 10.00, // Mínimo para render juros
    compoundFrequency: 'monthly' // monthly
  })
  
  // Category limits with monthly and quarterly limits
  const [categoryLimits, setCategoryLimits] = useState({
    'Jogos Online': { monthly: 50, quarterly: 150 },
    'Alimentação': { monthly: 80, quarterly: 240 },
    'Brinquedos': { monthly: 100, quarterly: 300 },
    'Roupas': { monthly: 120, quarterly: 360 },
    'Livros': { monthly: 60, quarterly: 180 }
  })

  const [kidsData, setKidsData] = useState({
    rafael: { 
      name: 'Rafael', 
      pin: '1234', 
      balance: 150.50,
      level: 3,
      points: 250,
      goals: [
        { id: 1, name: 'Nintendo Switch', target: 350.00, current: 150.50, deadline: '24/12/2024' }
      ],
      requests: [
        { id: 1, item: 'Skin do Fortnite', price: 25.00, status: 'pending', category: 'Jogos Online' },
        { id: 2, item: 'Chocolate', price: 15.00, status: 'pending', category: 'Alimentação' }
      ],
      transactions: [
        { id: 1, type: 'credit', description: 'Mesada Semanal', amount: 50.00, date: '08/08/2025', balance: 150.50 },
        { id: 2, type: 'interest', description: 'Rendimento da Poupança', amount: 1.50, date: '08/08/2025', balance: 150.50 },
        { id: 3, type: 'debit', description: 'Compra aprovada: Chocolate', amount: 12.50, date: '07/08/2025', balance: 100.50, category: 'Alimentação' },
        { id: 4, type: 'credit', description: 'Tarefa Extra: Lavar Louça', amount: 15.00, date: '06/08/2025', balance: 113.00 },
        { id: 5, type: 'interest', description: 'Rendimento da Poupança', amount: 0.98, date: '06/08/2025', balance: 98.00 },
        { id: 6, type: 'debit', description: 'Compra aprovada: Revista em Quadrinhos', amount: 18.00, date: '05/08/2025', balance: 98.00, category: 'Livros' },
        { id: 7, type: 'credit', description: 'Mesada Semanal', amount: 50.00, date: '01/08/2025', balance: 116.00 }
      ],
      categorySpending: {
        'Jogos Online': 35.00,
        'Alimentação': 22.50,
        'Brinquedos': 0.00,
        'Roupas': 0.00,
        'Livros': 18.00
      },
      savings: {
        totalEarned: 12.48, // Total já ganho em rendimentos
        lastInterestDate: '08/08/2025',
        monthlyEarnings: 8.25, // Rendimento deste mês
        yearlyEarnings: 12.48 // Rendimento deste ano
      },
      badges: [
        { id: 'first-save', name: 'Primeiro Poupador', emoji: '🥇', description: 'Sua primeira poupança!' },
        { id: 'goal-creator', name: 'Sonhador', emoji: '🌟', description: 'Criou seu primeiro sonho!' },
        { id: 'responsible', name: 'Responsável', emoji: '🎯', description: 'Mantém gastos dentro do limite!' }
      ],
      streak: {
        current: 5, // dias sem gastar
        best: 12,
        type: 'save' // 'save' or 'spend'
      }
    },
    gabriel: { 
      name: 'Gabriel', 
      pin: '5678', 
      balance: 89.30,
      level: 2,
      points: 156,
      goals: [
        { id: 1, name: 'Tablet', target: 400.00, current: 89.30, deadline: '15/01/2025' }
      ],
      requests: [
        { id: 1, item: 'Kit Lego', price: 45.00, status: 'approved', category: 'Brinquedos' }
      ],
      transactions: [
        { id: 1, type: 'credit', description: 'Mesada Semanal', amount: 40.00, date: '08/08/2025', balance: 89.30 },
        { id: 2, type: 'interest', description: 'Rendimento da Poupança', amount: 0.89, date: '08/08/2025', balance: 89.30 },
        { id: 3, type: 'debit', description: 'Compra aprovada: Kit Lego', amount: 45.00, date: '06/08/2025', balance: 49.30, category: 'Brinquedos' },
        { id: 4, type: 'credit', description: 'Tarefa Extra: Organizar Quarto', amount: 10.00, date: '05/08/2025', balance: 94.30 },
        { id: 5, type: 'interest', description: 'Rendimento da Poupança', amount: 0.84, date: '05/08/2025', balance: 84.30 },
        { id: 6, type: 'credit', description: 'Mesada Semanal', amount: 40.00, date: '01/08/2025', balance: 84.30 },
        { id: 7, type: 'credit', description: 'Bônus: Boas Notas', amount: 25.00, date: '30/07/2025', balance: 44.30 }
      ],
      categorySpending: {
        'Jogos Online': 0.00,
        'Alimentação': 15.00,
        'Brinquedos': 45.00,
        'Roupas': 0.00,
        'Livros': 8.50
      },
      savings: {
        totalEarned: 7.64, // Total já ganho em rendimentos
        lastInterestDate: '08/08/2025',
        monthlyEarnings: 5.45, // Rendimento deste mês
        yearlyEarnings: 7.64 // Rendimento deste ano
      },
      badges: [
        { id: 'first-save', name: 'Primeiro Poupador', emoji: '🥇', description: 'Sua primeira poupança!' },
        { id: 'goal-creator', name: 'Sonhador', emoji: '🌟', description: 'Criou seu primeiro sonho!' }
      ],
      streak: {
        current: 3, // dias sem gastar
        best: 8,
        type: 'save'
      }
    }
  })


  // Get all pending requests across all children
  const getAllPendingRequests = () => {
    const allRequests = []
    Object.entries(kidsData).forEach(([childKey, child]) => {
      child.requests
        .filter(req => req.status === 'pending')
        .forEach(req => {
          allRequests.push({
            ...req,
            childKey,
            childName: child.name
          })
        })
    })
    return allRequests
  }

  // Handle approve request with balance adjustment (allowing negative balance = loan)
  const handleApproveRequest = (requestId, childKey, overrideLimit = false) => {
    setKidsData(prev => {
      const child = prev[childKey]
      const request = child.requests.find(req => req.id === requestId)
      
      if (request) {
        // Check spending limits unless overridden by parent
        if (!overrideLimit && categoryLimits[request.category]) {
          const currentSpent = child.categorySpending[request.category] || 0
          const monthlyLimit = categoryLimits[request.category].monthly
          
          if (currentSpent + request.price > monthlyLimit) {
            // Ask parent to confirm override
            const confirmOverride = window.confirm(
              `⚠️ Esta compra excederá o limite mensal da categoria "${request.category}".\n\n` +
              `Gasto atual: R$ ${currentSpent.toFixed(2)}\n` +
              `Limite mensal: R$ ${monthlyLimit.toFixed(2)}\n` +
              `Nova compra: R$ ${request.price.toFixed(2)}\n` +
              `Total após compra: R$ ${(currentSpent + request.price).toFixed(2)}\n\n` +
              `Deseja aprovar mesmo assim?`
            )
            
            if (!confirmOverride) {
              return prev // Don't approve the request
            }
          }
        }

        const newBalance = child.balance - request.price
        const isLoan = child.balance < request.price
        
        // Create transaction record
        const newTransaction = {
          id: Date.now(),
          type: 'debit',
          description: `Compra aprovada: ${request.item}${isLoan ? ' (Ajuda dos Pais)' : ''}`,
          amount: request.price,
          date: new Date().toLocaleDateString('pt-BR'),
          balance: newBalance,
          category: request.category,
          isLoan: isLoan
        }

        return {
          ...prev,
          [childKey]: {
            ...child,
            balance: newBalance,
            requests: child.requests.map(req => 
              req.id === requestId ? { ...req, status: 'approved' } : req
            ),
            transactions: [newTransaction, ...child.transactions],
            // Update category spending
            categorySpending: {
              ...child.categorySpending,
              [request.category]: (child.categorySpending[request.category] || 0) + request.price
            }
          }
        }
      }
      return prev
    })
  }

  // Handle reject request
  const handleRejectRequest = (requestId, childKey) => {
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

  // Check and reset quarterly limits
  const getCurrentQuarter = () => {
    const now = new Date()
    const month = now.getMonth() + 1 // JavaScript months are 0-indexed
    if (month <= 3) return 'Q1'
    if (month <= 6) return 'Q2'
    if (month <= 9) return 'Q3'
    return 'Q4'
  }

  const getQuarterLabel = (quarter) => {
    const quarterLabels = {
      'Q1': 'Jan-Mar',
      'Q2': 'Abr-Jun', 
      'Q3': 'Jul-Set',
      'Q4': 'Out-Dez'
    }
    return quarterLabels[quarter] || quarter
  }

  const resetQuarterlyLimits = () => {
    const currentQuarter = getCurrentQuarter()
    const confirmReset = window.confirm(
      `🔄 Deseja reiniciar os limites trimestrais para ${getQuarterLabel(currentQuarter)}?\n\n` +
      `Isso zerará todos os gastos das crianças nas categorias e começará um novo período.`
    )
    
    if (confirmReset) {
      setKidsData(prev => {
        const updated = {}
        Object.entries(prev).forEach(([key, child]) => {
          updated[key] = {
            ...child,
            categorySpending: Object.keys(child.categorySpending).reduce((acc, category) => {
              acc[category] = 0
              return acc
            }, {})
          }
        })
        return updated
      })
      
      alert(`✅ Limites trimestrais reiniciados para ${getQuarterLabel(currentQuarter)}!`)
    }
  }

  // Child management functions
  const validatePin = (pin, excludeChild = null) => {
    if (!/^\d{4}$/.test(pin)) {
      return 'PIN deve ter exatamente 4 dígitos'
    }
    
    // Check if PIN is already used by another child
    const existingChild = Object.entries(kidsData).find(([key, child]) => 
      child.pin === pin && key !== excludeChild
    )
    
    if (existingChild) {
      return `PIN já está sendo usado por ${existingChild[1].name}`
    }
    
    return null
  }

  const createDefaultChildData = (name, pin) => ({
    name,
    pin,
    balance: 0.00,
    level: 1,
    points: 0,
    goals: [],
    requests: [],
    transactions: [],
    categorySpending: categories.reduce((acc, category) => {
      acc[category] = 0
      return acc
    }, {}),
    savings: {
      totalEarned: 0,
      lastInterestDate: new Date().toLocaleDateString('pt-BR'),
      monthlyEarnings: 0,
      yearlyEarnings: 0
    },
    badges: [],
    streak: {
      current: 0,
      best: 0,
      type: 'save'
    }
  })

  const addChild = () => {
    if (!newChild.name.trim()) {
      alert('⚠️ Por favor, insira o nome da criança!')
      return
    }

    const pinError = validatePin(newChild.pin)
    if (pinError) {
      alert(`⚠️ ${pinError}`)
      return
    }

    // Generate unique key for child
    const childKey = newChild.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')
    
    if (kidsData[childKey]) {
      alert('⚠️ Já existe uma criança com esse nome!')
      return
    }

    setKidsData(prev => ({
      ...prev,
      [childKey]: createDefaultChildData(newChild.name, newChild.pin)
    }))

    alert(`✅ ${newChild.name} adicionado(a) com sucesso!`)
    setShowAddChildForm(false)
    setNewChild({ name: '', pin: '' })
  }

  const updateChildPin = (childKey) => {
    const pinError = validatePin(editingChild.pin, childKey)
    if (pinError) {
      alert(`⚠️ ${pinError}`)
      return
    }

    setKidsData(prev => ({
      ...prev,
      [childKey]: {
        ...prev[childKey],
        pin: editingChild.pin,
        name: editingChild.name
      }
    }))

    alert(`✅ Dados de ${editingChild.name} atualizados com sucesso!`)
    setShowEditChildForm(null)
    setEditingChild({ name: '', pin: '' })
  }

  const removeChild = (childKey, childName) => {
    const confirmDelete = window.confirm(
      `⚠️ ATENÇÃO: Tem certeza que deseja remover ${childName}?\n\n` +
      `Todos os dados serão perdidos permanentemente:\n` +
      `• Saldo e transações\n` +
      `• Sonhos e progresso\n` +
      `• Medalhas e pontos\n` +
      `• Histórico completo\n\n` +
      `Esta ação NÃO pode ser desfeita!`
    )

    if (confirmDelete) {
      setKidsData(prev => {
        const updated = { ...prev }
        delete updated[childKey]
        return updated
      })

      // If the removed child was currently logged in, log them out
      if (currentUser === childKey) {
        setCurrentUser(null)
        setCurrentTab('inicio')
      }

      alert(`✅ ${childName} foi removido(a) com sucesso!`)
    }
  }

  // Gamification system
  const awardPoints = (childKey, points, reason) => {
    setKidsData(prev => {
      const child = prev[childKey]
      const newPoints = child.points + points
      const newLevel = Math.floor(newPoints / 100) + 1 // Level up every 100 points
      
      return {
        ...prev,
        [childKey]: {
          ...child,
          points: newPoints,
          level: newLevel > child.level ? newLevel : child.level
        }
      }
    })
    
    if (points > 0) {
      setTimeout(() => alert(`🎉 ${reason}! +${points} pontos!`), 500)
    }
  }

  const checkAndAwardBadges = (childKey, action) => {
    setKidsData(prev => {
      const child = prev[childKey]
      const newBadges = [...child.badges]
      let badgeAwarded = false

      // Badge logic
      if (action === 'first_goal_fund' && !child.badges.find(b => b.id === 'goal-investor')) {
        newBadges.push({
          id: 'goal-investor',
          name: 'Investidor de Sonhos',
          emoji: '💎',
          description: 'Investiu pela primeira vez em um sonho!'
        })
        badgeAwarded = true
      }

      if (action === 'goal_completed' && !child.badges.find(b => b.id === 'dream-achiever')) {
        newBadges.push({
          id: 'dream-achiever',
          name: 'Realizador de Sonhos',
          emoji: '🌟',
          description: 'Completou seu primeiro sonho!'
        })
        badgeAwarded = true
      }

      if (action === 'streak_week' && child.streak?.current >= 7 && !child.badges.find(b => b.id === 'week-saver')) {
        newBadges.push({
          id: 'week-saver',
          name: 'Poupador da Semana',
          emoji: '📅',
          description: '7 dias consecutivos poupando!'
        })
        badgeAwarded = true
      }

      return badgeAwarded ? {
        ...prev,
        [childKey]: { ...child, badges: newBadges }
      } : prev
    })
  }

  // Calculate quarterly spending
  const getQuarterlySpending = (childKey) => {
    const child = kidsData[childKey]
    const quarterlySpending = {}
    
    Object.entries(child.categorySpending).forEach(([category, monthlySpent]) => {
      // For now, multiply monthly by current month in quarter (simplified)
      const monthInQuarter = (new Date().getMonth() % 3) + 1
      quarterlySpending[category] = monthlySpent * monthInQuarter
    })
    
    return quarterlySpending
  }

  // Handle goal funding
  const handleFundGoal = (goalId, amount, childKey) => {
    const fundAmount = parseFloat(amount)
    if (fundAmount <= 0) {
      alert('Por favor, insira um valor válido!')
      return
    }

    setKidsData(prev => {
      const child = prev[childKey]
      const goal = child.goals.find(g => g.id === goalId)
      
      if (!goal) return prev

      if (fundAmount > child.balance) {
        alert(`Ops! Você só tem R$ ${child.balance.toFixed(2)} disponível.`)
        return prev
      }

      const newBalance = child.balance - fundAmount
      const newGoalCurrent = Math.min(goal.current + fundAmount, goal.target)
      const actualAmount = newGoalCurrent - goal.current // In case we hit the target exactly
      
      // Create transaction
      const newTransaction = {
        id: Date.now(),
        type: 'debit',
        description: `Investido no sonho: ${goal.name}`,
        amount: actualAmount,
        date: new Date().toLocaleDateString('pt-BR'),
        balance: newBalance,
        goalId: goalId
      }

      const updatedGoals = child.goals.map(g => 
        g.id === goalId ? { ...g, current: newGoalCurrent } : g
      )

      // Update streak (funding a goal counts as saving)
      const newStreak = {
        ...child.streak,
        current: (child.streak?.current || 0) + 1,
        best: Math.max((child.streak?.best || 0), (child.streak?.current || 0) + 1)
      }

      // Check if goal is completed
      const goalCompleted = newGoalCurrent >= goal.target
      if (goalCompleted) {
        alert(`🎉 Parabéns! Você conseguiu juntar tudo para seu ${goal.name}!`)
      }

      return {
        ...prev,
        [childKey]: {
          ...child,
          balance: newBalance + (fundAmount - actualAmount), // Return any excess
          goals: updatedGoals,
          transactions: [newTransaction, ...child.transactions],
          streak: newStreak
        }
      }
    })

    // Award points and badges
    awardPoints(childKey, 10, "Investiu no sonho")
    checkAndAwardBadges(childKey, 'first_goal_fund')
    
    if (goal && (goal.current + fundAmount) >= goal.target) {
      awardPoints(childKey, 50, "Sonho realizado")
      checkAndAwardBadges(childKey, 'goal_completed')
    }

    // Check weekly streak
    const child = kidsData[childKey]
    if (child.streak?.current >= 6) { // Will be 7 after update
      checkAndAwardBadges(childKey, 'streak_week')
    }

    setShowGoalFundForm(null)
    setGoalFundAmount('')
  }

  // Calculate spending by category for a child
  const getSpendingByCategory = (childKey, period = 'month') => {
    const child = kidsData[childKey]
    const approvedRequests = child.requests.filter(req => req.status === 'approved')
    
    const spending = {}
    categories.forEach(category => {
      spending[category] = approvedRequests
        .filter(req => req.category === category)
        .reduce((sum, req) => sum + req.price, 0)
    })
    
    return spending
  }

  // Get consolidated spending data across different periods
  const getConsolidatedData = () => {
    const periods = {
      month: {
        label: 'Este Mês',
        multiplier: 1,
        data: {}
      },
      quarter: {
        label: 'Este Trimestre', 
        multiplier: 3,
        data: {}
      },
      year: {
        label: 'Este Ano',
        multiplier: 12,
        data: {}
      }
    }

    Object.entries(kidsData).forEach(([childKey, child]) => {
      const baseSpending = getSpendingByCategory(childKey)
      
      Object.keys(periods).forEach(periodKey => {
        const period = periods[periodKey]
        const adjustedSpending = {}
        
        Object.entries(baseSpending).forEach(([category, amount]) => {
          // Simulate historical data by multiplying current spending
          adjustedSpending[category] = amount * period.multiplier * (0.8 + Math.random() * 0.4)
        })
        
        period.data[childKey] = adjustedSpending
      })
    })

    return periods
  }

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
        setShowPinEntry(false)
        setPin('')
        setCurrentTab('inicio')
      } else {
        setPin('')
        alert('PIN incorreto!')
      }
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setShowPinEntry(false)
    setSelectedChild(null)
    setPin('')
    setCurrentTab('inicio')
  }

  const handleAddRequest = () => {
    if (newRequest.item && newRequest.price) {
      // Add request logic here
      setNewRequest({ item: '', price: '', category: 'jogos', comments: '' })
      alert('Pedido enviado!')
    }
  }

  // PIN Entry Screen
  if (showPinEntry) {
    const childData = kidsData[selectedChild]
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '24px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{fontSize: '28px', marginBottom: '10px', color: '#2d3748'}}>Olá, {childData.name}!</h1>
          <p style={{marginBottom: '30px', color: '#718096'}}>Digite seu PIN de 4 dígitos</p>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '30px'}}>
            {[0, 1, 2, 3].map(index => (
              <div key={index} style={{
                width: '16px', 
                height: '16px', 
                borderRadius: '50%', 
                border: '2px solid #e2e8f0',
                backgroundColor: index < pin.length ? '#4299e1' : 'transparent'
              }} />
            ))}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px'}}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} onClick={() => handlePinEntry(num.toString())} 
                style={{
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  border: 'none', 
                  background: '#f7fafc', 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2d3748',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#edf2f7'}
                onMouseOut={(e) => e.target.style.background = '#f7fafc'}>
                {num}
              </button>
            ))}
            <div></div>
            <button onClick={() => handlePinEntry('0')} 
              style={{
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                border: 'none', 
                background: '#f7fafc', 
                fontSize: '20px',
                fontWeight: '600',
                color: '#2d3748',
                cursor: 'pointer'
              }}>
              0
            </button>
            <button onClick={() => setPin(pin.slice(0, -1))} 
              style={{
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                border: 'none', 
                background: '#fed7e2', 
                color: '#e53e3e',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
              ×
            </button>
          </div>

          <button onClick={() => {setShowPinEntry(false); setPin('')}} 
            style={{
              width: '100%', 
              padding: '14px', 
              border: 'none', 
              borderRadius: '12px', 
              background: '#e2e8f0',
              color: '#4a5568',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
            Voltar
          </button>
        </div>
      </div>
    )
  }

  // Parents Dashboard
  if (currentUser === 'parent') {
    const pendingRequests = getAllPendingRequests()
    const totalFamilyBalance = Object.values(kidsData).reduce((sum, child) => sum + child.balance, 0)
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          
          {/* Header */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h1 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#2d3748'}}>👨‍👩‍👧‍👦 Dashboard dos Pais</h1>
                <p style={{margin: 0, color: '#718096'}}>
                  Total familiar: <strong style={{color: '#38a169'}}>R$ {totalFamilyBalance.toFixed(2)}</strong> • 
                  {pendingRequests.length} pedidos pendentes
                </p>
              </div>
              <button onClick={handleLogout} style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '12px',
                background: '#e2e8f0',
                color: '#4a5568',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                ← Sair
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{display: 'flex', gap: '4px'}}>
              {[
                {key: 'resumo', label: '📊 Resumo', icon: '📊'},
                {key: 'pedidos', label: '⏰ Pedidos', badge: pendingRequests.length},
                {key: 'limites', label: '🎯 Limites'},
                {key: 'categorias', label: '🏷️ Categorias'},
                {key: 'criancas', label: '👶 Crianças'},
                {key: 'configuracoes', label: '⚙️ Config'},
                {key: 'relatorios', label: '📈 Relatórios'}
              ].map(tab => (
                <button key={tab.key} 
                  onClick={() => setParentTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '16px',
                    background: parentTab === tab.key ? '#4299e1' : 'transparent',
                    color: parentTab === tab.key ? 'white' : '#4a5568',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}>
                  {tab.label}
                  {tab.badge && tab.badge > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {parentTab === 'resumo' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {Object.entries(kidsData).map(([childKey, child]) => {
                const spending = getSpendingByCategory(childKey)
                const pendingCount = child.requests.filter(r => r.status === 'pending').length
                
                return (
                  <div key={childKey} style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                      <div>
                        <h3 style={{margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600', color: '#2d3748'}}>
                          {child.name}
                        </h3>
                        <p style={{margin: 0, fontSize: '14px', color: '#718096'}}>
                          Nível {child.level} • {child.points} pontos • PIN: {child.pin}
                        </p>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '24px', fontWeight: 'bold', color: '#38a169'}}>
                          R$ {child.balance.toFixed(2)}
                        </div>
                        {pendingCount > 0 && (
                          <div style={{fontSize: '12px', color: '#f6ad55', fontWeight: '500'}}>
                            {pendingCount} pedidos pendentes
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Quick spending overview */}
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px'}}>
                      {Object.entries(spending).slice(0, 3).map(([category, amount]) => (
                        <div key={category} style={{
                          background: '#f7fafc',
                          padding: '12px',
                          borderRadius: '12px',
                          textAlign: 'center'
                        }}>
                          <div style={{fontSize: '12px', color: '#718096'}}>{category}</div>
                          <div style={{fontSize: '16px', fontWeight: 'bold', color: amount > 0 ? '#ef4444' : '#4a5568'}}>
                            R$ {amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {parentTab === 'pedidos' && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{margin: '0 0 20px 0', fontSize: '20px', color: '#2d3748'}}>
                ⏰ Pedidos Pendentes ({pendingRequests.length})
              </h3>
              
              {pendingRequests.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#718096'
                }}>
                  <div style={{fontSize: '48px', marginBottom: '16px'}}>🎉</div>
                  <p style={{margin: 0, fontSize: '18px'}}>Nenhum pedido pendente!</p>
                  <p style={{margin: '8px 0 0 0', fontSize: '14px'}}>Todos os pedidos foram processados.</p>
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {pendingRequests.map(request => (
                    <div key={`${request.childKey}-${request.id}`} style={{
                      border: '2px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '20px'
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px'}}>
                        <div>
                          <div style={{fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '4px'}}>
                            {request.item}
                          </div>
                          <div style={{fontSize: '14px', color: '#718096', marginBottom: '8px'}}>
                            Solicitado por <strong>{request.childName}</strong> • {request.category}
                          </div>
                          {request.comments && (
                            <div style={{fontSize: '14px', color: '#4a5568', fontStyle: 'italic'}}>
                              "{request.comments}"
                            </div>
                          )}
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#4299e1'}}>
                            R$ {request.price.toFixed(2)}
                          </div>
                          <div style={{fontSize: '12px', color: '#718096'}}>{request.date}</div>
                        </div>
                      </div>
                      
                      <div style={{
                        background: '#f7fafc',
                        padding: '12px',
                        borderRadius: '12px',
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#4a5568'
                      }}>
                        💰 Saldo atual de {request.childName}: <strong>R$ {kidsData[request.childKey].balance.toFixed(2)}</strong>
                        {kidsData[request.childKey].balance < request.price && (
                          <span style={{color: '#f6ad55', marginLeft: '8px'}}>
                            🤝 Será ajuda de R$ {(request.price - kidsData[request.childKey].balance).toFixed(2)} (sem juros)
                          </span>
                        )}
                      </div>
                      
                      <div style={{display: 'flex', gap: '12px'}}>
                        <button
                          onClick={() => handleRejectRequest(request.id, request.childKey)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            border: '2px solid #fecaca',
                            borderRadius: '12px',
                            background: '#fef2f2',
                            color: '#dc2626',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          ❌ Rejeitar
                        </button>
                        <button
                          onClick={() => handleApproveRequest(request.id, request.childKey)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          ✅ {kidsData[request.childKey].balance >= request.price ? 'Aprovar' : 'Aprovar (Ajuda)'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {parentTab === 'limites' && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h3 style={{margin: '0', fontSize: '20px', color: '#2d3748'}}>
                  🎯 Gestão de Limites por Categoria
                </h3>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{fontSize: '12px', color: '#64748b', textAlign: 'right'}}>
                    Trimestre atual: {getQuarterLabel(getCurrentQuarter())}
                  </div>
                  <button
                    onClick={resetQuarterlyLimits}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid #f97316',
                      borderRadius: '8px',
                      background: '#fff7ed',
                      color: '#f97316',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Reiniciar Trimestre
                  </button>
                </div>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {Object.entries(categoryLimits).map(([category, limits]) => (
                  <div key={category} style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px'
                  }}>
                    <h4 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748'}}>
                      {category}
                    </h4>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                      <div>
                        <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                          Limite Mensal
                        </label>
                        <div style={{position: 'relative'}}>
                          <span style={{position: 'absolute', left: '12px', top: '12px', color: '#718096'}}>R$</span>
                          <input
                            type="number"
                            value={limits.monthly}
                            onChange={(e) => setCategoryLimits(prev => ({
                              ...prev,
                              [category]: { ...prev[category], monthly: parseFloat(e.target.value) || 0 }
                            }))}
                            style={{
                              width: '100%',
                              padding: '12px',
                              paddingLeft: '36px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '16px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                          Limite Trimestral
                        </label>
                        <div style={{position: 'relative'}}>
                          <span style={{position: 'absolute', left: '12px', top: '12px', color: '#718096'}}>R$</span>
                          <input
                            type="number"
                            value={limits.quarterly}
                            onChange={(e) => setCategoryLimits(prev => ({
                              ...prev,
                              [category]: { ...prev[category], quarterly: parseFloat(e.target.value) || 0 }
                            }))}
                            style={{
                              width: '100%',
                              padding: '12px',
                              paddingLeft: '36px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '16px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parentTab === 'categorias' && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{margin: '0 0 20px 0', fontSize: '20px', color: '#2d3748'}}>
                🏷️ Gestão de Categorias
              </h3>
              
              {/* Add Category Button */}
              <button
                onClick={() => setShowCategoryForm(!showCategoryForm)}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px dashed #4299e1',
                  borderRadius: '16px',
                  background: 'rgba(66, 153, 225, 0.1)',
                  color: '#4299e1',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                + {showCategoryForm ? 'Fechar Formulário' : 'Nova Categoria'}
              </button>

              {/* Category Form */}
              {showCategoryForm && (
                <div style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '20px',
                  background: '#f8fafc'
                }}>
                  <h4 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748'}}>
                    Criar Nova Categoria
                  </h4>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <div>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                        Nome da Categoria
                      </label>
                      <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({...prev, name: e.target.value}))}
                        placeholder="Ex: Eletrônicos, Esportes..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                      <div>
                        <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                          Limite Mensal
                        </label>
                        <div style={{position: 'relative'}}>
                          <span style={{position: 'absolute', left: '12px', top: '12px', color: '#718096'}}>R$</span>
                          <input
                            type="number"
                            value={newCategory.monthlyLimit}
                            onChange={(e) => setNewCategory(prev => ({...prev, monthlyLimit: e.target.value}))}
                            placeholder="100.00"
                            style={{
                              width: '100%',
                              padding: '12px',
                              paddingLeft: '36px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '16px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                          Limite Trimestral
                        </label>
                        <div style={{position: 'relative'}}>
                          <span style={{position: 'absolute', left: '12px', top: '12px', color: '#718096'}}>R$</span>
                          <input
                            type="number"
                            value={newCategory.quarterlyLimit}
                            onChange={(e) => setNewCategory(prev => ({...prev, quarterlyLimit: e.target.value}))}
                            placeholder="300.00"
                            style={{
                              width: '100%',
                              padding: '12px',
                              paddingLeft: '36px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              fontSize: '16px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{display: 'flex', gap: '12px'}}>
                      <button
                        onClick={() => {
                          setShowCategoryForm(false)
                          setNewCategory({ name: '', monthlyLimit: '', quarterlyLimit: '' })
                        }}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          background: 'white',
                          color: '#4a5568',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          if (newCategory.name && newCategory.monthlyLimit && newCategory.quarterlyLimit) {
                            const categoryName = newCategory.name.trim()
                            if (!categories.includes(categoryName)) {
                              setCategories(prev => [...prev, categoryName])
                              setCategoryLimits(prev => ({
                                ...prev,
                                [categoryName]: {
                                  monthly: parseFloat(newCategory.monthlyLimit),
                                  quarterly: parseFloat(newCategory.quarterlyLimit)
                                }
                              }))
                              
                              // Initialize category spending for all children
                              setKidsData(prev => {
                                const updated = {}
                                Object.entries(prev).forEach(([key, child]) => {
                                  updated[key] = {
                                    ...child,
                                    categorySpending: {
                                      ...child.categorySpending,
                                      [categoryName]: 0
                                    }
                                  }
                                })
                                return updated
                              })
                              
                              alert(`✅ Categoria "${categoryName}" criada com sucesso!`)
                              setShowCategoryForm(false)
                              setNewCategory({ name: '', monthlyLimit: '', quarterlyLimit: '' })
                            } else {
                              alert('⚠️ Esta categoria já existe!')
                            }
                          } else {
                            alert('⚠️ Preencha todos os campos!')
                          }
                        }}
                        disabled={!newCategory.name || !newCategory.monthlyLimit || !newCategory.quarterlyLimit}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: 'none',
                          borderRadius: '12px',
                          background: newCategory.name && newCategory.monthlyLimit && newCategory.quarterlyLimit ? 'linear-gradient(135deg, #4299e1 0%, #667eea 100%)' : '#e2e8f0',
                          color: newCategory.name && newCategory.monthlyLimit && newCategory.quarterlyLimit ? 'white' : '#a0aec0',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: newCategory.name && newCategory.monthlyLimit && newCategory.quarterlyLimit ? 'pointer' : 'not-allowed'
                        }}
                      >
                        🏷️ Criar Categoria
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Categories List */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {categories.map(category => (
                  <div key={category} style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                      <h4 style={{margin: 0, fontSize: '18px', color: '#2d3748'}}>
                        {category}
                      </h4>
                      <button
                        onClick={() => {
                          if (window.confirm(`Tem certeza que deseja excluir a categoria "${category}"?\n\nIsto irá remover todos os dados relacionados a esta categoria.`)) {
                            // Remove category from categories array
                            setCategories(prev => prev.filter(cat => cat !== category))
                            
                            // Remove category limits
                            setCategoryLimits(prev => {
                              const updated = {...prev}
                              delete updated[category]
                              return updated
                            })
                            
                            // Remove category spending from all children
                            setKidsData(prev => {
                              const updated = {}
                              Object.entries(prev).forEach(([key, child]) => {
                                const newSpending = {...child.categorySpending}
                                delete newSpending[category]
                                updated[key] = {
                                  ...child,
                                  categorySpending: newSpending
                                }
                              })
                              return updated
                            })
                            
                            alert(`✅ Categoria "${category}" excluída com sucesso!`)
                          }
                        }}
                        style={{
                          padding: '8px 16px',
                          border: '2px solid #fecaca',
                          borderRadius: '8px',
                          background: '#fef2f2',
                          color: '#dc2626',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                      <div style={{
                        background: '#f0f9ff',
                        padding: '12px',
                        borderRadius: '12px',
                        textAlign: 'center'
                      }}>
                        <div style={{fontSize: '12px', color: '#0369a1', marginBottom: '4px'}}>Limite Mensal</div>
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0369a1'}}>
                          R$ {categoryLimits[category]?.monthly?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                      <div style={{
                        background: '#f0fdf4',
                        padding: '12px',
                        borderRadius: '12px',
                        textAlign: 'center'
                      }}>
                        <div style={{fontSize: '12px', color: '#166534', marginBottom: '4px'}}>Limite Trimestral</div>
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#166534'}}>
                          R$ {categoryLimits[category]?.quarterly?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parentTab === 'criancas' && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h3 style={{margin: '0', fontSize: '20px', color: '#2d3748'}}>
                  👶 Gestão de Crianças
                </h3>
                
                <button
                  onClick={() => setShowAddChildForm(true)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  👶 Adicionar Criança
                </button>
              </div>

              {/* Add Child Form */}
              {showAddChildForm && (
                <div style={{
                  background: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{margin: '0 0 16px 0', color: '#2d3748'}}>👶 Nova Criança</h4>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <div>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                        Nome da Criança
                      </label>
                      <input
                        type="text"
                        value={newChild.name}
                        onChange={(e) => setNewChild(prev => ({...prev, name: e.target.value}))}
                        placeholder="Ex: Maria, João..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                        PIN (4 dígitos)
                      </label>
                      <input
                        type="text"
                        value={newChild.pin}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4)
                          setNewChild(prev => ({...prev, pin: value}))
                        }}
                        placeholder="1234"
                        maxLength="4"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '16px',
                          boxSizing: 'border-box',
                          textAlign: 'center',
                          letterSpacing: '0.2em'
                        }}
                      />
                      <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>
                        PIN deve ser único para cada criança
                      </div>
                    </div>
                    
                    <div style={{display: 'flex', gap: '12px'}}>
                      <button
                        onClick={() => {
                          setShowAddChildForm(false)
                          setNewChild({ name: '', pin: '' })
                        }}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          background: 'white',
                          color: '#4a5568',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={addChild}
                        disabled={!newChild.name.trim() || newChild.pin.length !== 4}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: 'none',
                          borderRadius: '8px',
                          background: newChild.name.trim() && newChild.pin.length === 4 
                            ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' 
                            : '#e2e8f0',
                          color: newChild.name.trim() && newChild.pin.length === 4 ? 'white' : '#a0aec0',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: newChild.name.trim() && newChild.pin.length === 4 ? 'pointer' : 'not-allowed'
                        }}
                      >
                        👶 Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Children List */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {Object.entries(kidsData).map(([childKey, child]) => (
                  <div key={childKey} style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                      <div>
                        <h4 style={{margin: '0 0 4px 0', fontSize: '18px', color: '#2d3748'}}>
                          {child.name}
                        </h4>
                        <div style={{fontSize: '12px', color: '#64748b'}}>
                          PIN: {child.pin} • Nível {child.level} • {child.points} pontos
                        </div>
                      </div>
                      
                      <div style={{display: 'flex', gap: '8px'}}>
                        <button
                          onClick={() => {
                            setEditingChild({ name: child.name, pin: child.pin })
                            setShowEditChildForm(childKey)
                          }}
                          style={{
                            padding: '8px 12px',
                            border: '2px solid #3b82f6',
                            borderRadius: '8px',
                            background: '#eff6ff',
                            color: '#3b82f6',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => removeChild(childKey, child.name)}
                          style={{
                            padding: '8px 12px',
                            border: '2px solid #dc2626',
                            borderRadius: '8px',
                            background: '#fef2f2',
                            color: '#dc2626',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️ Remover
                        </button>
                      </div>
                    </div>

                    {/* Edit Form */}
                    {showEditChildForm === childKey && (
                      <div style={{
                        background: '#f8fafc',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px',
                        marginTop: '16px'
                      }}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '12px', color: '#4a5568'}}>
                              Nome
                            </label>
                            <input
                              type="text"
                              value={editingChild.name}
                              onChange={(e) => setEditingChild(prev => ({...prev, name: e.target.value}))}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                          
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '12px', color: '#4a5568'}}>
                              PIN (4 dígitos)
                            </label>
                            <input
                              type="text"
                              value={editingChild.pin}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4)
                                setEditingChild(prev => ({...prev, pin: value}))
                              }}
                              maxLength="4"
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                textAlign: 'center',
                                letterSpacing: '0.1em'
                              }}
                            />
                          </div>
                          
                          <div style={{display: 'flex', gap: '8px'}}>
                            <button
                              onClick={() => {
                                setShowEditChildForm(null)
                                setEditingChild({ name: '', pin: '' })
                              }}
                              style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                background: 'white',
                                color: '#4a5568',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => updateChildPin(childKey)}
                              disabled={!editingChild.name.trim() || editingChild.pin.length !== 4}
                              style={{
                                flex: 1,
                                padding: '8px',
                                border: 'none',
                                borderRadius: '4px',
                                background: editingChild.name.trim() && editingChild.pin.length === 4 
                                  ? '#3b82f6' : '#e2e8f0',
                                color: editingChild.name.trim() && editingChild.pin.length === 4 ? 'white' : '#a0aec0',
                                fontSize: '12px',
                                cursor: editingChild.name.trim() && editingChild.pin.length === 4 ? 'pointer' : 'not-allowed'
                              }}
                            >
                              Salvar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Child Stats */}
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
                      <div style={{
                        background: '#f0fdf4',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#166534'}}>
                          R$ {child.balance.toFixed(2)}
                        </div>
                        <div style={{fontSize: '10px', color: '#166534'}}>Saldo</div>
                      </div>
                      
                      <div style={{
                        background: '#fef3c7',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#d97706'}}>
                          {child.goals?.length || 0}
                        </div>
                        <div style={{fontSize: '10px', color: '#d97706'}}>Sonhos</div>
                      </div>
                      
                      <div style={{
                        background: '#f0f9ff',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0369a1'}}>
                          {child.requests?.filter(r => r.status === 'pending').length || 0}
                        </div>
                        <div style={{fontSize: '10px', color: '#0369a1'}}>Pedidos</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {Object.keys(kidsData).length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#64748b'
                  }}>
                    <div style={{fontSize: '48px', marginBottom: '16px'}}>👶</div>
                    <p style={{margin: 0, fontSize: '16px'}}>Nenhuma criança cadastrada ainda</p>
                    <p style={{margin: '8px 0 0 0', fontSize: '14px'}}>Clique em "Adicionar Criança" para começar</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {parentTab === 'configuracoes' && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{margin: '0 0 20px 0', fontSize: '20px', color: '#2d3748'}}>
                ⚙️ Configurações do Sistema
              </h3>
              
              {/* Savings Configuration */}
              <div style={{
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h4 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748'}}>
                  🏛️ Configurações da Poupança
                </h4>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                      Taxa de Juros Mensal (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={(savingsSettings.monthlyInterestRate * 100).toFixed(1)}
                      onChange={(e) => setSavingsSettings(prev => ({
                        ...prev,
                        monthlyInterestRate: parseFloat(e.target.value) / 100 || 0
                      }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                      Atual: {(savingsSettings.monthlyInterestRate * 100).toFixed(1)}% ao mês
                    </div>
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#4a5568'}}>
                      Saldo Mínimo para Render
                    </label>
                    <div style={{position: 'relative'}}>
                      <span style={{position: 'absolute', left: '12px', top: '12px', color: '#718096'}}>R$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={savingsSettings.minimumBalance}
                        onChange={(e) => setSavingsSettings(prev => ({
                          ...prev,
                          minimumBalance: parseFloat(e.target.value) || 0
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          paddingLeft: '36px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Rate Examples */}
                <div style={{
                  background: '#f0f9ff',
                  padding: '16px',
                  borderRadius: '12px',
                  marginTop: '16px'
                }}>
                  <h5 style={{margin: '0 0 12px 0', fontSize: '14px', color: '#0369a1'}}>
                    📊 Simulação de Rendimento:
                  </h5>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
                    {[100, 250, 500].map(amount => {
                      const monthlyReturn = amount * savingsSettings.monthlyInterestRate
                      const yearlyReturn = monthlyReturn * 12
                      
                      return (
                        <div key={amount} style={{
                          background: 'white',
                          padding: '12px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <div style={{fontSize: '12px', color: '#0369a1', marginBottom: '4px'}}>
                            R$ {amount.toFixed(2)}
                          </div>
                          <div style={{fontSize: '14px', fontWeight: 'bold', color: '#0369a1'}}>
                            +R$ {monthlyReturn.toFixed(2)}/mês
                          </div>
                          <div style={{fontSize: '10px', color: '#64748b'}}>
                            R$ {yearlyReturn.toFixed(2)}/ano
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div style={{
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h4 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748'}}>
                  🎯 Configurações Rápidas
                </h4>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
                  {[
                    { name: 'Conservador', monthly: 0.015, min: 50, desc: '1.5%/mês' },
                    { name: 'Moderado', monthly: 0.03, min: 10, desc: '3%/mês' },
                    { name: 'Agressivo', monthly: 0.06, min: 5, desc: '6%/mês' }
                  ].map(preset => (
                    <button
                      key={preset.name}
                      onClick={() => setSavingsSettings(prev => ({
                        ...prev,
                        monthlyInterestRate: preset.monthly,
                        minimumBalance: preset.min
                      }))}
                      style={{
                        padding: '16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        background: 'white',
                        color: '#2d3748',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{marginBottom: '4px'}}>{preset.name}</div>
                      <div style={{fontSize: '12px', color: '#718096'}}>{preset.desc}</div>
                      <div style={{fontSize: '10px', color: '#64748b', marginTop: '4px'}}>
                        Min: R$ {preset.min.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {parentTab === 'relatorios' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {/* Period Selector */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#2d3748'}}>
                  📈 Relatórios e Análises Consolidadas
                </h3>
                
                <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
                  {[
                    {key: 'month', label: '📅 Este Mês'},
                    {key: 'quarter', label: '📊 Trimestre'},
                    {key: 'year', label: '🗓️ Ano'}
                  ].map(period => (
                    <button
                      key={period.key}
                      onClick={() => setSelectedPeriod(period.key)}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: 'none',
                        borderRadius: '12px',
                        background: selectedPeriod === period.key ? '#4299e1' : '#f7fafc',
                        color: selectedPeriod === period.key ? 'white' : '#4a5568',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>

                {(() => {
                  const consolidatedData = getConsolidatedData()
                  const currentPeriod = consolidatedData[selectedPeriod]
                  const totalFamilySpending = Object.values(currentPeriod.data)
                    .reduce((total, childData) => {
                      return total + Object.values(childData).reduce((sum, amount) => sum + amount, 0)
                    }, 0)

                  return (
                    <div>
                      <div style={{
                        background: '#f0f9ff',
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        textAlign: 'center'
                      }}>
                        <div style={{fontSize: '14px', color: '#0369a1', marginBottom: '4px'}}>
                          Gasto Total da Família - {currentPeriod.label}
                        </div>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#0369a1'}}>
                          R$ {totalFamilySpending.toFixed(2)}
                        </div>
                      </div>

                      {Object.entries(kidsData).map(([childKey, child]) => {
                        const spending = currentPeriod.data[childKey] || {}
                        const totalChildSpending = Object.values(spending).reduce((sum, amount) => sum + amount, 0)
                        
                        return (
                          <div key={childKey} style={{
                            border: '2px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '16px'
                          }}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                              <h4 style={{margin: '0', fontSize: '18px', color: '#2d3748'}}>
                                📊 {child.name} - {currentPeriod.label}
                              </h4>
                              <div style={{textAlign: 'right'}}>
                                <div style={{fontSize: '14px', color: '#718096'}}>Total gasto:</div>
                                <div style={{fontSize: '20px', fontWeight: 'bold', color: totalChildSpending > child.balance ? '#ef4444' : '#2d3748'}}>
                                  R$ {totalChildSpending.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            
                            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                              {Object.entries(spending).map(([category, amount]) => {
                                const limit = selectedPeriod === 'month' ? categoryLimits[category]?.monthly : 
                                           selectedPeriod === 'quarter' ? categoryLimits[category]?.quarterly :
                                           (categoryLimits[category]?.quarterly || 0) * 4
                                const percentage = limit > 0 ? (amount / limit) * 100 : 0
                                const isOverLimit = amount > limit
                                const categoryPercentageOfTotal = totalChildSpending > 0 ? (amount / totalChildSpending) * 100 : 0
                                
                                return (
                                  <div key={category} style={{
                                    padding: '16px',
                                    background: isOverLimit ? '#fef2f2' : '#f7fafc',
                                    borderRadius: '12px',
                                    borderLeft: `4px solid ${isOverLimit ? '#ef4444' : '#4299e1'}`
                                  }}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                                      <span style={{fontWeight: '500', color: '#2d3748'}}>{category}</span>
                                      <div style={{textAlign: 'right'}}>
                                        <div style={{
                                          fontSize: '18px',
                                          fontWeight: 'bold',
                                          color: isOverLimit ? '#ef4444' : '#2d3748'
                                        }}>
                                          R$ {amount.toFixed(2)} / R$ {(limit || 0).toFixed(2)}
                                        </div>
                                        <div style={{fontSize: '12px', color: '#718096'}}>
                                          {percentage.toFixed(1)}% do limite • {categoryPercentageOfTotal.toFixed(1)}% do total
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div style={{
                                      width: '100%',
                                      height: '8px',
                                      background: '#e2e8f0',
                                      borderRadius: '4px',
                                      overflow: 'hidden'
                                    }}>
                                      <div style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                        height: '100%',
                                        background: isOverLimit ? '#ef4444' : 
                                          percentage > 80 ? '#f6ad55' : '#4299e1',
                                        transition: 'width 0.3s ease'
                                      }} />
                                    </div>
                                    
                                    {isOverLimit && (
                                      <div style={{
                                        marginTop: '8px',
                                        fontSize: '12px',
                                        color: '#dc2626',
                                        fontWeight: '500'
                                      }}>
                                        ⚠️ Limite ultrapassado em R$ {(amount - limit).toFixed(2)}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Kids Dashboard
  if (currentUser) {
    const childData = kidsData[currentUser]
    
    // Sonhos Tab
    if (currentTab === 'sonhos') {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            
            {/* Navigation Header */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-around', gap: '4px', overflow: 'hidden'}}>
                {[
                  {key: 'inicio', label: '🏠 Início'},
                  {key: 'sonhos', label: '🎯 Sonhos'},
                  {key: 'gastos', label: '📊 Gastos'},
                  {key: 'regras', label: '🏆 Regras'}
                ].map(tab => (
                  <button key={tab.key} 
                    onClick={() => setCurrentTab(tab.key)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: 'none',
                      borderRadius: '16px',
                      background: currentTab === tab.key ? '#4299e1' : 'transparent',
                      color: currentTab === tab.key ? 'white' : '#4a5568',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '32px', marginBottom: '10px'}}>🎯</div>
              <h2 style={{margin: '0 0 10px 0', fontSize: '32px', color: '#2d3748'}}>Meus Sonhos - {childData.name}</h2>
              <p style={{margin: 0, color: '#718096'}}>Economize para realizar seus sonhos! ⭐</p>
            </div>

            {/* Add New Dream Button */}
            <button 
              onClick={() => setShowGoalForm(!showGoalForm)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px dashed rgba(255,255,255,0.4)',
                borderRadius: '20px',
                padding: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}>
              + {showGoalForm ? 'Fechar' : 'Novo Sonho'}
            </button>

            {/* Goal Form */}
            {showGoalForm && (
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{margin: '0 0 20px 0', fontSize: '18px', color: '#2d3748', textAlign: 'center'}}>
                  🎯 Novo Sonho
                </h3>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {/* Goal Name */}
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                      Qual é o seu sonho?
                    </label>
                    <input
                      type="text"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal(prev => ({...prev, name: e.target.value}))}
                      placeholder="Ex: PlayStation 5, Bicicleta..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Goal Target */}
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                      Quanto custa?
                    </label>
                    <div style={{position: 'relative'}}>
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '12px',
                        color: '#718096',
                        fontSize: '16px'
                      }}>R$</span>
                      <input
                        type="number"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal(prev => ({...prev, target: e.target.value}))}
                        placeholder="500.00"
                        step="0.01"
                        style={{
                          width: '100%',
                          padding: '12px',
                          paddingLeft: '40px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Emoji Selector */}
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                      Escolha um emoji:
                    </label>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px'}}>
                      {['🎮', '🚲', '📱', '🧸', '👕', '📚', '🎯', '⚽', '🎸', '🏀'].map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setNewGoal(prev => ({...prev, emoji}))}
                          style={{
                            padding: '12px',
                            border: '2px solid ' + (newGoal.emoji === emoji ? '#4299e1' : '#e2e8f0'),
                            borderRadius: '12px',
                            background: newGoal.emoji === emoji ? '#dbeafe' : 'white',
                            fontSize: '24px',
                            cursor: 'pointer'
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{display: 'flex', gap: '12px', marginTop: '8px'}}>
                    <button
                      onClick={() => {
                        setShowGoalForm(false)
                        setNewGoal({ name: '', target: '', emoji: '🎯' })
                      }}
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        background: 'white',
                        color: '#4a5568',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (newGoal.name && newGoal.target) {
                          const newGoalObj = {
                            id: Date.now(),
                            name: newGoal.name,
                            target: parseFloat(newGoal.target),
                            current: 0,
                            emoji: newGoal.emoji,
                            deadline: '31/12/2024' // Default deadline
                          }
                          
                          // Add to child's goals
                          setKidsData(prev => ({
                            ...prev,
                            [currentUser]: {
                              ...prev[currentUser],
                              goals: [...prev[currentUser].goals, newGoalObj]
                            }
                          }))
                          
                          alert(`✅ Sonho criado!\n\n🎯 ${newGoal.name}\n💰 Meta: R$ ${parseFloat(newGoal.target).toFixed(2)}\n${newGoal.emoji}\n\n🌟 Comece a economizar!`)
                          setShowGoalForm(false)
                          setNewGoal({ name: '', target: '', emoji: '🎯' })
                        } else {
                          alert('⚠️ Preencha o nome do sonho e o valor!')
                        }
                      }}
                      disabled={!newGoal.name || !newGoal.target}
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: 'none',
                        borderRadius: '12px',
                        background: newGoal.name && newGoal.target ? 'linear-gradient(135deg, #4299e1 0%, #667eea 100%)' : '#e2e8f0',
                        color: newGoal.name && newGoal.target ? 'white' : '#a0aec0',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: newGoal.name && newGoal.target ? 'pointer' : 'not-allowed'
                      }}
                    >
                      🎯 Criar Sonho
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Dreams List */}
            {childData.goals.map(goal => {
              const progress = Math.round((goal.current / goal.target) * 100)
              const remaining = goal.target - goal.current
              
              return (
                <div key={goal.id} style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{margin: '0 0 20px 0', fontSize: '24px', color: '#2d3748', textAlign: 'center'}}>
                    {goal.name}
                  </h3>
                  
                  <div style={{textAlign: 'right', marginBottom: '10px'}}>
                    <span style={{fontSize: '32px', fontWeight: 'bold', color: '#4299e1'}}>
                      R$ {goal.target.toFixed(2)}
                    </span>
                  </div>
                  
                  <div style={{marginBottom: '10px'}}>
                    <span style={{color: '#4a5568'}}>Progresso: R$ {goal.current.toFixed(2)}</span>
                    <span style={{float: 'right', color: '#4a5568'}}>{progress}% completo</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '12px',
                    background: '#e2e8f0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: `${progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #4299e1 0%, #667eea 100%)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <div style={{color: '#4299e1', fontWeight: '600'}}>Ainda preciso</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#4299e1'}}>R$ {remaining.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{color: '#48bb78', fontWeight: '600'}}>Prazo</div>
                      <div style={{fontSize: '16px', fontWeight: 'bold', color: '#48bb78'}}>{goal.deadline}</div>
                    </div>
                  </div>
                  
                  {/* Goal Funding Section */}
                  <div style={{
                    background: '#f0f4f8',
                    borderRadius: '12px',
                    padding: '16px',
                    marginTop: '20px'
                  }}>
                    {showGoalFundForm === goal.id ? (
                      <div>
                        <div style={{textAlign: 'center', marginBottom: '12px'}}>
                          <span style={{fontSize: '16px', color: '#4a5568', fontWeight: '600'}}>💰 Investir no Sonho</span>
                        </div>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                          <span style={{fontSize: '18px'}}>R$</span>
                          <input
                            type="number"
                            value={goalFundAmount}
                            onChange={(e) => setGoalFundAmount(e.target.value)}
                            placeholder="0.00"
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              border: '2px solid #e2e8f0',
                              borderRadius: '8px',
                              fontSize: '16px',
                              textAlign: 'center'
                            }}
                            min="0.01"
                            step="0.01"
                            max={childData.balance}
                          />
                          <button
                            onClick={() => handleFundGoal(goal.id, goalFundAmount, currentUser)}
                            disabled={!goalFundAmount || parseFloat(goalFundAmount) <= 0 || parseFloat(goalFundAmount) > childData.balance}
                            style={{
                              padding: '8px 16px',
                              border: 'none',
                              borderRadius: '8px',
                              background: (!goalFundAmount || parseFloat(goalFundAmount) <= 0 || parseFloat(goalFundAmount) > childData.balance) 
                                ? '#e2e8f0' : 'linear-gradient(135deg, #4299e1 0%, #667eea 100%)',
                              color: (!goalFundAmount || parseFloat(goalFundAmount) <= 0 || parseFloat(goalFundAmount) > childData.balance) 
                                ? '#a0aec0' : 'white',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: (!goalFundAmount || parseFloat(goalFundAmount) <= 0 || parseFloat(goalFundAmount) > childData.balance) 
                                ? 'not-allowed' : 'pointer'
                            }}
                          >
                            💸 Investir
                          </button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '8px'}}>
                          <button
                            onClick={() => {
                              setShowGoalFundForm(null)
                              setGoalFundAmount('')
                            }}
                            style={{
                              padding: '6px 12px',
                              border: 'none',
                              background: 'transparent',
                              color: '#64748b',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                        <div style={{fontSize: '10px', color: '#64748b', textAlign: 'center', marginTop: '4px'}}>
                          Seu saldo: R$ {childData.balance.toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '14px', color: '#4a5568', marginBottom: '8px'}}>
                          {progress >= 100 ? '🎉 Sonho realizado!' : '💡 Quer investir mais?'}
                        </div>
                        {progress < 100 && (
                          <button
                            onClick={() => setShowGoalFundForm(goal.id)}
                            style={{
                              padding: '8px 16px',
                              border: '2px dashed #4299e1',
                              borderRadius: '8px',
                              background: 'transparent',
                              color: '#4299e1',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            💰 Colocar Dinheiro
                          </button>
                        )}
                        {progress >= 100 && (
                          <span style={{fontSize: '14px', color: '#4a5568'}}>Continue economizando! 💪</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    
    // Gastos Tab  
    if (currentTab === 'gastos') {
      
      // Calculate spending by period
      const getSpendingByPeriod = (period) => {
        const transactions = childData.transactions || []
        const debitTransactions = transactions.filter(t => t.type === 'debit')
        
        // For demo, we'll use all transactions. In real app, you'd filter by actual dates
        const multiplier = period === 'month' ? 1 : period === 'quarter' ? 3 : 12
        
        const spendingByCategory = {}
        let totalSpending = 0
        
        categories.forEach(category => {
          const categorySpending = debitTransactions
            .filter(t => t.category === category)
            .reduce((sum, t) => sum + t.amount, 0) * multiplier * (0.8 + Math.random() * 0.4)
          
          spendingByCategory[category] = categorySpending
          totalSpending += categorySpending
        })
        
        return { spendingByCategory, totalSpending }
      }
      
      const { spendingByCategory, totalSpending } = getSpendingByPeriod(gastosSelectedPeriod)
      const periodLabels = {
        month: 'Este Mês',
        quarter: 'Este Trimestre',
        year: 'Este Ano'
      }

      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            
            {/* Navigation Header */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-around', gap: '4px', overflow: 'hidden'}}>
                {[
                  {key: 'inicio', label: '🏠 Início'},
                  {key: 'sonhos', label: '🎯 Sonhos'},
                  {key: 'gastos', label: '📊 Gastos'},
                  {key: 'regras', label: '🏆 Regras'}
                ].map(tab => (
                  <button key={tab.key} 
                    onClick={() => setCurrentTab(tab.key)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: 'none',
                      borderRadius: '16px',
                      background: currentTab === tab.key ? '#4299e1' : 'transparent',
                      color: currentTab === tab.key ? 'white' : '#4a5568',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '32px', marginBottom: '10px'}}>📊</div>
              <h2 style={{margin: '0 0 10px 0', fontSize: '32px', color: '#2d3748'}}>Meus Gastos</h2>
              <p style={{margin: 0, color: '#718096'}}>Acompanhe suas transações! 💳</p>
            </div>

            {/* Period Selector */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748', textAlign: 'center'}}>
                📅 Selecionar Período
              </h3>
              
              <div style={{display: 'flex', gap: '8px'}}>
                {[
                  {key: 'month', label: 'Mês'},
                  {key: 'quarter', label: 'Trimestre'},
                  {key: 'year', label: 'Ano'}
                ].map(period => (
                  <button
                    key={period.key}
                    onClick={() => setGastosSelectedPeriod(period.key)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: 'none',
                      borderRadius: '12px',
                      background: gastosSelectedPeriod === period.key ? '#4299e1' : '#f7fafc',
                      color: gastosSelectedPeriod === period.key ? 'white' : '#4a5568',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {period.label}
                  </button>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                padding: '16px',
                background: '#f0f9ff',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '14px', color: '#0369a1', marginBottom: '4px'}}>
                  Total Gasto - {periodLabels[gastosSelectedPeriod]}
                </div>
                <div style={{fontSize: '28px', fontWeight: 'bold', color: '#0369a1'}}>
                  R$ {totalSpending.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Spending by Category */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748'}}>
                🏷️ Gastos por Categoria - {periodLabels[gastosSelectedPeriod]}
              </h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {Object.entries(spendingByCategory).map(([category, amount]) => {
                  const limit = gastosSelectedPeriod === 'month' ? categoryLimits[category]?.monthly : 
                             gastosSelectedPeriod === 'quarter' ? categoryLimits[category]?.quarterly :
                             (categoryLimits[category]?.quarterly || 0) * 4
                  const percentage = limit > 0 ? (amount / limit) * 100 : 0
                  const isOverLimit = amount > limit
                  const categoryPercentage = totalSpending > 0 ? (amount / totalSpending) * 100 : 0
                  
                  return (
                    <div key={category} style={{
                      padding: '16px',
                      background: isOverLimit ? '#fef2f2' : '#f7fafc',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${isOverLimit ? '#ef4444' : '#4299e1'}`
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                        <span style={{fontWeight: '500', color: '#2d3748'}}>{category}</span>
                        <div style={{textAlign: 'right'}}>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: isOverLimit ? '#ef4444' : '#2d3748'
                          }}>
                            R$ {amount.toFixed(2)}
                          </div>
                          <div style={{fontSize: '12px', color: '#718096'}}>
                            {categoryPercentage.toFixed(1)}% do total gasto
                          </div>
                        </div>
                      </div>
                      
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: `${Math.min(percentage, 100)}%`,
                          height: '100%',
                          background: isOverLimit ? '#ef4444' : '#4299e1',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      
                      <div style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: '12px',
                        color: '#718096'
                      }}>
                        <span>Limite: R$ {(limit || 0).toFixed(2)}</span>
                        <span>{percentage.toFixed(1)}% do limite</span>
                      </div>
                      
                      {isOverLimit && (
                        <div style={{
                          marginTop: '8px',
                          fontSize: '12px',
                          color: '#dc2626',
                          fontWeight: '500'
                        }}>
                          ⚠️ Limite ultrapassado em R$ {(amount - limit).toFixed(2)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Transaction History */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#2d3748'}}>📋 Histórico de Transações</h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto'}}>
                {childData.transactions?.map(transaction => (
                  <div key={transaction.id} style={{
                    padding: '16px',
                    background: transaction.type === 'credit' ? '#f0fff4' : '#fef5e7',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${transaction.type === 'credit' ? '#48bb78' : '#f6ad55'}`
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: '600', color: '#2d3748', fontSize: '14px', marginBottom: '4px'}}>
                          {transaction.description}
                        </div>
                        <div style={{fontSize: '12px', color: '#718096'}}>
                          {transaction.date} {transaction.category && `• ${transaction.category}`}
                        </div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: transaction.type === 'credit' ? '#48bb78' : '#f6ad55'
                        }}>
                          {transaction.type === 'credit' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                        </div>
                        <div style={{fontSize: '11px', color: '#718096'}}>
                          Saldo: R$ {transaction.balance.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div style={{textAlign: 'center', padding: '20px', color: '#718096'}}>
                    <div style={{fontSize: '24px', marginBottom: '8px'}}>📝</div>
                    <p style={{margin: 0}}>Nenhuma transação ainda</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          
          {/* Navigation Header */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-around', gap: '4px', overflow: 'hidden'}}>
              {[
                {key: 'inicio', label: '🏠 Início'},
                {key: 'sonhos', label: '🎯 Sonhos'},
                {key: 'gastos', label: '📊 Gastos'},
                {key: 'regras', label: '🏆 Regras'}
              ].map(tab => (
                <button key={tab.key} 
                  onClick={() => setCurrentTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '16px',
                    background: currentTab === tab.key ? '#4299e1' : 'transparent',
                    color: currentTab === tab.key ? 'white' : '#4a5568',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{margin: '0 0 16px 0', fontSize: '28px', color: '#2d3748'}}>
              👋 Olá, {childData.name}!
            </h2>
            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '20px'}}>⭐</span>
                <span style={{color: '#4a5568', fontWeight: '500'}}>Nível {childData.level}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '20px'}}>🏆</span>
                <span style={{color: '#4a5568', fontWeight: '500'}}>{childData.points} pts</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '20px'}}>🔥</span>
                <span style={{color: '#4a5568', fontWeight: '500'}}>{childData.streak?.current || 0} dias</span>
              </div>
            </div>

            {/* Streak Info - More compact */}
            <div style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              padding: '8px 16px',
              borderRadius: '20px',
              color: 'white',
              fontSize: '12px',
              display: 'inline-block'
            }}>
              🔥 {childData.streak?.current || 0} dias poupando!
            </div>
          </div>

          {/* Daily Challenge */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            borderRadius: '20px',
            padding: '20px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{fontSize: '24px', marginBottom: '8px'}}>🎯</div>
            <h3 style={{margin: '0 0 8px 0', fontSize: '18px'}}>Desafio do Dia</h3>
            <p style={{margin: '0 0 12px 0', fontSize: '14px', opacity: 0.9}}>
              {childData.balance >= 50 
                ? "Tente não gastar nada hoje e ganhe +5 pontos!" 
                : "Junte mais R$ 10 hoje e ganhe uma conquista!"}
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '16px',
              fontSize: '12px',
              display: 'inline-block'
            }}>
              🏆 +{childData.level * 5} pontos disponíveis
            </div>
          </div>

          {/* Balance Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '40px', marginBottom: '10px'}}>
              {childData.balance >= 0 ? '💰' : '💳'}
            </div>
            <h2 style={{margin: '0 0 10px 0', fontSize: '24px', color: '#2d3748'}}>
              {childData.balance >= 0 ? 'Meu Saldo Total' : 'Preciso Devolver'}
            </h2>
            <div style={{
              fontSize: '48px', 
              fontWeight: 'bold', 
              color: childData.balance >= 0 ? '#38a169' : '#f59e0b', 
              marginBottom: '20px'
            }}>
              {childData.balance >= 0 ? 'R$' : 'R$'} {Math.abs(childData.balance).toFixed(2)}
            </div>
            
            {childData.balance < 0 && (
              <div style={{
                background: '#fefbf0',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #fbbf24',
                marginBottom: '20px'
              }}>
                <div style={{color: '#d97706', fontSize: '14px', fontWeight: '500'}}>
                  🤝 Ajuda dos Pais (sem juros)
                </div>
                <div style={{color: '#92400e', fontSize: '12px', marginTop: '4px'}}>
                  Receba sua mesada para devolver aos poucos!
                </div>
              </div>
            )}
            
            <button onClick={handleLogout} style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#f7fafc',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '18px'
            }}>
              ←
            </button>
          </div>

          {/* Category Limits Overview - Simplified for Kids */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              🎮 Quanto Posso Gastar?
            </h3>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px'}}>
              {Object.entries(categoryLimits).slice(0, 4).map(([category, limits]) => {
                const monthlySpent = childData.categorySpending?.[category] || 0
                const quarterlySpent = getQuarterlySpending(currentUser)[category] || monthlySpent
                
                const monthlyLimit = limits.monthly
                const quarterlyLimit = limits.quarterly
                const monthlyRemaining = Math.max(0, monthlyLimit - monthlySpent)
                const quarterlyRemaining = Math.max(0, quarterlyLimit - quarterlySpent)
                
                const isMonthlyLow = monthlyRemaining < monthlyLimit * 0.2
                const isQuarterlyLow = quarterlyRemaining < quarterlyLimit * 0.2
                const isLow = isMonthlyLow || isQuarterlyLow
                
                const categoryEmojis = {
                  'Jogos Online': '🎮',
                  'Alimentação': '🍫',
                  'Brinquedos': '🧸',
                  'Roupas': '👕',
                  'Livros': '📚'
                }
                
                return (
                  <div key={category} style={{
                    padding: '12px',
                    background: isLow ? '#fef3c7' : '#f0f9ff',
                    border: `2px solid ${isLow ? '#fbbf24' : '#93c5fd'}`,
                    borderRadius: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '28px', marginBottom: '6px'}}>
                      {categoryEmojis[category] || '💰'}
                    </div>
                    <div style={{fontSize: '11px', color: '#64748b', marginBottom: '6px'}}>
                      {category}
                    </div>
                    
                    {/* Monthly Spending */}
                    <div style={{marginBottom: '8px'}}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: isMonthlyLow ? '#d97706' : '#0369a1'
                      }}>
                        R$ {monthlyRemaining.toFixed(0)}
                      </div>
                      <div style={{fontSize: '8px', color: '#64748b'}}>
                        este mês
                      </div>
                      
                      {/* Monthly Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '2px',
                        marginTop: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${Math.min(100, (monthlySpent / monthlyLimit) * 100)}%`,
                          height: '100%',
                          backgroundColor: monthlySpent >= monthlyLimit ? '#ef4444' : monthlySpent >= monthlyLimit * 0.8 ? '#f59e0b' : '#10b981',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease'
                        }} />
                      </div>
                      <div style={{fontSize: '7px', color: '#64748b', marginTop: '1px'}}>
                        R$ {monthlySpent.toFixed(0)} / R$ {monthlyLimit.toFixed(0)}
                      </div>
                    </div>

                    {/* Quarterly Spending */}
                    <div style={{
                      borderTop: '1px solid #e2e8f0',
                      paddingTop: '6px',
                      fontSize: '12px'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: isQuarterlyLow ? '#d97706' : '#059669'
                      }}>
                        R$ {quarterlyRemaining.toFixed(0)}
                      </div>
                      <div style={{fontSize: '7px', color: '#64748b', marginBottom: '2px'}}>
                        trimestre ({getQuarterLabel(getCurrentQuarter())})
                      </div>
                      
                      {/* Quarterly Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '3px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '2px',
                        marginTop: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${Math.min(100, (quarterlySpent / quarterlyLimit) * 100)}%`,
                          height: '100%',
                          backgroundColor: quarterlySpent >= quarterlyLimit ? '#ef4444' : quarterlySpent >= quarterlyLimit * 0.8 ? '#f59e0b' : '#059669',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease'
                        }} />
                      </div>
                      <div style={{fontSize: '6px', color: '#64748b', marginTop: '1px'}}>
                        R$ {quarterlySpent.toFixed(0)} / R$ {quarterlyLimit.toFixed(0)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Savings Info */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              🏛️ Minha Poupança
            </h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div style={{
                background: '#f0fdf4',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #bbf7d0'
              }}>
                <div style={{fontSize: '12px', color: '#166534', marginBottom: '4px'}}>Rendimento Total</div>
                <div style={{fontSize: '20px', fontWeight: 'bold', color: '#166534'}}>
                  R$ {childData.savings?.totalEarned?.toFixed(2) || '0.00'}
                </div>
              </div>
              <div style={{
                background: '#ecfdf5',
                padding: '16px',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #a7f3d0'
              }}>
                <div style={{fontSize: '12px', color: '#047857', marginBottom: '4px'}}>Este Mês</div>
                <div style={{fontSize: '20px', fontWeight: 'bold', color: '#047857'}}>
                  R$ {childData.savings?.monthlyEarnings?.toFixed(2) || '0.00'}
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '16px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '14px', marginBottom: '8px'}}>
                🌱 Seu dinheiro cresce {(savingsSettings.monthlyInterestRate * 100).toFixed(1)}% todo mês!
              </div>
              <div style={{fontSize: '12px', opacity: 0.9, marginBottom: '8px'}}>
                Como uma plantinha: quanto mais você deixa, mais cresce! 🌳
              </div>
              <div style={{fontSize: '12px', opacity: 0.9}}>
                {childData.balance < 0
                  ? '💳 Quando você deve, o dinheiro não cresce'
                  : childData.balance >= savingsSettings.minimumBalance 
                    ? `✅ Mês que vem você terá +R$ ${(childData.balance * savingsSettings.monthlyInterestRate).toFixed(2)} de presente!` 
                    : `🌱 Precisa de pelo menos R$ ${savingsSettings.minimumBalance.toFixed(0)} para começar a crescer`}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              📋 Meu Extrato
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto'}}>
              {childData.transactions?.map(transaction => (
                <div key={transaction.id} style={{
                  padding: '16px',
                  background: transaction.type === 'interest' ? '#f0fdf4' : 
                           transaction.type === 'credit' ? '#f0fff4' : '#fef5e7',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${transaction.type === 'interest' ? '#10b981' :
                                         transaction.type === 'credit' ? '#48bb78' : '#f6ad55'}`
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: '600', color: '#2d3748', fontSize: '14px', marginBottom: '4px'}}>
                        {transaction.description}
                        {transaction.type === 'interest' && ' 🏛️'}
                      </div>
                      <div style={{fontSize: '12px', color: '#718096'}}>
                        {transaction.date} {transaction.category && `• ${transaction.category}`}
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: transaction.type === 'interest' ? '#10b981' :
                               transaction.type === 'credit' ? '#48bb78' : '#f6ad55'
                      }}>
                        {transaction.type === 'debit' ? '-' : '+'} R$ {transaction.amount.toFixed(2)}
                      </div>
                      <div style={{fontSize: '11px', color: '#718096'}}>
                        Saldo: R$ {transaction.balance.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                <div style={{textAlign: 'center', padding: '20px', color: '#718096'}}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>📝</div>
                  <p style={{margin: 0}}>Nenhuma transação ainda</p>
                </div>
              )}
            </div>
          </div>

          {/* Conquistas Compactas */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '16px'}}>🏅</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#2d3748'}}>
                  {childData.badges?.length || 0} Conquistas
                </span>
              </div>
              <div style={{display: 'flex', gap: '4px'}}>
                {childData.badges?.slice(0, 3).map(badge => (
                  <span key={badge.id} style={{fontSize: '20px'}} title={badge.name}>
                    {badge.emoji}
                  </span>
                ))}
                {(childData.badges?.length || 0) > 3 && (
                  <span style={{
                    fontSize: '12px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '4px'
                  }}>
                    +{(childData.badges?.length || 0) - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Use Money Button */}
          <button 
            onClick={() => setShowRequestForm(!showRequestForm)}
            style={{
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              width: '100%',
              marginBottom: '16px'
            }}>
            💰 {showRequestForm ? 'Fechar Formulário' : 'Usar Dinheiro'}
          </button>

          {/* Request Form */}
          {showRequestForm && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              marginBottom: '16px'
            }}>
              <h3 style={{margin: '0 0 20px 0', fontSize: '18px', color: '#2d3748', textAlign: 'center'}}>
                🛍️ Novo Pedido de Compra
              </h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {/* Item */}
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                    O que você quer?
                  </label>
                  <input
                    type="text"
                    value={newRequest.item}
                    onChange={(e) => setNewRequest(prev => ({...prev, item: e.target.value}))}
                    placeholder="Ex: Chocolate, Nintendo Switch..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Price */}
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                    Preço
                  </label>
                  <div style={{position: 'relative'}}>
                    <span style={{
                      position: 'absolute',
                      left: '12px',
                      top: '12px',
                      color: '#718096',
                      fontSize: '16px'
                    }}>R$</span>
                    <input
                      type="number"
                      value={newRequest.price}
                      onChange={(e) => setNewRequest(prev => ({...prev, price: e.target.value}))}
                      placeholder="25.50"
                      step="0.01"
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingLeft: '40px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                    Categoria
                  </label>
                  <select
                    value={newRequest.category}
                    onChange={(e) => setNewRequest(prev => ({...prev, category: e.target.value}))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      background: 'white',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Jogos Online">🎮 Jogos Online</option>
                    <option value="Alimentação">🍫 Alimentação</option>
                    <option value="Brinquedos">🧸 Brinquedos</option>
                    <option value="Roupas">👕 Roupas</option>
                    <option value="Livros">📚 Livros</option>
                  </select>
                </div>

                {/* Comments */}
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568'}}>
                    Por que você quer isso? (opcional)
                  </label>
                  <textarea
                    value={newRequest.comments}
                    onChange={(e) => setNewRequest(prev => ({...prev, comments: e.target.value}))}
                    placeholder="Ex: Para jogar com meus amigos..."
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Balance Info */}
                <div style={{
                  background: '#f0f9ff',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #bae6fd'
                }}>
                  <p style={{margin: 0, fontSize: '14px', color: '#0369a1'}}>
                    💰 Seu saldo atual: <strong>R$ {childData.balance.toFixed(2)}</strong>
                  </p>
                </div>

                {/* Buttons */}
                <div style={{display: 'flex', gap: '12px', marginTop: '8px'}}>
                  <button
                    onClick={() => {
                      setShowRequestForm(false)
                      setNewRequest({ item: '', price: '', category: 'Jogos Online', comments: '' })
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      background: 'white',
                      color: '#4a5568',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (newRequest.item && newRequest.price) {
                        const newRequestObj = {
                          id: Date.now(),
                          item: newRequest.item,
                          price: parseFloat(newRequest.price),
                          category: newRequest.category,
                          comments: newRequest.comments,
                          status: 'pending',
                          date: 'Agora'
                        }
                        
                        // Add to child's requests
                        setKidsData(prev => ({
                          ...prev,
                          [currentUser]: {
                            ...prev[currentUser],
                            requests: [...prev[currentUser].requests, newRequestObj]
                          }
                        }))
                        
                        alert(`✅ Pedido enviado!\n\n🛍️ ${newRequest.item}\n💰 R$ ${parseFloat(newRequest.price).toFixed(2)}\n📂 ${newRequest.category}\n${newRequest.comments ? `💭 ${newRequest.comments}` : ''}\n\n⏳ Aguarde aprovação dos pais!`)
                        setShowRequestForm(false)
                        setNewRequest({ item: '', price: '', category: 'Jogos Online', comments: '' })
                      } else {
                        alert('⚠️ Preencha pelo menos o item e o preço!')
                      }
                    }}
                    disabled={!newRequest.item || !newRequest.price}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: 'none',
                      borderRadius: '12px',
                      background: newRequest.item && newRequest.price ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : '#e2e8f0',
                      color: newRequest.item && newRequest.price ? 'white' : '#a0aec0',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: newRequest.item && newRequest.price ? 'pointer' : 'not-allowed'
                    }}
                  >
                    📨 Enviar Pedido
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Requests Section */}
          {childData.requests.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px'}}>
                <span style={{fontSize: '20px'}}>⏰</span>
                <h3 style={{margin: 0, fontSize: '18px', color: '#2d3748'}}>Pedidos de Compra</h3>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {childData.requests.map(request => (
                  <div key={request.id} style={{
                    borderLeft: '4px solid #f6ad55',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    background: '#fffbf0',
                    borderRadius: '0 12px 12px 0'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <div>
                        <div style={{fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '4px'}}>
                          R$ {request.price.toFixed(2)}
                        </div>
                        <div style={{fontSize: '14px', color: '#4a5568', marginBottom: '2px'}}>
                          {request.item}
                        </div>
                        <div style={{fontSize: '12px', color: '#718096', background: '#e2e8f0', padding: '2px 8px', borderRadius: '8px', display: 'inline-block'}}>
                          {request.category}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#f6ad55',
                        fontWeight: '500'
                      }}>
                        Aguardando aprovação...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Regras Tab
  if (currentTab === 'regras') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '16px'
      }}>
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
          {/* Header */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <div style={{fontSize: '48px', marginBottom: '12px'}}>🏆</div>
            <h2 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#2d3748'}}>Como Ganhar Pontos</h2>
            <p style={{margin: 0, color: '#718096'}}>Aprenda as regras do jogo!</p>
          </div>

          {/* Navigation */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-around', gap: '4px', overflow: 'hidden'}}>
              {[
                {key: 'inicio', label: '🏠 Início'},
                {key: 'sonhos', label: '🎯 Sonhos'},
                {key: 'gastos', label: '📊 Gastos'},
                {key: 'regras', label: '🏆 Regras'}
              ].map(tab => (
                <button key={tab.key} 
                  onClick={() => setCurrentTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: '8px 6px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    background: currentTab === tab.key ? 'linear-gradient(135deg, #4299e1 0%, #667eea 100%)' : 'transparent',
                    color: currentTab === tab.key ? 'white' : '#64748b',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Como Ganhar Pontos */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <h3 style={{margin: '0 0 20px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              🎮 Como Ganhar Pontos
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #bbf7d0'
              }}>
                <span style={{fontSize: '24px'}}>💰</span>
                <div>
                  <div style={{fontWeight: '600', color: '#166534'}}>+10 pontos</div>
                  <div style={{fontSize: '12px', color: '#166534'}}>Investir dinheiro nos seus sonhos</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fef3c7',
                borderRadius: '12px',
                border: '2px solid #fbbf24'
              }}>
                <span style={{fontSize: '24px'}}>🌟</span>
                <div>
                  <div style={{fontWeight: '600', color: '#d97706'}}>+50 pontos</div>
                  <div style={{fontSize: '12px', color: '#d97706'}}>Completar um sonho inteirinho!</div>
                </div>
              </div>

              <div style={{
                padding: '16px',
                background: '#f0f9ff',
                borderRadius: '12px',
                border: '2px solid #bae6fd',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '16px', fontWeight: '600', color: '#0369a1', marginBottom: '4px'}}>
                  📈 Níveis
                </div>
                <div style={{fontSize: '12px', color: '#0369a1'}}>
                  A cada 100 pontos você sobe 1 nível!
                </div>
              </div>
            </div>
          </div>

          {/* Medalhas */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <h3 style={{margin: '0 0 20px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              🏅 Medalhas Especiais
            </h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#faf5ff',
                borderRadius: '12px',
                border: '2px solid #e9d5ff'
              }}>
                <span style={{fontSize: '24px'}}>💎</span>
                <div>
                  <div style={{fontWeight: '600', color: '#7c3aed', fontSize: '14px'}}>Investidor de Sonhos</div>
                  <div style={{fontSize: '10px', color: '#7c3aed'}}>Primeira vez investindo em um sonho</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#fffbeb',
                borderRadius: '12px',
                border: '2px solid #fed7aa'
              }}>
                <span style={{fontSize: '24px'}}>🌟</span>
                <div>
                  <div style={{fontWeight: '600', color: '#f59e0b', fontSize: '14px'}}>Realizador de Sonhos</div>
                  <div style={{fontSize: '10px', color: '#f59e0b'}}>Completou seu primeiro sonho</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #bbf7d0'
              }}>
                <span style={{fontSize: '24px'}}>📅</span>
                <div>
                  <div style={{fontWeight: '600', color: '#059669', fontSize: '14px'}}>Poupador da Semana</div>
                  <div style={{fontSize: '10px', color: '#059669'}}>7 dias consecutivos poupando</div>
                </div>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              🔥 Sequência de Poupança
            </h3>
            
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{fontSize: '24px', marginBottom: '8px'}}>🔥</div>
              <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '4px'}}>
                Sua sequência atual: {childData.streak?.current || 0} dias
              </div>
              <div style={{fontSize: '12px', opacity: 0.9}}>
                Melhor sequência: {childData.streak?.best || 0} dias
              </div>
            </div>
            
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '12px', color: '#4b5563'}}>
                💡 Dica: Invista nos seus sonhos todos os dias para manter a sequência!
              </div>
            </div>
          </div>

          {/* Status Atual */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '80px'
          }}>
            <h3 style={{margin: '0 0 16px 0', fontSize: '20px', color: '#2d3748', textAlign: 'center'}}>
              📊 Seu Status Atual
            </h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
              <div style={{
                padding: '16px',
                background: '#f0f9ff',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #bae6fd'
              }}>
                <div style={{fontSize: '24px', marginBottom: '4px'}}>⭐</div>
                <div style={{fontSize: '18px', fontWeight: '600', color: '#0369a1'}}>Nível {childData.level}</div>
                <div style={{fontSize: '10px', color: '#0369a1'}}>
                  {100 - (childData.points % 100)} pts para próximo nível
                </div>
              </div>
              
              <div style={{
                padding: '16px',
                background: '#fef3c7',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #fbbf24'
              }}>
                <div style={{fontSize: '24px', marginBottom: '4px'}}>🏆</div>
                <div style={{fontSize: '18px', fontWeight: '600', color: '#d97706'}}>{childData.points} pontos</div>
                <div style={{fontSize: '10px', color: '#d97706'}}>Total conquistado</div>
              </div>
            </div>

            <div style={{
              marginTop: '12px',
              padding: '16px',
              background: '#ecfdf5',
              borderRadius: '12px',
              textAlign: 'center',
              border: '2px solid #a7f3d0'
            }}>
              <div style={{fontSize: '16px', fontWeight: '600', color: '#047857', marginBottom: '4px'}}>
                🏅 {childData.badges?.length || 0} Medalhas Conquistadas
              </div>
              <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px'}}>
                {childData.badges?.map(badge => (
                  <div key={badge.id} style={{
                    fontSize: '20px',
                    padding: '4px',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }} title={badge.description}>
                    {badge.emoji}
                  </div>
                )) || (
                  <div style={{fontSize: '12px', color: '#047857', opacity: 0.7}}>
                    Invista nos seus sonhos para ganhar suas primeiras medalhas!
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // Login Screen
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{fontSize: '48px', marginBottom: '16px'}}>📱</div>
          <h1 style={{
            fontSize: '32px', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-0.5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            MEU BANCO
          </h1>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #4299e1 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '4px 0 0 0',
            letterSpacing: '2px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            DIGITAL
          </h2>
        </div>
        
        <h3 style={{marginBottom: '24px', color: '#4a5568'}}>Entrar como:</h3>
        
        {Object.entries(kidsData).map(([key, child]) => (
          <button key={key} onClick={() => handleChildSelection(key)} 
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '12px',
              border: 'none',
              borderRadius: '12px',
              background: key === 'rafael' ? 'linear-gradient(135deg, #4299e1 0%, #667eea 100%)' : 'linear-gradient(135deg, #48bb78 0%, #4299e1 100%)',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
            👤 {child.name}
          </button>
        ))}
        
        {/* Divider */}
        <div style={{display: 'flex', alignItems: 'center', margin: '20px 0'}}>
          <div style={{flex: 1, height: '1px', background: '#e2e8f0'}}></div>
          <span style={{padding: '0 12px', color: '#718096', fontSize: '14px'}}>ou</span>
          <div style={{flex: 1, height: '1px', background: '#e2e8f0'}}></div>
        </div>
        
        {/* Parents Login */}
        <button onClick={() => {
          setCurrentUser('parent');
          setCurrentTab('inicio');
        }} 
          style={{
            width: '100%',
            padding: '16px',
            border: 'none',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
          👨‍👩‍👧‍👦 Entrar como Pais
        </button>
      </div>
    </div>
  )
}

export default App