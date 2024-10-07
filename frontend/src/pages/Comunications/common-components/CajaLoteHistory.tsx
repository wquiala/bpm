import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import { useTranslation } from 'react-i18next';

type Props = {
   selectedContract: any;
   control: any;
};

const CajaLoteHistory = ({ selectedContract, control }: Props) => {
   const { t } = useTranslation();

   return (
      <div className="box p-4 m-4 mb-2">
         <Disclosure>
            {({ open }) => (
               <>
                  <Disclosure.Button>
                     {open ? 'Ocultar historial de cajas y lotes' : 'Mostrar historial de cajas y lotes'}
                  </Disclosure.Button>
                  <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                     {selectedContract?.CajaLote && selectedContract?.CajaLote.length > 0 ? (
                        <div>
                           {selectedContract.CajaLote.map((comment: any, index: number) => (
                              <div key={comment.createdAt} className="flex items-center mb-4 box p-4">
                                 <div className="w-full">
                                    <div className="flex flex-col sm:flex-row justify-between mb-1">
                                       <div className="text-sm font-medium text-gray-900">
                                          Caja: {comment.Caja} - Lote: {comment.Lote}
                                       </div>
                                       <div className="text-sm text-gray-500">
                                          {new Date(comment.fechaCreacion).toLocaleDateString()}-
                                          {new Date(comment.fechaCreacion).toLocaleTimeString()}
                                       </div>
                                    </div>
                                    <hr />
                                    <div className="text-gray-700">{comment.Nota}</div>
                                    <div className="text-gray-700">{comment.Contrato}</div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                           <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" /> {t('noCommentsFound')}
                        </Alert>
                     )}
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
      </div>
   );
};

export default CajaLoteHistory;
