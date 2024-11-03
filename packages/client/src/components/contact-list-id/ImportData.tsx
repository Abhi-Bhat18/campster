"use client";
import React, { useCallback, useState } from "react";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useImportContactsMutation } from "@/lib/features/contact-list/contactListApis";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const importContactsSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file?.type === "text/csv", {
      message: "Only CSV files are allowed",
    })
    .refine((file) => file?.size > 0, {
      message: "File cannot be empty",
    }),
});

const ImportData = () => {
  const form = useForm<z.infer<typeof importContactsSchema>>({
    resolver: zodResolver(importContactsSchema),
  });

  const [uploadContacts, { isLoading }] = useImportContactsMutation();
  const pathName = usePathname();
  const id = pathName.split("/").at(-1);

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof importContactsSchema>) => {
    try {
      const formData = new FormData();

      formData.append("contact_list_id", id!);
      formData.append("file", values.file);

      await uploadContacts(formData).unwrap();
      toast.success("Contact importated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        form.setValue("file", acceptedFiles[0], {
          shouldValidate: true,
        });
        setSelectedFileName(file.name);
      }
    },

    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <p>Import Data</p>
          <div>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-6 rounded-md h-[200px] flex justify-center items-center cursor-pointer ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input name="file" {...getInputProps()} />
              {isDragActive ? (
                <p className="text-center">Drop the files here...</p>
              ) : (
                <p className="text-center">
                  Drag and drop a CSV file here, or click to select one
                </p>
              )}
            </div>
            {selectedFileName && (
              <p className="mt-2 text-center text-gray-600">
                Selected file: {selectedFileName}
              </p>
            )}
          </div>
          <div className="space-y-5">
            <p>Instructions</p>
            <p>
              Upload a CSV file or a ZIP file with a single CSV file in it to
              bulk import subscribers. The CSV file should have the following
              headers with the exact column names. attributes (optional) should
              be a valid JSON string with double escaped quotes.
            </p>
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <>Importing...</> : "Import"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ImportData;
