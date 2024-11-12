import { getImages } from "@/api/asset-apis";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function NovaroImage({
  sourceId,
  ...restProps
}: { sourceId: string } & React.HTMLProps<HTMLImageElement>) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    getImages({ sourceId }).then((res) => {
      if (res.data.length) {
        setImageSrc(baseUrl + "/" + res.data[0].path);
      }
    });
  }, [sourceId]);
  return imageSrc ? <img src={imageSrc} {...restProps} /> : null;
}
