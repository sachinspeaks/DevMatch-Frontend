import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, type Dispatch, type SetStateAction } from "react";

// Shared, editable form shape — lifted to the parent so a live preview
// (UserCard) can read the same values as the user types.
export interface ProfileFormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  photoURL: string;
  about: string;
  skills: string[];
}

interface EditProfileProps {
  formData: ProfileFormData;
  setFormData: Dispatch<SetStateAction<ProfileFormData>>;
  saveProfile: () => Promise<void>;
}

function EditProfile({ formData, setFormData, saveProfile }: EditProfileProps) {
  const { firstName, lastName, age, gender, photoURL, about, skills } =
    formData;
  const [skillInput, setSkillInput] = useState("");

  const update = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K],
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !skills.includes(skill)) {
      update("skills", [...skills, skill]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    update(
      "skills",
      skills.filter((s) => s !== skill),
    );
  };

  return (
    <Card>
      <CardHeader />
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary/50">
            <AvatarImage src={photoURL} />
            <AvatarFallback>
              {(firstName[0] ?? "") + (lastName[0] ?? "")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label>Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => update("age", e.target.value)}
              className="border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label>Photo URL</Label>
            <Input
              value={photoURL}
              onChange={(e) => update("photoURL", e.target.value)}
              className="border-primary"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>

          <Textarea
            rows={5}
            maxLength={200}
            placeholder="Tell everyone about yourself..."
            value={about}
            onChange={(e) => update("about", e.target.value)}
            className="border-primary focus-visible:border-secondary focus-visible:ring-secondary/50"
          />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={gender}
            onValueChange={(v) => update("gender", v ?? "")}
          >
            <SelectTrigger className="border-primary">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>

            <SelectContent className="p-2">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex flex-wrap items-center gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                className="cursor-pointer"
                onClick={() => removeSkill(skill)}
              >
                {skill} ✕
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              placeholder="Add a skill"
              className="border-primary"
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button variant="secondary" size="sm" onClick={addSkill}>
              + Add Skill
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button onClick={saveProfile}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
export default EditProfile;
