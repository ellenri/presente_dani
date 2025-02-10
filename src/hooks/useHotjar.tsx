/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import { useEffect } from "react";

declare global {
  interface Window {
    hj?: (...args: any[]) => void;
    _hjSettings?: { hjid: number; hjsv: number };
  }
}

const useHotjar = (hotjarId?: number, hotjarVersion: number = 6): void => {
  useEffect(() => {
    if (typeof window === "undefined" || !hotjarId) return;

    if (!window.hj) {
      (function(h: any, o: any, t: string, j: string, a?: any, r?: any) {
        h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments); };
        h._hjSettings = { hjid: hotjarId, hjsv: hotjarVersion };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script"); 
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    }
  }, [hotjarId, hotjarVersion]);
};

export default useHotjar;
