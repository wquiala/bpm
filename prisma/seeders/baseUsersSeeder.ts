import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt"

const baseUsersSeeder = async () => {
    const prisma = new PrismaClient()

    const roleAdmin = await prisma.rol.findFirst({
        where: {
            Nombre: 'ADMIN'
        }
    })

    if (!roleAdmin) {
        throw new Error('Role ADMIN not found')
    }

    const roleMonitor = await prisma.rol.findFirst({
        where: {
            Nombre: 'MONITOR'
        }
    })

    if (!roleMonitor) {
        throw new Error('Role MONITOR not found')
    }

    const roleBase = await prisma.rol.findFirst({
        where: {
            Nombre: 'BASE'
        }
    })

    if (!roleBase) {
        throw new Error('Role BASE not found')
    }

    const users = [
        { name: 'Luis Muñoz Benito', code: 'lmb_base', password: 'lmb_base', role: roleBase },
        { name: 'Luis Muñoz Benito', code: 'lmb_monitor', password: 'lmb_monitor', role: roleMonitor },
        { name: 'Luis Muñoz Benito', code: 'lmb_admin', password: 'lmb_admin', role: roleAdmin },
        { name: 'Sebastián Torres Guzmán', code: 'stg_base', password: 'stg_base', role: roleBase },
        { name: 'Sebastián Torres Guzmán', code: 'stg_monitor', password: 'stg_monitor', role: roleMonitor },
        { name: 'Sebastián Torres Guzmán', code: 'stg_admin', password: 'stg_admin', role: roleAdmin },
        { name: 'Juan Lora Rodríguez', code: 'juanlr', password: 'juanlr', role: roleAdmin },
        { name: 'Moises Cañete Lopez', code: 'moisescl', password: 'moisescl', role: roleAdmin },
        { name: 'Nuria Lopez Perez', code: 'nurialp', password: 'nurialp', role: roleBase },
    ];


    for (const user of users) {
        await prisma.usuario.upsert({
            where: { Codigo: user.code },
            update: {},
            create: {
                Codigo: user.code,
                Nombre: user.name,
                Password: hashSync(user.password, 10),
                Rol: {
                    connect: user.role
                }
            }
        });
    }

    await prisma.usuario.upsert({
        where: { Codigo: 'admin' },
        update: {},
        create: {
            Codigo: 'admin',
            Nombre: 'admin',
            Password: hashSync('admin', 10),
            Rol: {
                connect: roleAdmin
            }
        }
    })
    
    await prisma.usuario.upsert({
        where: { Codigo: 'lmunoz' },
        update: {},
        create: {
            Codigo: 'lmunoz',
            Nombre: 'Luis Muñoz',
            Password: hashSync('lmunoz', 10),
            Rol: {
                connect: roleAdmin
            }
        }
    })
    
    await prisma.usuario.upsert({
        where: { Codigo: 'jlora' },
        update: {},
        create: {
            Codigo: 'jlora',
            Nombre: 'Juan Lora',
            Password: hashSync('jlora', 10),
            Rol: {
                connect: roleMonitor
            }
        }
    })
    
    await prisma.usuario.upsert({
        where: { Codigo: 'base' },
        update: {},
        create: {
            Codigo: 'base',
            Nombre: 'Usuario Base',
            Password: hashSync('base', 10),
            Rol: {
                connect: roleBase
            }
        }
    })
    
    console.log("BASE USERS POPULATED")
}

export default baseUsersSeeder