import { twMerge } from "tailwind-merge";
import {
  Disclosure as HeadlessDisclosure,
  Transition,
} from "@headlessui/react";
import {
  Fragment,
  createContext,
  useContext,
  useMemo,
  useState
} from "react";

type Variant = "default" | "boxed";

const disclosureContext = createContext<{
  open: boolean;
  close: () => void;
  key: number;
}>({
  open: false,
  close: () => { },
  key: 0,
});

const groupContext = createContext<{
  selectedIndex: null | number;
  setSelectedIndex: (index: number) => void;
  variant: Variant;
}>({
  selectedIndex: null,
  setSelectedIndex: () => { },
  variant: "default",
});

function Disclosure({
  children,
  className,
  key = 0,
  ...props
}: ExtractProps<typeof HeadlessDisclosure> & {
  key?: number;
}) {
  const group = useContext(groupContext);

  const value = useMemo(() => ({
    open: open,
    close: close,
    key: key,
  }), [open, close, key]);

  return (
    <HeadlessDisclosure
      as="div"
      defaultOpen={
        group.selectedIndex === key ||
        props.defaultOpen
      }
      className={twMerge([
        "py-4 first:-mt-4 last:-mb-4",
        "[&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-200/60 [&:not(:last-child)]:dark:border-darkmode-400",
        group.variant == "boxed" &&
        "p-4 first:mt-0 last:mb-0 border border-slate-200/60 mt-3 dark:border-darkmode-400",
        className,
      ])}
      {...props}
    >
      {({ open, close }) => (
        <disclosureContext.Provider
          //@ts-ignore
          value={value}
        >
          <>
            {typeof children === "function"
              ? children({
                open: open,
                close: close,
              })
              : children}
          </>
        </disclosureContext.Provider>
      )}
    </HeadlessDisclosure>
  );
}

function DisclosureGroup<C extends React.ElementType = "div">({
  children,
  className,
  as,
  selectedIndex = 0,
  variant = "default",
  ...props
}: {
  as?: C;
  selectedIndex?: number;
  variant?: Variant;
} & React.PropsWithChildren &
  React.ComponentPropsWithoutRef<C>) {
  const [active, setActive] = useState(selectedIndex);
  const Component = as || "div";

  const value = useMemo(() => ({
    selectedIndex: active,
    setSelectedIndex: setActive,
    variant: variant,
  }), [active, setActive, variant]);

  return (
    <groupContext.Provider
      value={value}
    >
      {
        <Component className={className} {...props}>
          {Array.isArray(children)
            ? children.map((item, key) => {
              return {
                ...item,
                props: {
                  ...item.props,
                  key: key,
                },
              };
            })
            : children}
        </Component>
      }
    </groupContext.Provider>
  );
};

Disclosure.Group = DisclosureGroup;
const DisclosureButton = ({
  children,
  className,
  ...props
}: ExtractProps<typeof HeadlessDisclosure.Button>) => {
  const disclosure = useContext(disclosureContext);
  const group = useContext(groupContext);

  return (
    <HeadlessDisclosure.Button
      as="button"
      className={twMerge([
        "outline-none py-4 -my-4 font-medium w-full text-left dark:text-slate-400",
        disclosure.open && "text-primary dark:text-slate-300",
        className,
      ])}
      onClick={() => {
        group.setSelectedIndex(disclosure.key);
      }}
      {...props}
    >
      {children}
    </HeadlessDisclosure.Button>
  );
};
Disclosure.Button = DisclosureButton;

const DisclosurePanel = ({
  children,
  className,
  ...props
}: ExtractProps<typeof HeadlessDisclosure.Panel>) => {
  return (
    <Transition
      as={Fragment}
      enter="overflow-hidden transition-all linear duration-[400ms]"
      enterFrom="mt-0 max-h-0 invisible opacity-0"
      enterTo="mt-3 max-h-[2000px] visible opacity-100"
      leave="overflow-hidden transition-all linear duration-500"
      leaveFrom="mt-3 max-h-[2000px] visible opacity-100"
      leaveTo="mt-0 max-h-0 invisible opacity-0"
    >
      <HeadlessDisclosure.Panel
        as="div"
        className={twMerge([
          "mt-3 text-slate-700 leading-relaxed dark:text-slate-400",
          className,
        ])}
        {...props}
      >
        {children}
      </HeadlessDisclosure.Panel>
    </Transition>
  );
};
Disclosure.Panel = DisclosurePanel;

export default Disclosure;
