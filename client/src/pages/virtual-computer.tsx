import BootScreen from "@/components/virtual-computer/BootScreen";
import Desktop from "@/components/virtual-computer/Desktop";
import { useVirtualSystem } from "@/hooks/useVirtualSystem";

export default function VirtualComputer() {
  const {
    isBooted,
    bootProgress,
    systemStats,
    runningApps,
    selectedApp,
    virtualData,
    launchApp,
    closeApp,
    minimizeApp,
    saveSystemState,
    loadSystemState,
    setSelectedApp,
    showStartMenu,
    setShowStartMenu,
    searchQuery,
    setSearchQuery,
  } = useVirtualSystem();

  if (!isBooted) {
    return <BootScreen progress={bootProgress} />;
  }

  return (
    <Desktop
      systemStats={systemStats}
      runningApps={runningApps}
      selectedApp={selectedApp}
      virtualData={virtualData}
      launchApp={launchApp}
      closeApp={closeApp}
      minimizeApp={minimizeApp}
      saveSystemState={saveSystemState}
      loadSystemState={loadSystemState}
      setSelectedApp={setSelectedApp}
      showStartMenu={showStartMenu}
      setShowStartMenu={setShowStartMenu}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
