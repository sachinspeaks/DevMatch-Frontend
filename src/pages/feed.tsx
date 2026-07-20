import UserCard from "@/customComponents/userCard";
import { setFeed } from "@/features/feed/feedSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { api } from "@/lib/api";
import { useEffect } from "react";

function Feed() {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((state) => state.feed);

  const getFeed = async () => {
    const res = await api.get("/feed");
    dispatch(setFeed(res.data));
  };
  useEffect(() => {
    getFeed();
  }, []);
  return <div>{feed.length && <UserCard user={feed[0]} />}</div>;
}
export default Feed;
