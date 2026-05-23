import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import MemoryBoxScreen from './components/MemoryBoxScreen';
import CapsuleScreen from './components/CapsuleScreen';
import FamilyScreen from './components/FamilyScreen';
import ChatScreen from './components/ChatScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="size-full bg-background">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/memory-box" element={<MemoryBoxScreen />} />
            <Route path="/capsules" element={<CapsuleScreen />} />
            <Route path="/family" element={<FamilyScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}