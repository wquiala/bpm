import { boolean, string } from 'zod';

export interface Company {
      CompaniaId: number;
      Nombre?: string;
      Codigo?: string;
      Descripcion?: string | null;
      Telefono?: string | null;
      CorreoComp?: string | null;
      ReclamarComp?: boolean | null;
      CorreoSoporte?: string | null;
      ReclamarSoporte?: boolean | null;
      ColorBase?: string | null;
      FechaInicio?: Date | null;
      FechaBaja?: Date | null;
      updatedAt?: Date | null;
}
