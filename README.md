# GraphQL Profile Dashboard

A modern, single-page application built with vanilla JavaScript that fetches and displays user profile data from a GraphQL API. The project demonstrates key object-oriented programming concepts and authentication best practices.

## Project Overview

This application provides a comprehensive user dashboard where authenticated users can view:
- **Profile Information**: User details (name, username, avatar, personal info)
- **Projects**: List of completed projects with XP earned
- **Skills**: Visual representation of user skills
- **Audits**: Audit ratio and performance metrics
- **About**: User cohort and event information

##  Architecture & Project Structure

```
graphql/
├── app.js                   Entry point with routing setup
├── index.html              HTML template
├── README.md                Project documentation
├── core/                    Core framework classes (OOP patterns)
│   ├── Component.js         Base component class (Inheritance)
│   ├── Page.js              Page component (Inheritance/Polymorphism)
│   └── Router.js            Client-side router
├── graphql/                 GraphQL integration
│   ├── Client.js            GraphQL client with JWT auth
│   └── Queries.js           GraphQL query definitions
├── Pages/                   Page components (Polymorphism)
│   ├── LoginPage.js         Login form & authentication
│   ├── ProfilePage.js       Main dashboard
│   └── ErrorPage.js         Error handling
├── components/              Reusable UI components (Inheritance)
│   ├── UserInfo.js          User profile display
│   ├── AboutUser.js         User about section
│   ├── Projects.js          Projects list
│   ├── SkillsGraph.js       Skills visualization
│   ├── AudioGraph.js        Audit statistics
│   ├── Sidebar.js           Navigation sidebar
│   ├── LoadingSpinner.js    Loading indicator
│   ├── Logo.js              Logo component
│   └── LogoutButtun.js      Logout button
├── utils/                   Utility functions
│   ├── Auth.js              Authentication logic
│   ├── Storage.js           Token storage management
│   ├── FormatXp.js          XP formatting helper
│   ├── GetRank.js          Rank calculation
│   └── Helpers.js          General utilities
└── styles/
    └── styles.css         # Styling
```

## 🔑 Key Concepts Used

### 1. **Object-Oriented Programming (OOP)**
   - **Classes**: All components are ES6 classes with proper encapsulation
   - **Constructors**: Initialization with props and state management
   - **Methods**: Specific behaviors (render, mount, unmount)
   - **Inheritance**: Component hierarchy with base classes and subclasses

### 2. **Inheritance**
   ```javascript
   // Base class
   export class Component { }
   
   // Inherits from Component
   export class Page extends Component { }
   
   // Pages inherit from Page
   export class LoginPage extends Page { }
   ```
   - All page components inherit from `Page`
   - `Page` inherits from `Component`
   - Child classes extend and override parent methods

### 3. **Polymorphism**
   - **Method Overriding**: 
     - `Page.render()` overrides `Component.render()`
     - `LoginPage.render()` overrides `Page.render()`
     - Each component implements its own UI differently
   - **Abstract Methods**: 
     - `Component.render()` throws an error, forcing subclasses to implement
   - **Interface Implementation**: All components follow render/mount/unmount pattern

### 4. **Encapsulation**
   - **Data Privacy**: Token stored securely in localStorage
   - **Component Isolation**: Each component manages its own state
   - **Props Pattern**: Data passed through constructor props
   - **Public Interface**: render(), mount(), unmount() methods

### 5. **JWT (JSON Web Tokens)**
   - **Authentication Flow**: 
     - User credentials encoded in Base64 for signin
     - Server returns JWT token stored in localStorage
     - Token sent in Authorization header for authenticated requests
   ```javascript
   headers: {
       'Authorization': `Bearer ${this.token}`
   }
   ```
   - **Token Validation**: Checked on app load to redirect authenticated users
   - **Security**: Tokens expire, invalid tokens trigger re-login

### 6. **GraphQL**
   - **Query Language**: Structured data requests with specific fields
   - **GraphQL Queries**: Predefined queries for different data needs
     - `USER_INFO`: Fetches user profile and metrics
     - `PROJECT_LIST`: Lists completed projects
     - `SKILLS`: User skills and proficiency
     - `AUDITS`: Audit statistics and ratios
   - **GraphQL Client**: Custom client for executing queries
   - **API Integration**: Communicates with GraphQL endpoint
   - **Error Handling**: Handles GraphQL errors and redirects to login

### 7. **Single Page Application (SPA)**
   - **Client-side Routing**: Hash-based routing (#/login, #/profile)
   - **Dynamic Content**: Components render and unmount dynamically
   - **Navigation**: Router controls page transitions without page reloads
   - **History Management**: Window hashchange events trigger routing

### 8. **Design Patterns**

#### Component Pattern
- Lifecycle: render() → mount() → unmount()
- Base class defines contract
- Subclasses implement specific behavior

#### Router Pattern
- Hash-based navigation
- Route table mapping paths to page classes
- Automatic routing on hash changes

#### Singleton Pattern
- `Storage` utility: Single instance for token management
- `Auth` utility: Single instance for authentication

#### Observer Pattern
- Window hashchange event listener in Router
- Event-driven navigation updates

#### Factory Pattern
- Sidebar creates components on demand based on selection
- Route handler instantiates appropriate page class

##  Authentication Flow

```
1. Login Form → User Enters Credentials
2. Auth.sign() → Base64 encode (Basic Auth)
3. API Response → Receive JWT Token
4. Storage.setToken() → Save to localStorage
5. GraphQL Requests → Include token in Authorization header
6. Token Validation → If invalid, redirect to /login
```
