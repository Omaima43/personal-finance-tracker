# Personal Finance Tracker

> A SvelteKit web application for tracking personal budgets, expenses, and live currency exchange rates.

---

## Purpose of the Project

The goal of this project is to build a personal finance management system that helps users:

- Track their balance and category-based budget
- Add, update, and delete budget categories
- Log expenses and view transaction history
- Monitor exchange rates (USD to EUR and HUF)


---

## Implementation Overview

- Built with **SvelteKit + TypeScript**
- Styled with **CSS**
- Modular, reusable components and API architecture
- Persistent user and budget data using **JSON text files**

#####  It began with setting up the routing system using SvelteKit’s file-based structure, creating core pages like the homepage, login, register, dashboard, and budget. User management, including registration and login, was handled using helper functions that interact directly with `users.json`, and the logged-in user is tracked via local storage. Budget categories and transactions are stored and updated through API routes that read and write to `budgets.json` and `transactions.json`. The UI was built using reusable Svelte components for balance display, budget management, transaction lists, and exchange rate cards. Styling was applied using plain CSS, including responsive layouts. Exchange rates are fetched using `axios` from an external API and displayed in the dashboard, while `chart.js` was used to create a dynamic pie chart for visualizing category spending. The application was built and tested incrementally to ensure usability, data persistence, and a smooth user experience.


---

## Project Structure

```bash
src/
│
├── lib/
│   ├── components/        # All custom Svelte components                 
│   │   ├── Navbar.svelte            
│   │   ├── Footer.svelte             
│   │   ├── BalanceCard.svelte  
│   │   ├── ExchangeRateCard.svelte      
│   │   ├── CategoryCard.svelte        
│   │   ├── SpendingForm.svelte           
│   │   ├── TransactionList.svelte          
│   │   ├── AddCategoryForm.svelte          
│   │   └── PieChart.svelte           
│   ├── helpers/           # Reusable helper functions (readJson, writeJson, auth)           
│   │   ├── auth.ts          
│   │   ├── writeJson.ts          
│   │   └── readJson.ts     
│   └── index.ts          # Type definitions
│
├── routes/
│   ├── api/               # API handlers for users, budget, transactions, etc.
│   ├── homepage/          # Public landing page
│   ├── budget/            # Budget management interface
│   ├── dashboard/         # User dashboard with balance + exchange
│   ├── login/             # Login form
│   └── register/          # Registration form
│   ├── +page.server.ts                  ## HOMEPAGE – shows motivational quote
│   └── +layout.svelte                ## Layout wrapper for pages
│
├── app.d.ts                          
├── app.html                          
├── app.css                         
│
└── static/data/           # Text-based JSON storage (users, budgets, transactions)

```
---

###  Description of APIs



| Endpoint               | Method     | Purpose                                                                 |
|------------------------|------------|-------------------------------------------------------------------------|
| `/api/users`           | `GET/PATCH`| Retrieves or updates a user's balance in `users.json`                  |
| `/api/budget`          | `GET/POST` | Retrieves or updates budget categories per user from `budgets.json`    |
| `/api/delete-category` | `POST`     | Deletes a budget category and related transactions for a specific user |
| `/api/transactions`    | `GET/POST` | Retrieves or adds transactions related to user categories              |
| `/api/exchange`        | `GET`      | Fetches current exchange rates from an **external API**                |

Each API uses JSON as its data format and is accessed internally via `fetch()` from Svelte frontend pages.

---

###  Description of Stored Data

The app uses local JSON files in `static/data/` as lightweight text-based databases:

- **`users.json`**  
  Stores registered users and their balance:
  ```json
  [
    {
      "username": "Tom",
      "password": "tom",
      "balance": 500
    }
  ]

- **`budgets.json`**  
  Maps each user's budget categories, including category limits and total spent.
  ```json
  [
  {
    "username": "Tom",
    "categories": [
      {
        "id": "abc",
        "name": "Food",
        "limit": 100,
        "spent": 40
      }
    ]
  }
  ]
- **`transactions.json`**  
  Stores user transactions with timestamped spending entries per category.
- ```json
  [
  {
    "username": "Tom",
    "transactions": [
      {
        "id": "3a20eebb-ee96-4f65-9af6-0581b2f58575",
        "categoryId": "adba8de3-c27a-4e2c-af21-e56742d99039",
        "amount": 20,
        "date": "2025-05-07T07:31:10.260Z"
      }
    ]
  }
  ]
---
## Communication Between Components and Services

#### Component-to-Component Communication
- Uses export let to pass props.
- Event callbacks (e.g., onSpend, onUpdate) are passed from parent to child.
- Local state is updated and persisted through API calls.

#### Component-to-API Communication
Pages like /dashboard and /budget use fetch() to:

- Load user data via /api/users and /api/budget.
- Submit updates (e.g., balance changes, spending).
- Persist changes to the backend .json files.

#### State Management
- Reactive variables (let) are used for managing local state.
- onMount() is used to load data when a component/page mounts.
- API responses immediately update the UI for a smooth experience.

---

##  External Node Modules Used

- [`chart.js`](https://www.npmjs.com/package/chart.js) – for pie chart visualization
- [`axios`](https://www.npmjs.com/package/axios) – for making HTTP requests to the external exchange rate API
---
## Installation

To set up this project locally on your machine:

1. **Ensure Node.js and npm are installed**

2. **Clone the repository**

   ```bash
   git clone https://github.com/Omaima43/personal-finance-tracker.git
   cd personal-finance-tracker
3. **Install dependencies**

   ```bash
   npm install
   
4.**Run the development server**

   ```bash
  npm run dev

