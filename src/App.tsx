import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy } from "lucide-react";

const getRandomChar = (chars: string) =>
  chars[Math.floor(Math.random() * chars.length)];

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [useAlphabets, setUseAlphabets] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecials, setUseSpecials] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    // console.log("Clicked");
    if (length < 4 || length > 32) {
      alert("Password length must be between 4 and 32");
      return;
    }
    let chars = "";
    if (useAlphabets)
      chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSpecials) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    if (!chars) {
      alert("Please select at least one character type");
      return;
    }

    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += getRandomChar(chars);
    }
    setPassword(pwd);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl text-center p-2 m-5">Password Generator</h1>
      <Card className="w-full max-w-md border-white border-2">
        <CardContent className="flex flex-col gap-6 p-6">
          <div className="relative border border-white rounded-md p-2 flex items-center justify-between">
            <span className="truncate rounded-full">
              {password || "Your password will appear here"}
            </span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex flex-col text-md">Length of Password</label>
            <Input
              type="number"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />

            <label className="flex items-center gap-2">
              <Checkbox
                checked={useAlphabets}
                onCheckedChange={(checked) => setUseAlphabets(checked === true)}
              />
              Alphabets
            </label>

            <label className="flex items-center gap-2">
              <Checkbox
                checked={useNumbers}
                onCheckedChange={(checked) => setUseNumbers(checked === true)}
              />
              Numbers
            </label>

            <label className="flex items-center gap-2">
              <Checkbox
                checked={useSpecials}
                onCheckedChange={(checked) => setUseSpecials(checked === true)}
              />
              Special Characters
            </label>

            <Button onClick={generatePassword} className="mt-2">
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
