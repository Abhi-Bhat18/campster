import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StylesPanel from '../InspectorDrawer/StylesPanel';
import ConfigurationPanel from '../InspectorDrawer/ConfigurationPanel';

const StylesNConfiguratoinTabs = () => {
  return (
    <Tabs defaultValue='styles'>
      <TabsList>
        <TabsTrigger value="styles">Styles</TabsTrigger>
        <TabsTrigger value="configuration"> Configuration </TabsTrigger>
      </TabsList>
      <TabsContent value="styles" className='bg-card rounded-md'>
        <StylesPanel />
      </TabsContent>
      <TabsContent value="configuration" className='bg-card rounded-md'>
        <ConfigurationPanel/>
      </TabsContent>
    </Tabs>
  );
}

export default StylesNConfiguratoinTabs