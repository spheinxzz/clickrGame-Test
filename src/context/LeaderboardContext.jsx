import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const LeaderboardContext = createContext();

export function LeaderboardProvider({ children }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data?.user || null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("money", { ascending: false })
        .limit(50);

      if (error) throw error;
      setScores(data || []);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async (moneyAmount, username) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) return;

      const userDisplayName =
        username ||
        user.user_metadata?.display_name ||
        user.email?.split("@")[0] ||
        "Player";

      const { error } = await supabase.from("leaderboard").upsert(
        {
          user_id: user.id,
          username: userDisplayName,
          money: moneyAmount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      if (error) throw error;
      await fetchLeaderboard();
    } catch (err) {
      console.error("Error submitting score:", err.message);
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) throw new Error("You must be logged in to change your username.");

      await supabase.auth.updateUser({
        data: { display_name: newUsername },
      });

      const { error } = await supabase
        .from("leaderboard")
        .update({ username: newUsername, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);

      if (error) throw error;

      await fetchLeaderboard();
      return { success: true };
    } catch (err) {
      console.error("Error updating username:", err.message);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <LeaderboardContext.Provider
      value={{
        scores,
        loading,
        error,
        currentUser,
        fetchLeaderboard,
        submitScore,
        updateUsername,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard() {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error("useLeaderboard must be used within a LeaderboardProvider");
  }
  return context;
}