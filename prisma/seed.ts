import { PrismaClient } from '@prisma/client';
import rolSeeder from '../prisma/seeders/rolSeeder';
import adminUserSeeder from '../prisma/seeders/adminUserSeeder';
import systemUserSeeder from '../prisma/seeders/systemUserSeeder';
import baseUsersSeeder from '../prisma/seeders/baseUsersSeeder';
const prisma = new PrismaClient();
async function main() {
   await rolSeeder();

   await adminUserSeeder();

   await systemUserSeeder();

   await baseUsersSeeder();
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
