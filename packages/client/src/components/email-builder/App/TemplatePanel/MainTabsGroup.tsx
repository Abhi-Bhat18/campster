import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  useDocument,
} from "../../documents/editor/EditorContext";
import EditorBlock from "../../documents/editor/EditorBlock";
import { Reader } from "@usewaypoint/email-builder";
import HtmlPanel from "./HtmlPanel";
import JsonPanel from "./JsonPanel";

export default function MainTabsGroup() {
  const document = useDocument();

  return (
    <>
      <Tabs defaultValue="edit" className="w-full">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <EditorBlock id="root" />
        </TabsContent>
        <TabsContent value="preview">
          {" "}
          <Reader document={document} rootBlockId="root" />{" "}
        </TabsContent>
        <TabsContent value="html" className="bg-card">
          <HtmlPanel />
        </TabsContent>
        <TabsContent value="json" className="bg-card">
          <JsonPanel />
        </TabsContent>
      </Tabs>
    </>
  );
}
