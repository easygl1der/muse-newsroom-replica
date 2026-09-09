export function downloadMedia(src: string, filename: string) {
  const url = `/api/download?src=${encodeURIComponent(src)}&filename=${encodeURIComponent(filename)}`;
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
