import { storage } from "@/services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadProfileImage(file, userId) {
  if (!file) throw new Error("파일이 없습니다.");
  if (!userId) throw new Error("사용자 ID가 없습니다.");

  const fileRef = ref(storage, `profiles/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);
}
