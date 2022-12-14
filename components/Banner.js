import { useEffect } from "react";
import { DEV_MODE } from "@/lib/constants";

export default function Banner({ client, slot, format, layout, full }) {
  useEffect(() => {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: `block`, marginLeft: `auto`, marginRight: `auto` }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layoutKey={layout}
      data-full-width-repsonsive={full ? true : false}
      {...(DEV_MODE || process.env.NODE_ENV === "development"
        ? { "data-adtest": on }
        : null)}
    ></ins>
  );
}
