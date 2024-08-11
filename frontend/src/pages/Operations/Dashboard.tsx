import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import handlePromise from "@/utils/promise";
import ContractService from "@/services/ContractService";
import { useAppSelector } from "@/stores/hooks";
import OperationFilters from "./OperationFilters";
import SelectPolicyModal from "./SelectPolicyModal";
import ContractData from "./contractData/main";

function Main() {
    const { t } = useTranslation();
    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const { company } = useAppSelector((state) => state.settings)

    const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
    const [selectedContract, setSelectedContract] = useState<any>(null);

    const [selectContractModal, setSelectContractModal] = useState<boolean>(false);

    const getContracts = async (params: any) => {
        setLoading(true)
        const [error, response, data] = await handlePromise(ContractService.getContracts(params));
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? "Error while retrieving contracts",
            })
        }

        if (data.length === 1) {
            setSelectedContract(data[0])
        } else {
            setFilteredContracts(data)
        }
    }

    const onFilter = async (data: any) => {
        const toSend = {
            dni: data?.dni ?? null,
            code: data?.code ?? null,
            requestCode: data?.requestCode ?? null,
            ccc: data?.ccc ?? null,
            operationType: data?.operationType ?? null,
            reconcile: data?.reconcile ?? null,
            company: company?.CompaniaId ?? null,
        }

        if (toSend.dni === "") {
            toSend.dni = null
        }

        if (toSend.code === "") {
            toSend.code = null
        }

        if (toSend.requestCode === "") {
            toSend.requestCode = null
        }

        if (toSend.ccc === "") {
            toSend.ccc = null
        }

        if (toSend.operationType === "") {
            toSend.operationType = null
        }

        if (toSend.reconcile === "") {
            toSend.reconcile = null
        }

        setSelectedContract(null)

        await getContracts(toSend)
    }

    useEffect(() => {
        if (filteredContracts.length > 1) {
            setSelectContractModal(true)
        }
    }, [filteredContracts])

    return (
        <>
            <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">{t("operationsSearch")}</h2>
            </div>
            <div className="p-3 mt-4 intro-y box">
                <OperationFilters onFilter={onFilter} />
                <hr />
                {
                    selectedContract ? (
                        <ContractData selectedContract={selectedContract} setSelectedContract={setSelectedContract} />
                    ) : (
                        <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                            <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                            {t("noPolicyLoaded")}
                        </Alert>
                    )
                }
            </div>
            <SelectPolicyModal
                show={selectContractModal}
                setShow={setSelectContractModal}
                filteredContracts={filteredContracts}
                selectedContract={selectedContract}
                setSelectedContract={setSelectedContract}
            />
        </>
    );
}

export default Main;