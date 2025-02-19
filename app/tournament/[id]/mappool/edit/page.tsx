"use client";

import { useParams, useRouter } from "next/navigation";
import { TournamentHeader } from "../../components/header";
import { useEffect, useState } from "react";
import MappoolSelector from "../components/mappool-selector";
import MapCardCompact from "../components/map-card-compact";
import { Button, Modal } from "flowbite-react";
import { useUser } from "@/providers/user-provider";
import { useToast } from "@/app/components/common/toast";
import { Database } from "@/types/supabase/types";
import { HiPlus, HiTrash } from "react-icons/hi2";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];

interface MapData {
  id: number;
  osu_map_id: number;
  map_number: number;
  comment: string;
  pooler: string;
  map_data: any;
}

interface MapPoolType {
  id: number;
  name: string;
  created_at: string;
  created_user_id: number;
  tournament_id: number;
  maps: Record<string, MapData[]>;
}

interface AddMapModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (mapId: string, comment?: string) => Promise<void>;
  prefix: string;
}

function AddMapModal({ show, onClose, onSubmit, prefix }: AddMapModalProps) {
  const [mapId, setMapId] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(mapId, comment);
      onClose();
      setMapId("");
      setComment("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add map");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Add map to {prefix}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Map ID
            </label>
            <input
              type="text"
              value={mapId}
              onChange={(e) => setMapId(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter map ID"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Comment (Optional)
            </label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Add a comment"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
          <div className="flex justify-end gap-2">
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Add Map
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function AddMapCard({
  prefix,
  onClick,
}: {
  prefix: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center">
        <HiPlus className="mb-1 size-6" />
        <span>Add a map to {prefix}</span>
      </div>
    </div>
  );
}

export default function MappoolEdit() {
  const { id } = useParams();
  const [mappools, setMappools] = useState<MapPoolType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [selectedPool, setSelectedPool] = useState<MapPoolType | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState<string>("");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`/api/tournament/get?id=${id}`);
        const data = await response.json();
        if (response.ok && data.data) {
          setTournament(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tournament:", error);
      }
    };

    fetchTournament();
  }, [id]);

  useEffect(() => {
    const fetchMappools = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/tournament/mappool?id=${id}`);
        const data = await response.json();
        setMappools(data);
        if (data.length > 0) {
          setSelectedPool(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch mappools:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMappools();
  }, [id]);

  const handlePoolSelect = (poolId: number) => {
    const pool = mappools.find((p) => p.id === poolId);
    setSelectedPool(pool || null);
  };

  const getPrefixOrder = (prefix: string): number => {
    const order = {
      NM: 0,
      HD: 1,
      HR: 2,
      DT: 3,
      FM: 4,
      TB: 5,
    };
    return order[prefix as keyof typeof order] ?? 999;
  };

  const sortMaps = (maps: MapData[]) => {
    return [...maps].sort((a, b) => a.map_number - b.map_number);
  };

  const handleAddMap = async (mapId: string, comment?: string) => {
    if (!selectedPool || !selectedPrefix) return;

    try {
      const maps = selectedPool.maps[selectedPrefix] || [];
      const nextMapNumber = maps.length + 1;

      const response = await fetch("/api/tournament/mappool/add-map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId: Number(id),
          mappoolId: selectedPool.id,
          mapId: Number(mapId),
          prefix: selectedPrefix,
          mapNumber: nextMapNumber,
          comment,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add map");
      }

      // Refresh mappools
      const refreshResponse = await fetch(`/api/tournament/mappool?id=${id}`);
      const data = await refreshResponse.json();
      setMappools(data);
      const updatedPool = data.find(
        (p: MapPoolType) => p.id === selectedPool.id,
      );
      setSelectedPool(updatedPool || null);

      showToast(`Successfully added map to ${selectedPrefix}`);
    } catch (error) {
      console.error("Failed to add map:", error);
      throw error;
    }
  };

  const handleDeleteMap = async (mapId: number, prefix: string) => {
    try {
      const response = await fetch(`/api/tournament/mappool/delete-map`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId: Number(id),
          mappoolId: selectedPool?.id,
          mapId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete map");
      }

      // Refresh mappools
      const refreshResponse = await fetch(`/api/tournament/mappool?id=${id}`);
      const data = await refreshResponse.json();
      setMappools(data);
      const updatedPool = data.find(
        (p: MapPoolType) => p.id === selectedPool?.id,
      );
      setSelectedPool(updatedPool || null);

      showToast(`Successfully deleted map from ${prefix}`);
    } catch (error) {
      console.error("Failed to delete map:", error);
      showToast("Failed to delete map");
    }
  };

  const canManageMappool =
    tournament &&
    user &&
    (tournament.host_id === Number(user.id) ||
      tournament.pooler_ids?.includes(Number(user.id)));

  if (!canManageMappool) {
    return (
      <div className="min-h-screen dark:bg-gray-800">
        <TournamentHeader />
        <div className="container mx-auto max-w-[95%] px-4 py-8">
          <div className="rounded-lg bg-red-100 p-4 text-red-900 dark:bg-red-900/30 dark:text-red-300">
            You do not have permission to manage this tournament&apos;s
            mappools.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />

      <div className="container mx-auto max-w-[95%] px-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="mb-4">
              {mappools.length > 0 && selectedPool && (
                <MappoolSelector
                  pools={mappools}
                  selectedPool={
                    mappools.find((p) => p.id === selectedPool.id) ||
                    mappools[0]
                  }
                  onPoolSelect={handlePoolSelect}
                />
              )}
            </div>

            {selectedPool && (
              <div className="space-y-8">
                {Object.entries(selectedPool.maps || {})
                  .sort(
                    ([prefixA], [prefixB]) =>
                      getPrefixOrder(prefixA) - getPrefixOrder(prefixB),
                  )
                  .map(([prefix, maps]) => {
                    const typedMaps = maps as MapData[];
                    return (
                      <div key={prefix} className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {prefix === "NM" && "NoMod"}
                          {prefix === "HD" && "Hidden"}
                          {prefix === "HR" && "HardRock"}
                          {prefix === "DT" && "DoubleTime"}
                          {prefix === "FM" && "FreeMod"}
                          {prefix === "TB" && "Tiebreaker"}
                        </h2>
                        <div className="grid gap-4">
                          {sortMaps(typedMaps).map((map) => (
                            <div key={map.id} className="relative">
                              <MapCardCompact
                                mapId={map.osu_map_id.toString()}
                                identifier={`${prefix}${map.map_number}`}
                                comment={map.comment}
                                pooler={map.pooler}
                                mapData={map.map_data}
                              />
                              <button
                                onClick={() => handleDeleteMap(map.id, prefix)}
                                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                              >
                                <HiTrash className="size-4" />
                              </button>
                            </div>
                          ))}
                          <AddMapCard
                            prefix={prefix}
                            onClick={() => {
                              setSelectedPrefix(prefix);
                              setShowAddModal(true);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </div>

      <AddMapModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddMap}
        prefix={selectedPrefix}
      />
    </div>
  );
}
