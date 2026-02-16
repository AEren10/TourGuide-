import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // Get initial network state
    NetInfo.fetch().then(handleNetworkChange);

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNetworkChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected ?? false);
    setIsInternetReachable(state.isInternetReachable ?? false);
    setConnectionType(state.type);

    // Log network changes (for debugging, remove in production)
    if (!state.isConnected) {
      console.log('Network: Disconnected');
    } else if (!state.isInternetReachable) {
      console.log('Network: Connected but no internet');
    }
  };

  return {
    isConnected,
    isInternetReachable,
    isOnline: isConnected && isInternetReachable,
    connectionType,
  };
};
