import React, { createContext, useContext, useState, useCallback } from 'react';
import machinesBackup from '../../data/machines.json';

const MachinesCacheContext = createContext();

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

export function MachinesCacheProvider({ children }) {
  const [cache, setCache] = useState({
    data: null,
    expiresAt: null,
    loading: false,
    error: null,
  });

  const isExpired = useCallback(() => {
    if (!cache.expiresAt) return true;
    return Date.now() > cache.expiresAt;
  }, [cache.expiresAt]);

  const isCached = useCallback(() => {
    return cache.data !== null && !isExpired();
  }, [cache.data, isExpired]);

  const fetchMachines = useCallback(async (url) => {
    // If valid cache exists, return it immediately
    if (isCached()) {
    //   console.log('Using cached machines data');
      return cache.data;
    }

    // Start loading
    setCache(prev => ({ ...prev, loading: true, error: null }));

    try {
      console.log('Fetching machines from URL:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Cache the data with expiration time
      const expiresAt = Date.now() + CACHE_EXPIRY_MS;
      setCache({
        data,
        expiresAt,
        loading: false,
        error: null,
      });

    //   console.log('Machines data fetched from URL:', {
    //     source: 'external_url',
    //     count: data.length,
    //     url: url,
    //     cachedUntil: new Date(expiresAt).toLocaleString(),
    //   });
      return data;
    } catch (err) {
      const errorMsg = err.message || 'Failed to fetch machines';
      console.warn('Failed to fetch from URL:', errorMsg);
      console.log('Falling back to machines.json');

      // Fallback to static backup
      const expiresAt = Date.now() + CACHE_EXPIRY_MS;
      setCache({
        data: machinesBackup,
        expiresAt,
        loading: false,
        error: null, // No error since we have fallback
      });

    //   console.log('Using fallback machines.json:', {
    //     source: 'fallback_static_json',
    //     count: machinesBackup.length,
    //     reason: errorMsg,
    //     cachedUntil: new Date(expiresAt).toLocaleString(),
    //   });

      return machinesBackup;
    }
  }, [cache.data, isCached]);

  const clearCache = useCallback(() => {
    setCache({
      data: null,
      expiresAt: null,
      loading: false,
      error: null,
    });
    console.log('machine assistance cache cleared');
  }, []);

  const getCacheStatus = useCallback(() => {
    return {
      isCached: isCached(),
      timeRemaining: cache.expiresAt ? Math.max(0, cache.expiresAt - Date.now()) : 0,
      expiresAt: cache.expiresAt ? new Date(cache.expiresAt).toLocaleString() : null,
    };
  }, [isCached, cache.expiresAt]);

  const value = {
    fetchMachines,
    clearCache,
    isCached,
    isExpired,
    getCacheStatus,
    cacheState: cache,
  };

  return (
    <MachinesCacheContext.Provider value={value}>
      {children}
    </MachinesCacheContext.Provider>
  );
}

export function useMachinesCache() {
  const context = useContext(MachinesCacheContext);
  if (!context) {
    throw new Error('useMachinesCache must be used within MachinesCacheProvider');
  }
  return context;
}
