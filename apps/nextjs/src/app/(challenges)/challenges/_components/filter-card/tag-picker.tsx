import { MultiSelect } from "@codeconnect/ui/multi-select";

import { api } from "~/trpc/react";

export function TagPicker({
  defaultValue,
  onChange,
}: {
  defaultValue: string[];
  onChange: (value: string[]) => void;
}) {
  const [tags] = api.tags.all.useSuspenseQuery();

  const options = tags.map((tag) => ({
    value: tag.slug,
    label: tag.name,
  }));

  return (
    <MultiSelect
      defaultValue={defaultValue}
      onValueChange={onChange}
      options={options}
      placeholder="Select tags"
    />
  );
}
