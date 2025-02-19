"use client";

import { Button, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import MapCard from "./map-card";
import { OsuMapData } from "@/types/map-data";

interface AddMapFormProps {
  mappoolId: number;
  tournamentId: number;
  onMapAdded: () => void;
}

export default function AddMapForm({
  mappoolId,
  tournamentId,
  onMapAdded,
}: AddMapFormProps) {
  const [mapId, setMapId] = useState("");
  const [prefix, setPrefix] = useState("NM");
  const [mapNumber, setMapNumber] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapData, setMapData] = useState<OsuMapData | null>(null);

  const fetchMapData = async () => {
    if (!mapId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/osu/get-map-data?id=${mapId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch map data");
      }

      setMapData(data.mapData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch map data",
      );
      setMapData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapId || !prefix || !mapNumber) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tournament/mappool/add-map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId,
          mappoolId,
          mapId: Number(mapId),
          prefix,
          mapNumber: Number(mapNumber),
          comment: comment || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add map");
      }

      // Reset form
      setMapId("");
      setMapNumber("");
      setComment("");
      setMapData(null);
      onMapAdded();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add map");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <Label htmlFor="mapId">Map ID</Label>
            <TextInput
              id="mapId"
              type="number"
              value={mapId}
              onChange={(e) => setMapId(e.target.value)}
              placeholder="Enter map ID"
              required
            />
          </div>
          <div>
            <Label htmlFor="prefix">Prefix</Label>
            <Select
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              required
            >
              <option value="NM">NoMod</option>
              <option value="HD">Hidden</option>
              <option value="HR">HardRock</option>
              <option value="DT">DoubleTime</option>
              <option value="FM">FreeMod</option>
              <option value="TB">Tiebreaker</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="mapNumber">Map Number</Label>
            <TextInput
              id="mapNumber"
              type="number"
              value={mapNumber}
              onChange={(e) => setMapNumber(e.target.value)}
              placeholder="Enter map number"
              required
            />
          </div>
          <div>
            <Label htmlFor="comment">Comment (Optional)</Label>
            <TextInput
              id="comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            color="gray"
            onClick={fetchMapData}
            disabled={!mapId || isLoading}
          >
            Preview Map
          </Button>
          <Button type="submit" disabled={isLoading || !mapData}>
            Add Map
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </form>

      {mapData && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold dark:text-white">
            Preview
          </h3>
          <MapCard
            mapId={mapId}
            identifier={`${prefix}${mapNumber}`}
            comment={comment}
            pooler="You"
            mapData={mapData}
          />
        </div>
      )}
    </div>
  );
}
