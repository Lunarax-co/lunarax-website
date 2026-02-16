'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MissionState {
  missionBoard: {
    learnProcess: boolean;
    discoverRisk: boolean;
    findService: boolean;
  };
  allMissionsComplete: boolean;
}

interface GamificationContextType {
  missionState: MissionState;
  completeMission: (missionId: keyof MissionState['missionBoard']) => void;
  resetMissions: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const STORAGE_KEY = 'lunarax_mission_state';

const getInitialState = (): MissionState => {
  if (typeof window === 'undefined') {
    return {
      missionBoard: {
        learnProcess: false,
        discoverRisk: false,
        findService: false,
      },
      allMissionsComplete: false,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('localStorage okuma hatası:', error);
  }

  return {
    missionBoard: {
      learnProcess: false,
      discoverRisk: false,
      findService: false,
    },
    allMissionsComplete: false,
  };
};

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [missionState, setMissionState] = useState<MissionState>(getInitialState);

  // localStorage'a her değişiklikte kaydet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(missionState));
      } catch (error) {
        console.error('localStorage yazma hatası:', error);
      }
    }
  }, [missionState]);

  const completeMission = (missionId: keyof MissionState['missionBoard']) => {
    setMissionState((prev) => {
      const updated = {
        ...prev,
        missionBoard: {
          ...prev.missionBoard,
          [missionId]: true,
        },
      };
      updated.allMissionsComplete =
        updated.missionBoard.learnProcess &&
        updated.missionBoard.discoverRisk &&
        updated.missionBoard.findService;
      return updated;
    });
  };

  const resetMissions = () => {
    const resetState = {
      missionBoard: {
        learnProcess: false,
        discoverRisk: false,
        findService: false,
      },
      allMissionsComplete: false,
    };
    setMissionState(resetState);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
      } catch (error) {
        console.error('localStorage sıfırlama hatası:', error);
      }
    }
  };

  return (
    <GamificationContext.Provider value={{ missionState, completeMission, resetMissions }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
}
