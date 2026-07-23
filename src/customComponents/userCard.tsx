import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import type { FeedUser } from "@/features/feed/feedSlice";
import maleAvatar from "@/assets/male.png";
import femaleAvatar from "@/assets/female.png";

function UserCard({ user }: { user: FeedUser }) {
  const { firstName, lastName, age, about, photoURL, skills, gender } = user;

  const fallbackAvatar =
    gender?.toLowerCase() === "female" ? femaleAvatar : maleAvatar;

  return (
    <Card className="relative w-80 h-130 overflow-hidden rounded-3xl shadow-xl select-none">
      <img
        src={photoURL || fallbackAvatar}
        alt={`${firstName} ${lastName}`}
        draggable={false}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute bottom-0 w-full p-6 text-white">
        <h2 className="text-3xl font-bold">
          {firstName} {lastName}
          {age ? `, ${age}` : ""}
        </h2>

        {about && <p className="mt-2 text-sm text-gray-200">{about}</p>}

        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
export default UserCard;
