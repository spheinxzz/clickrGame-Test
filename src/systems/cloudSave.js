import { supabase } from "../supabase/client";

export async function saveCloudGame(userId, game) {
  if (!userId || !game) {
    return false;
  }

  try {
    // 1. Save game state to 'saves' table
    const { error: saveError } = await supabase
      .from("saves")
      .upsert(
        {
          user_id: userId,
          data: game,
          updated_at: new Date()
        },
        {
          onConflict: "user_id"
        }
      );

    if (saveError) {
      console.error("Cloud save failed:", saveError);
      return false;
    }

    // 2. Fetch user details to sync username & score to 'leaderboard' table
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    const userDisplayName =
      user?.user_metadata?.display_name ||
      user?.email?.split("@")[0] ||
      "Player";

    // Standardize total score from money or totalMoneyEarned
    const totalScore = Math.floor(game.totalMoneyEarned || game.money || 0);

    const { error: leaderboardError } = await supabase
      .from("leaderboard")
      .upsert(
        {
          user_id: userId,
          username: userDisplayName,
          money: totalScore,
          updated_at: new Date()
        },
        {
          onConflict: "user_id"
        }
      );

    if (leaderboardError) {
      console.error("Leaderboard update error:", leaderboardError.message);
    }

    return true;
  } catch (error) {
    console.error("Cloud save error:", error);
    return false;
  }
}

export async function loadCloudGame(userId) {
  if (!userId) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("saves")
      .select("data")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Cloud load failed:", error);
      return null;
    }

    return data?.data ?? null;
  } catch (error) {
    console.error("Cloud load error:", error);
    return null;
  }
}

export async function deleteCloudGame(userId) {
  if (!userId) {
    return false;
  }

  try {
    const { error } = await supabase
      .from("saves")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Cloud delete failed:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Cloud delete error:", error);
    return false;
  }
}