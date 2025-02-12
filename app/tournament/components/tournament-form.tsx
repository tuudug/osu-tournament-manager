"use client";

import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Database } from "@/types/supabase/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];
type TournamentInsert = Database["public"]["Tables"]["tournament"]["Insert"];

interface TournamentFormProps {
  tournament?: Tournament;
  onSubmit: (data: TournamentInsert) => Promise<void>;
  submitLabel: string;
}

export function TournamentForm({
  tournament,
  onSubmit,
  submitLabel,
}: TournamentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: TournamentInsert = {
      name: formData.get("name") as string,
      acronym: formData.get("acronym") as string,
      description: formData.get("description") as string,
      team_size: parseInt(formData.get("team_size") as string),
      vs_size: parseInt(formData.get("vs_size") as string),
      rank_limit_lower: formData.get("rank_limit_lower")
        ? parseInt(formData.get("rank_limit_lower") as string)
        : null,
      rank_limit_upper: formData.get("rank_limit_upper")
        ? parseInt(formData.get("rank_limit_upper") as string)
        : null,
    };

    try {
      await onSubmit(data);
      router.push("/tournament");
      router.refresh();
    } catch (error) {
      console.error("Error submitting tournament:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex max-w-2xl flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Tournament Name" className="text-gray-900 dark:text-white" />
        </div>
        <TextInput
          id="name"
          name="name"
          required
          defaultValue={tournament?.name}
          className="dark:border-gray-600 dark:bg-gray-700"
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="acronym" value="Tournament Acronym" className="text-gray-900 dark:text-white" />
        </div>
        <TextInput
          id="acronym"
          name="acronym"
          required
          defaultValue={tournament?.acronym}
          helperText="A short identifier for your tournament (e.g., OWC, MWC)"
          className="dark:border-gray-600 dark:bg-gray-700"
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" className="text-gray-900 dark:text-white" />
        </div>
        <Textarea
          id="description"
          name="description"
          rows={8}
          defaultValue={tournament?.description || ""}
          helperText="Supports markdown formatting"
          className="dark:border-gray-600 dark:bg-gray-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="team_size" value="Team Size" className="text-gray-900 dark:text-white" />
          </div>
          <TextInput
            id="team_size"
            name="team_size"
            type="number"
            min={1}
            required
            defaultValue={tournament?.team_size}
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="vs_size" value="VS Size" className="text-gray-900 dark:text-white" />
          </div>
          <TextInput
            id="vs_size"
            name="vs_size"
            type="number"
            min={1}
            required
            defaultValue={tournament?.vs_size}
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rank_limit_lower" value="Minimum Rank" className="text-gray-900 dark:text-white" />
          </div>
          <TextInput
            id="rank_limit_lower"
            name="rank_limit_lower"
            type="number"
            defaultValue={tournament?.rank_limit_lower || ""}
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="rank_limit_upper" value="Maximum Rank" className="text-gray-900 dark:text-white" />
          </div>
          <TextInput
            id="rank_limit_upper"
            name="rank_limit_upper"
            type="number"
            defaultValue={tournament?.rank_limit_upper || ""}
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          isProcessing={loading}
        >
          {submitLabel}
        </Button>
        <Button
          color="gray"
          type="button"
          disabled={loading}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
