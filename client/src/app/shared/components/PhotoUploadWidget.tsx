import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from "react-cropper";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};
export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
  const [files, setFiles] = useState<object & { preview?: string }[]>([]);
const cropperRef = useRef<ReactCropperElement>(null);
useEffect(() => {
  return () => {
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }
}, [files])
  const [isDragActive, setIsDragActive] = useState(false);

  const processFiles = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file as Blob),
        })
      )
    );
  }, []);
  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob(blob => {
        uploadPhoto(blob as Blob);
    })}, [uploadPhoto]);


  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    },
    [processFiles]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(Array.from(e.target.files));
      }
    },
    [processFiles]
  );

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <Grid container spacing={3}>
      {/* Step 1 - Add Photo */}
      <Grid size={{ xs: 4 }}>
        <Typography variant="overline" color="secondary">
          Step 1 - Add photo
        </Typography>
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          component="label"
          sx={{
            display: "block",
            border: "dashed 3px #eee",
            borderColor: isDragActive ? "green" : "#eee",
            borderRadius: "5px",
            height: "280px",
            textAlign: "center",
            paddingTop: "30px",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <CloudUpload sx={{ fontSize: 80 }} />
          <Typography variant="h5">Drop image here</Typography>
        </Box>
      </Grid>

      {/* Step 2 - Resize Image (Instructor's Cropper) */}
      <Grid size={{ xs: 4 }}>
        <Typography variant="overline" color="secondary">
          Step 2 - Resize image
        </Typography>
        {files[0]?.preview && (
          <Cropper
            src={files[0]?.preview}
            style={{ height: 300, width: "90%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            background={false}
            ref={cropperRef}
          />
        )}
      </Grid>

      {/* Step 3 - Preview & Upload */}
      <Grid size={{ xs: 4 }}>
        {files[0]?.preview && (
          <>
           <Typography variant="overline" color="secondary">
          Step 3 - Preview & Upload
        </Typography>
        <div className="img-preview" style={{ width: "300%", minHeight: 300, overflow: "hidden" }} />
        <Button sx={{my:1 ,width:30}}variant="contained" color="secondary" onClick={onCrop} disabled={loading}>
          Upload
        </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}