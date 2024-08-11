import { useState } from "react";
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import { Menu } from "@/components/Base/Headless";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "@/stores/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import Button from "@/components/Base/Button";
import ParentModal from "@/custom-components/Modals/ParentModal";
import { setCaja, setCompany, setLote } from "@/stores/settingsSlice";

function Main() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useAppSelector((state) => state.auth);
  const { companyList, company, lote, caja } = useAppSelector((state) => state.settings);
  const { t } = useTranslation()

  const [showLoteCajaModal, setShowLoteCajaModal] = useState<boolean>(false);

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="relative z-[51] flex h-[67px] items-center border-b border-slate-200">
        <div className="sm:justify-end justify-between w-full flex">
          <div className="items-center hidden sm:flex">
            <div className="relative intro-x">
              <div className="hidden sm:block">
                <FormInput
                  value={caja ?? ''}
                  type="text"
                  className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                  placeholder={t("box")}
                  onChange={(e) => dispatch(setCaja(e.target.value))}
                />
              </div>
            </div>
            <Lucide icon="SeparatorVertical" className="z-10 w-5 h-5 dark:text-slate-500" />
            <div className="relative intro-x">
              <div className="hidden sm:block">
                <FormInput
                  value={lote ?? ''}
                  type="text"
                  className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                  placeholder={t("batch")}
                  onChange={(e) => dispatch(setLote(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="flex mr-2">
            <div className="relative sm:hidden z-10">
              <Button variant="outline-primary" onClick={() => setShowLoteCajaModal(true)}>
                {caja ?? t("box")}
                {"/"}
                {lote ?? t("batch")}
              </Button>
            </div>

            <Menu className="z-10 ml-2 mr-auto">
              <Menu.Button as={Button} variant="outline-primary">
                {company?.Codigo ?? t("company")}
              </Menu.Button>
              <Menu.Items className="w-64" placement={window.innerWidth < 640 ? "bottom-start" : "bottom-end"}>
                {
                  companyList.map((company, index) => (
                    <Menu.Item key={index} onClick={() => dispatch(setCompany(company))}>{company.Codigo}-{company.Nombre}</Menu.Item>
                  ))
                }
              </Menu.Items>
            </Menu>
          </div>
          {/* BEGIN: Account Menu */}
          <Menu>
            <Menu.Button className="flex justify-center items-center w-10 h-10 bg-theme-1 dark:bg-slate-700 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
              <Lucide icon="User" className="w-8 h-8 text-white" />
            </Menu.Button>
            <Menu.Items className="w-56 mt-px relative bg-primary/70 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
              <Menu.Header className="font-normal">
                <div className="font-medium">{userData?.Codigo}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {userData?.Nombre}
                </div>
              </Menu.Header>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5" onClick={() => navigate("/profile")} >
                <Lucide icon="User" className="w-4 h-4 mr-2" /> {t("profile")}
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5" onClick={() => navigate("change-password")}>
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> {t("change-password")}
              </Menu.Item>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5" onClick={() => dispatch(logout())}>
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" />{t("logout")}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <ParentModal
        size='sm'
        title={t("batchBoxEdit")}
        show={showLoteCajaModal}
        setShow={setShowLoteCajaModal}
        hideFooter={true}
      >
        <div className="items-center flex justify-center">
          <div className="relative intro-x">
            <div className="block">
              <FormInput
                value={caja ?? ''}
                type="text"
                className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                placeholder={t("box")}
                onChange={(e) => dispatch(setCaja(e.target.value))}
              />
            </div>
          </div>
          <Lucide icon="SeparatorVertical" className="w-5 h-5 dark:text-slate-500" />
          <div className="relative intro-x">
            <div className="block">
              <FormInput
                value={lote ?? ''}
                type="text"
                className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                placeholder={t("batch")}
                onChange={(e) => dispatch(setLote(e.target.value))}
              />
            </div>
          </div>
        </div>
      </ParentModal>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
