
import { useDropzone } from "@uploadthing/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";


import { Button } from "../ui/button";
import { UploadCloudIcon } from "lucide-react";
import { convertFileToUrl } from "@/lib/utils";
type FileUploaderProps = {
    onFieldChange: (url: string) => void
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
  }
 
export function MultiUploader({imageUrl, onFieldChange, setFiles}:FileUploaderProps) {
 
 

 
const onDrop = useCallback((acceptedFiles:any) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })
  
  return (
    <div

    
      {...getRootProps()}
      className="flex-center bg-slate-50 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
         <UploadCloudIcon />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}