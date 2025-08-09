
# Business Nexus

<div align="center">
  <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Business Nexus" width="400"/>
  
  <h3>Connecting Entrepreneurs and Investors</h3>
  
  <p>A networking platform designed to bridge the gap between innovative entrepreneurs and forward-thinking investors.</p>
</div>

## 🚀 Features

- **Dual Role System**: Separate dashboards and profiles for entrepreneurs and investors
- **Dynamic Matching**: Connect with the right partners based on industry, investment size, and business goals
- **Secure Messaging**: Built-in communication system for discussing opportunities
- **Profile Management**: Showcase your business or investment portfolio
- **Protected Routes**: Role-based access control to maintain privacy and security

## 💻 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router
- **State Management**: TanStack React Query
- **Authentication**: Custom auth provider with role-based protection

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm (comes with Node.js)

## 🛠️ Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/business-nexus.git
cd business-nexus
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
business-nexus/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   ├── layouts/     # Layout components
│   │   └── ui/          # UI design system components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── pages/           # Page components
├── index.html           # HTML entry point
└── tailwind.config.ts   # Tailwind configuration
```

## 🔐 Authentication

Business Nexus uses a role-based authentication system:

- **Investor Role**: Access to investor dashboard, viewing entrepreneur profiles
- **Entrepreneur Role**: Access to entrepreneur dashboard, viewing investor profiles

To test the application:
1. Register as either an investor or entrepreneur
2. Log in with your credentials
3. Explore the role-specific dashboard and features

## 🔄 Workflow

1. **Entrepreneurs**: Create a profile, describe your business idea, and specify needed investment
2. **Investors**: Browse entrepreneur profiles, filter by industry or investment size
3. **Connect**: Use the messaging system to start conversations
4. **Collaborate**: Take your discussions offline and build successful business relationships

## 📱 Responsive Design

Business Nexus is designed to work across devices of all sizes - from mobile phones to desktop computers.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

For any questions or suggestions, please reach out to us at [your-email@example.com](mailto:arishamumtaz340@gmail.com).

