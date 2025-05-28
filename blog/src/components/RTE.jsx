import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="inline-block mb-1 pl-1 text-gray-700">{label}</label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="bg1s1tit1j30nfkiy8r19zpbyhqx6206j6zvm62mxwtqye4o"
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                // REMOVE 'paste' from here
                "code", // (if you intend for this to be the source code view plugin)
                "help",
                "wordcount",
                
              ],
              toolbar:
                "undo redo | styleselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | link image | \
       preview media fullpage | insertdatetime | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              file_picker_types: "image",
            }}
            onEditorChange={(content) => {
              onChange(content);
            }}
          />
        )}
      />
    </div>
  );
}
