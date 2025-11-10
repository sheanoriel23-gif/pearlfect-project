import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({ providedIn: 'root' })
export class FireStorageService {
  private storage = getStorage();

  /** Uploads profile image and returns its download URL */
  async uploadProfileImage(uid: string, file: File): Promise<string> {
    try {
      const storageRef = ref(this.storage, `profile_images/${uid}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    }
  }
}
