import { icons } from "@codeconnect/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@codeconnect/ui/select";

export function LanguageSelector() {
  return (
    <Select>
      <SelectTrigger className="h-8 w-[160px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="max-h-48">
        <SelectItem value="js">
          <span className="flex items-center gap-3">
            <icons.Javascript className="size-4" />
            Javascript
          </span>
        </SelectItem>
        <SelectItem value="ts">
          <span className="flex items-center gap-3">
            <icons.Typescript className="size-4" />
            Typescript
          </span>
        </SelectItem>
        <SelectItem value="py">
          <span className="flex items-center gap-3">
            <icons.Python className="size-4" />
            Python
          </span>
        </SelectItem>
        <SelectItem value="c">
          <span className="flex items-center gap-3">
            <icons.C className="size-4" />C
          </span>
        </SelectItem>
        <SelectItem value="cs">
          <span className="flex items-center gap-3">
            <icons.CSharp className="size-6" />
            C#
          </span>
        </SelectItem>
        <SelectItem value="cpp">
          <span className="flex items-center gap-3">
            <icons.Cpp className="size-4" />
            C++
          </span>
        </SelectItem>
        <SelectItem value="rb">
          <span className="flex items-center gap-3">
            <icons.Ruby className="size-4" />
            Ruby
          </span>
        </SelectItem>
        <SelectItem value="scala">
          <span className="flex items-center gap-3">
            <icons.Scala className="size-4" />
            Scala
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
