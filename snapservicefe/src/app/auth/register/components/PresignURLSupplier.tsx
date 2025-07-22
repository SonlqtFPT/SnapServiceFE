import React, { useState } from "react";
import axios from "axios";

export default function PresignUploadMulti() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const productId = 383;
  const supplierId = 1; // tạm hardcode, mày có thể lấy từ props hoặc context

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setMessage("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Chọn ít nhất 1 file đi bro!");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // 1. Lấy mảng contentTypes để gửi lên backend lấy presigned URLs
      const contentTypes = files.map((file) => file.type);

      // 2. Gọi API backend lấy presigned URLs
      const presignResponse = await axios.post(
        "https://localhost:7259/api/Upload/upload-images?isSupplierId=true",
        {
          productId,
          productSlug: "", // nếu cần
          supplierId: 1,
          categoryId: 0,
          contentTypes,
        }
      );

      const uploads = presignResponse.data.data.uploads; // array { url, key, imageUrl }

      // 3. Upload ảnh lên S3 song song
      await Promise.all(
        uploads.map((upload: any, idx: number) =>
          axios.put(upload.url, files[idx], {
            headers: { "Content-Type": files[idx].type },
          })
        )
      );

      // 4. Confirm với backend rằng ảnh đã upload xong, gửi array imageUrl
      const imageUrls = uploads.map((upload: any) => upload.imageUrl);
      await axios.post(
        `https://localhost:7259/api/Upload/${supplierId}/confirm-upload-supplier`,
        imageUrls
      );

      setMessage(`✅ Upload và confirm thành công ${files.length} ảnh!`);
      setFiles([]);
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
