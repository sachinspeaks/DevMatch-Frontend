import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { removeRequest, setRequests } from "@/features/requests/requestSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { toast } from "sonner";

function Requests() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.requests);
  const [loading, setLoading] = useState(true);
  const fetchRequests = async () => {
    try {
      const res = await api.get("/user/requests/received");
      const requests = res.data.connectionRequests;
      dispatch(setRequests(requests));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (
    requestId: string,
    status: "accepted" | "rejected",
  ) => {
    try {
      await api.post(`/request/review/${status}/${requestId}`);
      dispatch(removeRequest(requestId));
      toast.success(
        status === "accepted" ? "Request accepted!" : "Request rejected.",
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchRequests();
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
        <h1>Requests</h1>
      </div>
      {requests && requests.length ? (
        <div className="flex w-full max-w-md flex-col gap-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
            >
              <Avatar className="size-12">
                <AvatarImage
                  src={request.fromUser.photoURL}
                  alt={`${request.fromUser.firstName} ${request.fromUser.lastName}`}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  {(request.fromUser.firstName?.[0] ?? "") +
                    (request.fromUser.lastName?.[0] ?? "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">
                  {request.fromUser.firstName} {request.fromUser.lastName}
                </span>
                {request.fromUser.about && (
                  <span className="truncate text-xs text-muted-foreground">
                    {request.fromUser.about}
                  </span>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  size="sm"
                  onClick={() => reviewRequest(request.id, "accepted")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => reviewRequest(request.id, "rejected")}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No Requests Found</h2>
      )}
    </div>
  );
}
export default Requests;
