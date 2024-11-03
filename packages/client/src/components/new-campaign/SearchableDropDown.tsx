"use client";
import React, { useState, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { campaignSchema } from "./CampaignForm";
import { Input } from "@/components/ui/input";

interface Props {
  formLabel: string;
  name: any;
  form: UseFormReturn<z.infer<typeof campaignSchema>>;
  placeholder: string;
  useSearchQuery: (searchTerm: string, options?: { skip: boolean }) => any;
  defaultName?: string;
}

const SearchableDropDown: React.FC<Props> = ({
  form,
  formLabel,
  name,
  placeholder,
  useSearchQuery,
  defaultName,
}) => {
  const [inputValue, setInputValue] = useState(defaultName ? defaultName : "");

  const [open, setOpen] = useState(false);

  let { data, isLoading, error } = useSearchQuery(inputValue, {
    skip: inputValue === "",
  });

  const handleInput = (value: string) => {
    setInputValue(value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-5 w-full grid items-center">
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <div>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
              />
              {open && data?.length > 0 && (
                <div className="py-2 relative bg-card z-50">
                  <div className="absolute bg-card top-0 left-0 right-0 p-2">
                    {data.map((item: { name: string; id: string }) => (
                      <div
                        className="p-2 hover:bg-muted rounded-md cursor-pointer"
                        key={item.id}
                        onClick={() => {
                          console.log("Setting the value");
                          setInputValue(item.name);
                          form.setValue(name, item.id);
                          setOpen(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                    {data.length == 0 && (
                      <div className="text-white text-2xl">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchableDropDown;
