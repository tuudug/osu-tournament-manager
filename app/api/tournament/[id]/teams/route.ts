import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: teams, error } = await supabase
    .from("tournament_team")
    .select()
    .eq("tournament_id", params.id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(teams);
}
