import { createClient } from "@/lib/supabase/client";
import { CareerReport } from "@/types";

/**
 * Save a career report to the database
 */
export async function saveCareerReport(
  userId: string,
  report: CareerReport
): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("career_reports")
      .insert([
        {
          user_id: userId,
          report_data: report,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Error saving report:", error);
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.error("Error saving report:", err);
    return null;
  }
}

/**
 * Get all career reports for a user
 */
export async function getUserCareerReports(userId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("career_reports")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reports:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error fetching reports:", err);
    return [];
  }
}

/**
 * Get a specific career report
 */
export async function getCareerReport(reportId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("career_reports")
      .select("*")
      .eq("id", reportId)
      .single();

    if (error) {
      console.error("Error fetching report:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error fetching report:", err);
    return null;
  }
}

/**
 * Delete a career report
 */
export async function deleteCareerReport(reportId: string): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("career_reports")
      .delete()
      .eq("id", reportId);

    if (error) {
      console.error("Error deleting report:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error deleting report:", err);
    return false;
  }
}
