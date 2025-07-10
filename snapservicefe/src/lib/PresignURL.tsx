import React, { useState } from "react";
import axios from "axios";

export default function PresignUploadMulti() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // 1. Nhận nhiều file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setMessage("");
  };

  // 2. Upload nhiều ảnh
  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Chọn ít nhất 1 file đi bro!");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Chuẩn bị mảng contentType cho backend
      const contentTypes = files.map((file) => file.type);

      // Gọi API backend lấy array presigned URLs
      const presignResponse = await axios.post(
        "https://localhost:7259/api/Upload/upload-images", // giả sử endpoint này trả về mảng
        {
          productId: 255,
          productSlug: "samsung-galaxy-25", // truyền sau
          supplierId: 1,
          categoryId: 1,
          contentTypes, // mảng content types từng ảnh
        }
      );

      const uploads = presignResponse.data.data.uploads; // array { url, key, imageUrl }

      // Upload tất cả ảnh lên S3 song song
      await Promise.all(
        uploads.map((upload: any, idx: number) =>
          axios.put(upload.url, files[idx], {
            headers: { "Content-Type": files[idx].type },
          })
        )
      );

      setMessage(`✅ Upload thành công ${files.length} ảnh!`);
      setFiles([]);

      uploads.forEach((upload: any) => {
        window.open(upload.imageUrl, "_blank");
      });
    } catch (error: any) {
      setMessage("Lỗi upload: " + (error.message || "Unknown error"));
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload lên S3"}
      </button>

      {message && <p>{message}</p>}

      {/* Preview xíu cho vui */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {files.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={`preview-${idx}`}
            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6 }}
          />
        ))}
      </div>
    </div>
  );
}
