import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

type SidebarPanelProps = {
  title: string;
  children: React.ReactNode;
};

export default function BaseSidebarPanel({ title, children }: SidebarPanelProps) {
  return (
    <div className="p-4">
      <p className="mb-2 uppercase">{title}</p>
      <div className="space-y-5 mb-3 text-white">{children}</div>
    </div>
  );
}
