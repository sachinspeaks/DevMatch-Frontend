import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { setConnections } from "@/features/connections/connectionSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Connections() {
  const dispatch = useAppDispatch();
  const userConnections = useAppSelector((state) => state.connections);
  const [loading, setLoading] = useState(true);
  const fetchConnections = async () => {
    try {
      const res = await api.get("/user/connections");
      const connections = res.data;
      dispatch(setConnections(connections));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Hearts
          height={80}
          width={80}
          color="var(--color-primary)"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4 text-xl font-light">
        <h1>Connections</h1>
      </div>
      {userConnections && userConnections.length ? (
        <div className="flex w-full max-w-md flex-col gap-3">
          {userConnections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
            >
              <Avatar className="size-10">
                <AvatarImage
                  src={connection.photoURL}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  {(connection.firstName?.[0] ?? "") +
                    (connection.lastName?.[0] ?? "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">
                  {connection.firstName} {connection.lastName}
                </span>
                {connection.about && (
                  <span className="truncate text-xs text-muted-foreground">
                    {connection.about}
                  </span>
                )}
              </div>
              <Link
                to={`/chat/${connection.id}`}
                state={{
                  chatPartnerName:
                    `${connection.firstName} ${connection.lastName}`.trim(),
                }}
              >
                <Button className="ml-auto">Chat</Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h2>No Connections Found</h2>
      )}
    </div>
  );
}
export default Connections;
