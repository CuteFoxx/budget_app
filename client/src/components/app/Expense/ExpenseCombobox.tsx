import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categoryName } from "@/types/CategoryName";
import { useSelector } from "react-redux";
import { RootState } from "@/state/Store";

interface ExpenseComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  data: categoryName[] | undefined;
  title: string;
  onChange: any;
  noResultsFound: (arg: string) => void;
}

export function ExpenseCombobox({
  data,
  title,
  onChange,
  noResultsFound,
}: ExpenseComboboxProps) {
  const categories = useSelector((state: RootState) => state.category.items);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<categoryName | null>(null);
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center space-x-4 gap-2">
      <p className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive-foreground capitalize  w-full pl-2">
        {title}
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start flex-0 grow-1 min-h-9"
          >
            {selected ? <>{selected.name}</> : <>+ Set {title}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Enter category name..."
              value={query}
              onInput={(e) => {
                const taget = e.target as HTMLInputElement;
                setQuery(taget.value);
              }}
            />
            <CommandList>
              <CommandEmpty className="p-4">
                <Button onClick={() => noResultsFound(query)} className="p-2">
                  Create: {query}
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {query.length > 0 &&
                  !categories.find((item) =>
                    item.name != null
                      ? item?.name.toLowerCase() === query.toLowerCase().trim()
                      : false
                  ) && (
                    <Button
                      onClick={() => noResultsFound(query)}
                      className="m-2"
                    >
                      Create: {query}
                    </Button>
                  )}
                {data &&
                  data.map((item) => (
                    <CommandItem
                      key={String(Date.now()) + String(item?.name)}
                      value={item?.name}
                      onSelect={(value) => {
                        onChange(value);
                        setSelected(
                          data?.find((priority) => priority?.name === value) ||
                            null
                        );
                        setOpen(false);
                      }}
                    >
                      <span>{item?.name ?? ""}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
