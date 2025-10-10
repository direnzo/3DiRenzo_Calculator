# 📋 GitHub Repository Configuration

## 🏷️ Repository Settings

### Basic Info
- **Name:** 3DiRenzo_Calculator
- **Description:** 🧮 Calculadora de preços para impressão 3D - Multiplataforma (iOS/Android/Web/Desktop) com sistema whitelabel
- **Website:** https://3dquote.direnzo.dev (quando disponível)
- **Topics:** 
  - `3d-printing`
  - `pricing-calculator`
  - `react-native`
  - `expo`
  - `typescript`
  - `monorepo`
  - `whitelabel`
  - `mobile-app`
  - `fdm`
  - `msla`
  - `sla`
  - `quote-generator`

### Branch Protection Rules
Configure para `main` branch:
- ✅ Require a pull request before merging
- ✅ Require approvals (mínimo 1)
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require linear history
- ✅ Include administrators

### Required Status Checks
- `test`
- `mobile-build`  
- `web-build`

### Repository Features
- ✅ Wikis
- ✅ Issues
- ✅ Projects
- ✅ Preserve this repository
- ✅ Discussions
- ❌ Sponsorships (por enquanto)

### Merge Options
- ✅ Allow merge commits
- ✅ Allow squash merging
- ✅ Allow rebase merging

### Security
- ✅ Private vulnerability reporting
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates

## 🏃‍♂️ Quick Start Commands

```bash
# Clone repository
git clone https://github.com/USERNAME/3DiRenzo_Calculator.git
cd 3DiRenzo_Calculator

# Install dependencies
pnpm install

# Start development
pnpm dev:mobile  # Mobile app
pnpm dev:desktop # Web app

# Build for production
pnpm build
```

## 📝 Release Notes Template

```markdown
## 🚀 Version X.Y.Z - Release Name

### ✨ New Features
- Feature description

### 🐛 Bug Fixes  
- Bug fix description

### 🔄 Changes
- Change description

### 🏗️ Technical
- Technical improvement description

### 📱 Platforms
- [ ] iOS
- [ ] Android  
- [ ] Web
- [ ] Desktop

**Full Changelog**: https://github.com/USERNAME/3DiRenzo_Calculator/compare/vX.Y.Z-1...vX.Y.Z
```

## 🤝 Community Guidelines

### Code of Conduct
Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org/) código de conduta.

### Support
- 🐛 **Bugs:** Use GitHub Issues com template de bug report
- 💡 **Feature Requests:** Use GitHub Issues com template de feature request  
- ❓ **Questions:** Use GitHub Discussions
- 📧 **Security:** Email privado para vulnerabilidades

### Labels Strategy
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers  
- `help wanted` - Extra attention is needed
- `priority:high` - High priority issue
- `platform:mobile` - Mobile specific
- `platform:web` - Web specific
- `platform:desktop` - Desktop specific
- `area:pricing` - Pricing engine related
- `area:ui` - User interface related
- `area:backend` - Backend/API related