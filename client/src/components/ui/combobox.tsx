import * as React from "react";

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

interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  data: categoryName[] | undefined;
  title: string;
  onChange: any;
}

export function Combobox({ data, title, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<categoryName | null>(null);

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
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {data &&
                  data.map((item) => (
                    <CommandItem
                      key={item.name}
                      value={item.name}
                      onSelect={(value) => {
                        onChange(value);
                        setSelected(
                          data?.find((priority) => priority.name === value) ||
                            null
                        );
                        setOpen(false);
                      }}
                    >
                      <span>{item.name}</span>
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
