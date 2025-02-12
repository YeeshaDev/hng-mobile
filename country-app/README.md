# Country Info Mobile App

## 🌟 **Overview**

This mobile application allows users to:
- View a list of countries with search functionality.
- See detailed information about each country, including the flag, capital, population, and more.
- Switch between light and dark themes.
- Test the app online via **Appetize.io**.

## 🚀 **Features**

- **Country List:** Scrollable list of countries with a search bar.
- **Country Details:** Displays:
  - Country Name
  - Flag
  - Capital City
  - Population
  - Country Code
  - Continent. e.t.c
 
- **Theme Customization:** Toggle between Light and Dark modes.
- **Responsive Design:** Optimized for various screen sizes.
- **Deployment:** Accessible online via Appetize.io.

---

## 🎓 **Getting Started**

### Prerequisites
- **Node.js** (v14 or later)
- **Expo CLI:**
  ```bash
  npm install -g expo-cli
  ```

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/country-info-app.git
   cd country-info-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Generate API Key:**
   - Visit [Country API](https://restfulcountries.com/request-access-token)
   - Sign up and generate your API key.
   - Create a `.env` file in the root directory:
     ```env
     EXPO_PUBLIC_API_TOKEN=your_api_key_here
     EXPO_PUBLIC_BASE_URL=your_base-url_here
     ```

4. **Run the App:**
   ```bash
   expo start
   ```

---

## 🌐 **App Deployment** (Appetize.io)

1. **Build the Project:**
   ```bash
   expo build:android
   ```

2. **Upload to Appetize.io:**
   - Go to [Appetize.io](https://appetize.io/)
   - Upload the `.apk` file.
   - Copy the generated link to share your app.

---

## 🔄 **Theme Customization**

- Toggle the theme via the button on the Home screen header.
- Theme preferences are saved locally (persistent across sessions).

---

## 💪 **Contributing**

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request.

---

## 🌟 **Technologies Used**

- **React Native**
- **Expo**
- **TypeScript**
- **AsyncStorage** (for theme persistence)
- **Appetize.io** (for deployment)

---

## ✨ **License**

This project is licensed under the [MIT License](LICENSE).

---

## 🚀 **Live Demo**

[Click Here to Test on Appetize.io](https://appetize.io/app/your-app-link)

