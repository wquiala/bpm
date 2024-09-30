import { Menu } from '@/stores/menuSlice';

const MONITOR_NAVIGATION: Array<Menu> = [
   {
      icon: 'Home',
      pathname: '/',
      title: 'Home',
   },
   // {
   //     icon: "FileSearch",
   //     pathname: "/operations",
   //     title: "Operaciones",
   // },
   {
      icon: 'HardDriveUpload',
      title: 'Carga',
      subMenu: [
         {
            icon: 'CalendarCheck2',
            pathname: '/upload-daily',
            title: 'Fichero de carga diaria',
         },
         {
            icon: 'Tablet',
            pathname: '/upload-tablet',
            title: 'Fichero de tableta',
         },
         {
            icon: 'ClipboardPen',
            pathname: '/upload-digital-signature',
            title: 'Firma digital',
         },
         {
            icon: 'Ban',
            pathname: '/upload-anuladas',
            title: 'Anuladas',
         },
      ],
   },
   {
      icon: 'Database',
      title: 'Grabación de datos',
      subMenu: [
         {
            icon: 'ShieldCheck',
            pathname: '/load-policy',
            title: 'Grabación de póliza sin incidencias',
         },
         {
            icon: 'ShieldX',
            pathname: '/load-incidence-policy',
            title: 'Grabación de póliza con incidencias',
         },
         {
            icon: 'FilePlus2',
            pathname: '/alta-manual',
            title: 'Alta manual de pólizas',
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
   },
   {
      icon: 'Send',
      title: 'Envío de comunicaciones',
      subMenu: [
         {
            icon: 'MailOpen',
            pathname: '/por-enviar',
            title: 'Comunicaciones por enviar',
         },
         {
            icon: 'MailCheck',
            pathname: '/enviadas',
            title: 'Comunicaciones enviadas',
         },
         {
            icon: 'Check',
            pathname: '/revisar-envio',
            title: 'Revisar para enviar',
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
   },
];

export default MONITOR_NAVIGATION;
