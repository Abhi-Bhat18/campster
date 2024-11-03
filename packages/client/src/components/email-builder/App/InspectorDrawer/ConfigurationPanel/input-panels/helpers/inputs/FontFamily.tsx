import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { FONT_FAMILIES } from "../../../../../../documents/blocks/helpers/fontFamily";

type NullableProps = {
  label: string;
  onChange: (value: null | string) => void;
  defaultValue: null | string;
};

export function NullableFontFamily({
  label,
  onChange,
  defaultValue,
}: NullableProps) {
  return (
    <Select
      defaultValue={FONT_FAMILIES[0].key}
      onValueChange={(val) => {
        console.log("Val", val);
        onChange(val);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {FONT_FAMILIES.map((ff, index) => {
          return (
            <SelectItem key={index} value={ff.key}>
              {ff.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
