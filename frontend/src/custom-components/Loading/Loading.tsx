import { useContext } from 'react';
import LoadingIcon from '@/components/Base/LoadingIcon';
import { LoadingContext } from '../../utils/Contexts/LoadingContext';

const Loading = () => {
   const [loading] = useContext(LoadingContext);

   return (
      <div>
         {loading && (
            <div className="absolute z-[9999999999999999999] bg-gray-100 bg-opacity-50 w-full h-full top-0 left-0">
               <LoadingIcon
                  icon="loadingSplash"
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
               />
            </div>
         )}
      </div>
   );
};

export default Loading;
