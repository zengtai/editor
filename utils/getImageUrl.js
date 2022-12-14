// test_path: beta1 / beta2

import { IMAGE_PATH, IMAGE_FORMAT } from "@/lib/constants";

export default function getImageUrl({ appid, format, path }) {
  return (
    IMAGE_PATH +
    `${format ? format : IMAGE_FORMAT}` +
    `/` +
    `${path ? path : ""}` +
    appid +
    `.${format ? format : IMAGE_FORMAT}`
  );
}
