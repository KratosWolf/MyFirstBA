import { useState, useEffect } from 'react'
import { Wallet, Users, PiggyBank, Star, Settings, Home } from 'lucide-react'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState('child') // 'child' | 'parent'

  // Simulated data - replace with Firebase later
  const [balance, setBalance] = useState(150.50)
  const [level, setLevel] = useState(3)
  const [points, setPoints] = useState(245)

  const handleLogin = (type) => {
    setUserType(type)
    setCurrentUser(type === 'child' ? 'João' : 'Papai')
  }

  const KidsView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Olá, {currentUser}! 👋</h1>
              <p className="text-gray-600">Nível {level} • {points} pontos</p>
            </div>
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Balance */}
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-4 text-white">
            <p className="text-sm opacity-80">Seu saldo</p>
            <p className="text-3xl font-bold">R$ {balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <PiggyBank className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Metas</h3>
            <p className="text-sm text-gray-600">2 sonhos ativos</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Wallet className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Pedidos</h3>
            <p className="text-sm text-gray-600">1 pendente</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">+</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Mesada</p>
                  <p className="text-sm text-gray-600">Hoje</p>
                </div>
              </div>
              <span className="text-green-600 font-semibold">+R$ 50,00</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">?</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Pedido: Brinquedo</p>
                  <p className="text-sm text-gray-600">Ontem</p>
                </div>
              </div>
              <span className="text-orange-500 font-semibold">Pendente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ParentsView = () => (
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
                <p className="text-2xl font-bold text-green-600">R$ 150,50</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pedidos Pendentes</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">Brinquedo Novo</h4>
                  <span className="text-lg font-semibold text-blue-600">R$ 45,00</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Solicitado por João</p>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600">
                    Aprovar
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600">
                    Rejeitar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Family Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Visão da Família</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">João</p>
                    <p className="text-sm text-gray-600">Nível 3 • 245 pontos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">R$ 150,50</p>
                  <p className="text-sm text-green-600">+R$ 50 esta semana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const LoginView = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏦 Banco da Família</h1>
          <p className="text-gray-600">Educação financeira para toda a família</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('child')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            👶 Entrar como Criança
          </button>
          
          <button
            onClick={() => handleLogin('parent')}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            👨‍👩‍👧‍👦 Entrar como Pais
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

  if (!currentUser) {
    return <LoginView />
  }

  return userType === 'child' ? <KidsView /> : <ParentsView />
}

export default App