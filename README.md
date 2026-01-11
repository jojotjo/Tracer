# 💰 Tracer - Expense Tracker

> **A modern, beautiful, and powerful expense tracking application built with React & Tailwind CSS**

Tracer helps you take control of your finances by tracking, analyzing, and optimizing your daily spending with ease. Simple, powerful, and built for your financial success.

## 🌟 Features

### 📊 **Expense Tracking**
- ✅ Add expenses with category, date, and notes
- ✅ Edit and delete transactions
- ✅ Multiple payment methods (Cash, Card, UPI)
- ✅ 8+ spending categories
- ✅ Real-time expense list with filtering
- ✅ Month and category-based filters

### 📈 **Statistics & Analytics**
- ✅ Interactive charts (Pie, Line, Bar)
- ✅ Category-wise expense breakdown
- ✅ Monthly spending trends (last 12 months)
- ✅ Daily expense tracking
- ✅ Payment method analysis
- ✅ CSV report download
- ✅ Summary statistics and insights

### 💰 **Budget Management**
- ✅ Set spending limits by category
- ✅ Multiple budget periods (Monthly, Quarterly, Yearly)
- ✅ Real-time budget vs spending comparison
- ✅ Visual progress indicators
- ✅ Smart alerts (Safe, Warning, Exceeded)
- ✅ Edit and delete budgets
- ✅ Budget utilization tracking

### 🎨 **User Interface**
- ✅ Beautiful gradient design with purple/pink theme
- ✅ Dark mode & Light mode toggle
- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Smooth animations & transitions
- ✅ Intuitive navigation
- ✅ Toast notifications for actions
- ✅ Loading states and error handling

### 🔐 **Security & Authentication**
- ✅ User authentication (Login/Signup)
- ✅ Protected routes for authenticated users
- ✅ JWT token management
- ✅ Session expiry handling
- ✅ Secure password storage
- ✅ Token refresh mechanism


## 📁 Project Structure

```
tracer-expense-tracker/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Main navigation bar
│   │   ├── ProtectedRoute.jsx         # Route protection
│   │   ├── StatisticsCharts.jsx       # Reusable charts component
│   │   └── BudgetManagement.jsx       # Budget CRUD operations
│   │
│   ├── pages/
│   │   ├── Home.jsx                   # Landing page
│   │   ├── Login.jsx                  # User login
│   │   ├── Signup.jsx                 # User registration
│   │   ├── Dashboard.jsx              # Overview dashboard
│   │   ├── Expenses.jsx               # Expense list & management
│   │   ├── AddExpense.jsx             # Add/edit expense form
│   │   ├── Statistics.jsx             # Analytics & charts
│   │   └── Budget.jsx                 # Budget management page
│   │
│   ├── context/
│   │   └── AuthContext.jsx            # Auth state management
│   │
│   ├── services/
│   │   ├── authService.js            # Auth API calls
│   │   └── expenseService.js         # Expense API calls
│   │
│   ├── utils/
│   │   ├── auth.js                   # Auth utilities
│   │   └── theme.js                  # Theme utilities
│   │
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
│
├── public/                            # Static assets
├── package.json                       # Dependencies
├── tailwind.config.js                 # Tailwind config
├── vite.config.js                     # Vite config
└── README.md                          # This file
```

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Routing**: React Router v6
- **HTTP Client**: Fetch API

### Backend Requirements
- REST API for authentication
- Expense CRUD operations API
- JWT token management
- Database for users and expenses

### Storage
- LocalStorage for theme preferences & budgets
- Backend database for expenses & user data

---

## 📚 Features Explanation

### 1. Dashboard 📊
- **Overview**: Total spending, monthly summary
- **Stats Cards**: Quick financial metrics
- **Recent Expenses**: Latest 5 transactions
- **Monthly Breakdown**: Category-wise distribution
- **Navigation**: Quick links to all features

### 2. Expense Management 💸
**Add Expense**
- Quick form to log spending
- Category selection (8+ categories)
- Date and time picker
- Payment method (Cash, Card, UPI)
- Optional notes

**View Expenses**
- Filterable list of all transactions
- Sort by date, amount, category
- Search functionality
- Edit and delete options

**Edit Expense**
- Update any transaction details
- Modify amount, category, date
- Real-time validation

**Delete Expense**
- Remove transactions with confirmation
- Automatic budget recalculation

### 3. Statistics Page 📈
**Stat Cards (4 total)**
- Total Spending: Sum of all expenses
- Average Expense: Per-transaction average
- Highest Expense: Maximum single transaction
- Total Transactions: Count of all entries

**Charts**
- **Category Pie Chart**: Visual breakdown by category
- **Payment Method Pie Chart**: Cash vs Card vs UPI
- **Monthly Line Chart**: 12-month spending trend
- **Daily Bar Chart**: Current month daily breakdown

**Features**
- Month filtering
- Summary statistics
- Top spending category
- Most used payment method
- CSV export for reports

### 4. Budget Management 💰
**Create Budgets**
- Set limits by category
- Choose period (Monthly/Quarterly/Yearly)
- Multiple budgets per category

**View Budgets**
- Card-based layout
- Budget amount display
- Spent amount (auto-calculated)
- Remaining amount
- Progress bar with percentage

**Status Indicators**
- 🟢 **Green (Safe)**: 0-80% of budget used
- 🟠 **Orange (Warning)**: 80-100% of budget used
- 🔴 **Red (Exceeded)**: 100%+ of budget used

**Manage Budgets**
- Edit budget amounts and periods
- Delete budgets with confirmation
- Real-time updates as expenses change

### 5. Dark Mode 🌙
- Toggle between dark and light themes
- Preference persists across sessions
- Optimized for both modes
- All pages support dark mode
- Beautiful gradient backgrounds in both modes

---

## 🔐 Authentication Flow

### Sign Up Process
1. User enters email, name, password
2. Password validation (strength check)
3. Confirm password match
4. Submit to backend
5. User account created
6. Auto-login or redirect to login

### Login Process
1. User enters email and password
2. Credentials verified on backend
3. JWT token issued on success
4. Token stored in localStorage
5. Redirect to dashboard
6. All API requests include token

### Protected Routes
- Dashboard
- Expenses
- Add Expense
- Statistics
- Budget Management

### Session Management
- Automatic token expiry detection
- Session refresh on app load
- Logout on token expiration
- Clear localStorage on logout

---

## 📊 Data Structures

### Expense Object
```javascript
{
  _id: "ObjectId",
  userId: "user_id",
  category: "Food",
  amount: 500,
  date: "2024-01-10",
  paymentMode: "Cash",
  note: "Lunch at restaurant",
  createdAt: "2024-01-10T10:30:00Z",
  updatedAt: "2024-01-10T10:30:00Z"
}
```

### Budget Object
```javascript
{
  id: 1704901234567,
  category: "Food",
  amount: 5000,
  period: "monthly",
  createdAt: "2024-01-10T10:30:00Z"
}
```

### User Object
```javascript
{
  _id: "ObjectId",
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
  createdAt: "2024-01-01T00:00:00Z"
}
```

---

## 🎨 Design System

### Color Palette
**Primary Colors**
- Purple: `#8b5cf6`
- Pink: `#ec4899`

**Neutral Colors**
- White: `#ffffff`
- Gray-200: `#e5e7eb`
- Gray-700: `#374151`

**Status Colors**
- Green: `#10b981`
- Orange: `#f59e0b`
- Red: `#ef4444`
- Blue: `#0ea5e9`

**Dark Mode**
- Background: `#0f172a` to `#1e293b`
- Cards: `rgba(15, 23, 42, 0.5)`
- Text: `#f1f5f9`

### Typography
- **Headings**: Bold, high contrast
- **Body**: Regular, readable
- **Small**: Secondary information
- **Monospace**: Code and numbers

---

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 640px (Single column, stacked layout)
- **Tablet**: 641px - 1024px (2-column grid)
- **Desktop**: 1025px+ (3-4 column grid, full features)
