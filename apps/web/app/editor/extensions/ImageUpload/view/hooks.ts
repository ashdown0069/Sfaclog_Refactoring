import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImageUploadToFirebase } from '@/lib/firebase';
// import { API } from '@/editor/lib/api';
export const useUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true);
      try {
        const imageUrl = await ImageUploadToFirebase(file);
        // const url = await API.uploadImage()
        onUpload(imageUrl);
      } catch (errPayload: any) {
        const error =
          errPayload?.response?.data?.error || 'Something went wrong';
        toast.error(error);
      }
      setLoading(false);
    },
    [onUpload],
  );

  return { loading, uploadFile };
};

export const useFileUpload = () => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = useCallback(() => {
    fileInput.current?.click();
  }, []);

  return { ref: fileInput, handleUploadClick };
};
