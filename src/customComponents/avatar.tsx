import { LogOut, Pencil, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks";
import { clearUser } from "@/features/user/userSlice";
import { api } from "@/lib/api";
import { toast } from "sonner";

function UserAvatar({
  firstName,
  lastName,
  imageSrc,
  className,
  onChangeDp,
}: {
  firstName: string;
  lastName: string;
  imageSrc?: string;
  className?: string;
  onChangeDp?: () => void;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      dispatch(clearUser());
      navigate("/login");
      toast.success("Successfully Logged Out.");
    } catch (error) {
      toast.error("Logout Failed, Try again.");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm">Welcome, {firstName}</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <Avatar
            className={cn(
              "size-10 cursor-pointer mr-2 after:border-foreground/30",
              className,
            )}
          >
            <AvatarImage
              src={imageSrc}
              alt={`${firstName} ${lastName}`}
              referrerPolicy="no-referrer"
              onError={(e) => console.error("Avatar image failed to load", e)}
            />
            <AvatarFallback>
              {firstName ? `${firstName[0] + lastName[0]}` : "--"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-44 bg-background p-1.5"
        >
          <DropdownMenuItem
            className="px-2 py-1.5 text-sm"
            onClick={() => navigate("/profile")}
          >
            <Pencil />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="py-1 text-sm" onClick={onChangeDp}>
            <ImageIcon />
            Change DP
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="px-2 py-1.5 text-sm"
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserAvatar;
