import UserCard from "@/customComponents/userCard";
import {
  removeUserFromFeed,
  setFeed,
  type FeedUser,
} from "@/features/feed/feedSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import TinderCard from "react-tinder-card";
import { useEffect, useRef } from "react";

type UserReqStatus = "ignore" | "interested";

function Feed() {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((state) => state.feed);

  // Imperative swipe handles, keyed by user id. Kept in a ref (not state) so
  // the map survives re-renders and isn't rebuilt when the feed shrinks.
  const cardRefs = useRef<Map<string, any>>(new Map());
  const setCardRef = (id: string, el: any) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  };

  const getFeed = async () => {
    const res = await api.get("/feed");
    dispatch(setFeed(res.data));
  };
  useEffect(() => {
    getFeed();
  }, []);

  const handleSentRequest = async (status: UserReqStatus, id: string) => {
    try {
      await api.post(`/request/send/${status}/${id}`);
    } catch (error) {
      // The card has already animated away, so the deck no longer matches the
      // backend. Refetch so the user reappears instead of silently vanishing.
      console.error(`Failed to send "${status}" request for ${id}`, error);
      getFeed();
    }
  };

  // Fires for both drag-swipes and button-triggered swipes.
  const swiped = (dir: string, user: FeedUser) => {
    handleSentRequest(dir === "right" ? "interested" : "ignore", user.id);
  };

  // Once the card animates fully off-screen, drop it from the deck so it
  // doesn't linger in the DOM at the edge of the page.
  const leftScreen = (id: string) => {
    cardRefs.current.delete(id);
    dispatch(removeUserFromFeed(id));
  };

  // Buttons swipe the top card (last in the array = rendered on top).
  const swipe = async (dir: "left" | "right") => {
    const top = feed[feed.length - 1];
    if (!top) return;
    await cardRefs.current.get(top.id)?.swipe(dir);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden">
      <div className="relative h-130 w-80">
        {feed.map((user) => (
          <TinderCard
            ref={(el) => setCardRef(user.id, el)}
            key={user.id}
            className="absolute inset-0"
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, user)}
            onCardLeftScreen={() => leftScreen(user.id)}
          >
            <UserCard user={user} />
          </TinderCard>
        ))}
      </div>

      {feed.length > 0 ? (
        <div className="flex gap-4">
          <Button size="lg" variant="secondary" onClick={() => swipe("left")}>
            Ignore
          </Button>
          <Button size="lg" onClick={() => swipe("right")}>
            Interested
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground">No more users in your feed.</p>
      )}
    </div>
  );
}
export default Feed;
