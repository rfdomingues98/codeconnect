"use client";

import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import { Card, CardContent, CardHeader, CardTitle } from "@codeconnect/ui/card";
import { Input } from "@codeconnect/ui/input";
import { MultiSelect } from "@codeconnect/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@codeconnect/ui/select";

import { filtersParsers } from "../../searchParams";

export function FilterCard() {
  const [filters, setFilters] = useQueryStates(filtersParsers);

  const handleSearchChange = useDebouncedCallback(
    async (value: string) =>
      await setFilters((prev) => ({ ...prev, title: value })),
    300,
  );
  const handleFilterChange = async (key: string, value: string | string[]) => {
    await setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="fixed h-fit w-96 shrink-0 rounded-lg">
      <CardHeader className="p-4">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 p-4">
        <Input
          placeholder="Search by name"
          defaultValue={filters.title}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <MultiSelect
          defaultValue={filters.tag}
          onValueChange={(value) => handleFilterChange("tag", value)}
          options={[
            { value: "array", label: "Array" },
            { value: "string", label: "String" },
            { value: "dynamic-programming", label: "Dynamic Programming" },
            { value: "graph", label: "Graph" },
          ]}
          placeholder="Select tags"
        />
        <MultiSelect
          defaultValue={filters.difficulty}
          onValueChange={(value) => handleFilterChange("difficulty", value)}
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          placeholder="Select difficulty"
        />
        <Select
          defaultValue={filters.language}
          onValueChange={(value) => handleFilterChange("language", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javaScript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={filters.sort}
          onValueChange={(value) => handleFilterChange("sort", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="easiest">Easiest</SelectItem>
            <SelectItem value="hardest">Hardest</SelectItem>
            <SelectItem value="most-popular">Most Popular</SelectItem>
            <SelectItem value="least-popular">Least Popular</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
