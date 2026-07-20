import EditProfile, {
  type ProfileFormData,
} from "@/customComponents/editProfile";
import UserCard from "@/customComponents/userCard";
import type { FeedUser } from "@/features/feed/feedSlice";
import { setUser } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

function Profile() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const saveProfile = async () => {
    try {
      const res = await api.patch("/profile/edit", formData);
      dispatch(setUser(res.data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Profile udpate failed, try again");
    }
  };

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    age: user.age?.toString() ?? "",
    gender: user.gender ?? "",
    photoURL: user.photoURL ?? "",
    about: user.about ?? "",
    skills: user.skills ?? [],
  });

  // Live preview — built from the same state the form edits, so the card
  // updates as the user types.
  const previewUser: FeedUser = {
    id: user.id,
    email: user.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    age: formData.age ? Number(formData.age) : undefined,
    gender: formData.gender,
    photoURL: formData.photoURL,
    about: formData.about,
    skills: formData.skills,
  };

  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-8 p-4 lg:flex-row">
      <div className="w-full max-w-3xl">
        <EditProfile
          formData={formData}
          setFormData={setFormData}
          saveProfile={saveProfile}
        />
      </div>
      <div className="flex justify-center">
        <UserCard user={previewUser} />
      </div>
    </div>
  );
}
export default Profile;
