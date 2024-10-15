export const objetInspectElement = (obj: any) => {
   let withElement = false;
   for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
         const value = obj[key];
         if (value) {
            withElement = true;
         }
      }

      if (withElement) break;
   }

   return withElement;
};
