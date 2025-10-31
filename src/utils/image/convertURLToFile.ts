// utils/convertURLToFile.ts
export async function convertURLToFile(
  imageUrl: string,
  fileName?: string,
): Promise<File> {
  try {
    // 1. Next.js API Route로 proxy 요청
    const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image via proxy: ${response.statusText}`,
      );
    }

    // 2. Blob으로 변환
    const blob = await response.blob();

    // 3. File 객체 생성
    const name = fileName || imageUrl.split("/").pop() || "image";
    const file = new File([blob], name, { type: blob.type });

    return file;
  } catch (error) {
    console.error(error);
    throw error;
  }
}