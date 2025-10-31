// 이미지 경로를 File 객체로 변환하는 함수
export default async function convertAssetToFile({
  path,
}: {
  path: string;
}): Promise<File> {
  const response = await fetch(path);
  const blob = await response.blob();
  const filename = path.split("/").pop() ?? "";
  return new File([blob], filename, { type: blob.type });
}
