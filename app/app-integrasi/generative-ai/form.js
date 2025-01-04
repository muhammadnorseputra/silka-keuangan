"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitPrompt } from "./action";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isLoading={pending}
      isDisabled={pending}
      color="primary">
      Kirim
    </Button>
  );
}

export function FormAI() {
  const [response, setResponse] = useState(null);
  const [countResult, setCountResult] = useState(null);

  async function handleSubmit(formData) {
    const result = await submitPrompt(formData);
    if (result.success === true) {
      setResponse(result.response);
      setCountResult(result.countResult);
      toast.success(`OK`, {
        id: "Toaster",
      });
      return;
    }
    toast.error(result.response, {
      id: "Toaster",
    });
  }

  return (
    <form action={handleSubmit} className="w-full max-w-3xl">
      <div className="mb-4">
        <label
          htmlFor="prompt"
          className="text-gray-700 dark:text-gray-100 text-sm font-bold mb-2 flex align-middle justify-between">
          <span>Enter your prompt:</span>{" "}
          <span>Total Token : {countResult}</span>
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={4}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ketik apa yang anda ingin tanyakan disini ..."
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <SubmitButton />
      </div>
      {response && (
        <div className="mt-4 mb-4 p-4 bg-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            AI Response:
          </h2>
          <div className=" prose prose-neutral prose-lg">
            <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
          </div>
        </div>
      )}
    </form>
  );
}
