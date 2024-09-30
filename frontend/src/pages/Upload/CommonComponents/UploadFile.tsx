import InputField from '@/custom-components/FormElements/InputField';
import ParentModal from '@/custom-components/Modals/ParentModal';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import handlePromise from '@/utils/promise';
import * as yup from 'yup';
import LoadService from '@/services/LoadService';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   onRefresh: () => void;
   uploadType: string;
};

const UploadFile = ({ show, setShow, onRefresh, uploadType }: Props) => {
   const { t } = useTranslation();

   const [, setAlert] = useContext(AlertContext);
   const [loading, setLoading] = useContext(LoadingContext);

   const uploadSchema = yup.object().shape({
      file: yup.mixed().required(t('errors.required') ?? ''),
   });

   const {
      control,
      reset,
      formState: { isValid },
      getValues,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(uploadSchema),
   });

   const handleSubmit = async () => {
      const form: any = getValues();

      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('type', uploadType);
      console.log(form.file);
      console.log(uploadType);

      setLoading(true);
      const [error, response] = await handlePromise(LoadService.uploadFile(formData));
      setLoading(false);
      if (!response.ok) {
         return setAlert({
            type: 'error',
            show: true,
            text: error ?? 'Upload failed',
         });
      }

      setAlert({
         type: 'success',
         show: true,
         text: 'Uploaded successfully',
      });

      setShow(false);
      onRefresh();
   };

   useEffect(() => {
      if (show) reset({ file: undefined });
   }, [show]);

   return (
      <ParentModal
         size="sm"
         title={t('uploadDetail')}
         show={show}
         setShow={setShow}
         submitButtonText={t('upload')}
         disableSubmitButton={!isValid || loading}
         handleOnSubmit={handleSubmit}
         disableCancelButton={loading}
         hiddenCloseMenuIcon={loading}
      >
         <div className="flex w-full justify-center items-center">
            <InputField
               type="file"
               control={control}
               name="file"
               label="uploadFile"
               placeholder="Suba el archivo ..."
               accept=".csv, .txt, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
         </div>
      </ParentModal>
   );
};

export default UploadFile;
