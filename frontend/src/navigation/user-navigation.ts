import { Menu } from "@/stores/menuSlice";

const USER_NAVIGATION: Array<Menu> = [
    {
        icon: "Home",
        pathname: "/",
        title: "Home",
    },
    // {
    //     icon: "FileSearch",
    //     pathname: "/operations",
    //     title: "Operaciones",
    // },
    {
        icon: "Database",
        title: "Grabación de datos",
        subMenu: [
            {
                icon: "ShieldCheck",
                pathname: "/load-policy",
                title: "Grabación de poliza"
            },
            {
                icon: "ShieldX",
                pathname: "/load-incidence-policy",
                title: "Grabación de poliza con incidencia"
            },
            // {
            //     icon: "Paperclip",
            //     pathname: "/user-list",
            //     title: "Alta anexos"
            // },
            // {
            //     icon: "NotebookPen",
            //     pathname: "/user-list",
            //     title: "Editar anexos"
            // },
            // {
            //     icon: "FilePlus",
            //     pathname: "/user-list",
            //     title: "Alta manual"
            // }
        ],
    }
]

export default USER_NAVIGATION;
