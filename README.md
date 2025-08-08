# 🏦 Banco da Família - Kids Bank App

Sistema completo de educação financeira para crianças com controle parental.

## 🎯 Funcionalidades

### 👶 Para as Crianças
- ✅ Login seguro com PIN de 4 dígitos
- ✅ Visualização do saldo e histórico
- ✅ Criação de pedidos de compra
- ✅ Sistema de metas e sonhos
- ✅ Gamificação com níveis e pontos
- ✅ Relatórios de gastos por categoria

### 👨‍👩‍👧‍👦 Para os Pais
- ✅ Login seguro com Google OAuth
- ✅ Aprovação/rejeição de pedidos
- ✅ Controle de limites de gastos
- ✅ Adição de dinheiro (mesada, presentes, etc.)
- ✅ Sistema de juros educativo
- ✅ Relatórios completos e análises

### 🔔 Sistema de Notificações
- ✅ Toasts modernas em tempo real
- ✅ Feedback visual elegante
- ✅ Ações contextuais integradas

## 🚀 Tecnologias

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Firebase
- **Authentication**: Firebase Auth + Google OAuth
- **Database**: Firestore
- **Hosting**: Vercel (auto-deploy)

## 💻 Como Executar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## 🔧 Configuração

### Firebase Setup
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative Authentication (Google Provider)
3. Configure Firestore Database
4. Adicione as credenciais no arquivo `.env`

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## 📱 Funcionalidades Detalhadas

### Para Crianças
- **Dashboard personalizado** com saldo e nível
- **Sistema de pontos** e gamificação
- **Metas e sonhos** para ensinar economia
- **Pedidos de compra** com aprovação parental
- **Histórico de transações** visual e interativo

### Para Pais
- **Dashboard administrativo** completo
- **Aprovação de pedidos** em tempo real
- **Controle de mesada** e limites
- **Analytics e relatórios** de gastos
- **Sistema educativo de juros**

## 🚢 Deploy

O projeto está configurado com CI/CD automático:
- **Push para `develop`**: Deploy automático para staging
- **Push para `main`**: Deploy automático para produção
- **Pull Requests**: Preview automático

## 🔒 Segurança

- **Firebase Security Rules** configuradas
- **Autenticação segura** para pais e crianças
- **Proteção de dados** seguindo LGPD
- **Branch protection** no GitHub
- **Secrets management** seguro

## 📈 Status do Projeto

- [x] ✅ Configuração inicial
- [x] ✅ Interface base
- [x] ✅ Sistema de roteamento
- [x] ✅ CI/CD Pipeline
- [ ] 🔄 Integração Firebase
- [ ] 🔄 Autenticação completa
- [ ] 🔄 Gamificação avançada
- [ ] 🔄 Sistema de notificações
- [ ] 🔄 Relatórios e analytics

## 👥 Contribuição

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para ensinar educação financeira de forma divertida!**