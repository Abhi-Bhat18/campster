import React from "react";
import { Button } from "../ui/button";
import { useInvokeAPIKeysMutation } from "@/lib/features/apikeys/keysApis";
import { APIKey } from "./apiKeyColumns";
import { toast } from "sonner";

interface Props {
  selectedRows: APIKey[];
  closeDialog: () => void;
}

const InvokeAPIKey: React.FC<Props> = ({ selectedRows, closeDialog }) => {
  const [invokeAPIKeys, { isLoading }] = useInvokeAPIKeysMutation();

  const handleOnClick = async () => {
    try {
      // select only the apikeys
      const apiKeys = selectedRows.map((row) => row.api_key);
      const csv = apiKeys.join(",");
      console.log("CSV", csv);

      await invokeAPIKeys(csv).unwrap();
      toast.success("API Keys invoked");
      closeDialog();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-5">
      <p>The API keys will be invoked immediately</p>
      <div className="flex w-full justify-end">
        <Button
          disabled={isLoading}
          variant={"destructive"}
          onClick={handleOnClick}
        >
          {" "}
          {isLoading ? "Invoking" : "Invoke"}
        </Button>
      </div>
    </div>
  );
};

export default InvokeAPIKey;
